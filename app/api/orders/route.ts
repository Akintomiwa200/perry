import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { parseBody, createOrderSchema } from '@/lib/validation';
import { withAuth, ok, err } from '@/lib/middleware';

export const GET = withAuth(async (request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const orders = await query(
      `SELECT
         o.id, o.order_number, o.status, o.total, o.subtotal, o.tax, o.shipping,
         o.shipping_address, o.tracking_number, o.notes, o.created_at, o.updated_at,
         json_agg(
           json_build_object(
             'id', oi.id,
             'product_id', oi.product_id,
             'quantity', oi.quantity,
             'price', oi.price,
             'product_name', p.name,
             'product_slug', p.slug,
             'product_images', p.images
           )
         ) AS items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [session.id],
    );

    return ok({ orders });
  } catch (e) {
    console.error('[GET /api/orders]', e);
    return err('Internal server error', 500);
  }
});

export const POST = withAuth(async (request: Request) => {
  const client = await pool.connect();
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const body = await request.json();
    const parsed = parseBody(createOrderSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { items, shipping_address, notes } = parsed.data;

    // Verify products and calculate totals
    let subtotal = 0;
    const enrichedItems: Array<{
      product_id: number;
      quantity: number;
      price: number;
      stock: number;
    }> = [];

    for (const item of items) {
      const product = await queryOne<{
        id: number;
        price: number;
        stock: number;
        name: string;
      }>(
        'SELECT id, price, stock, name FROM products WHERE id = $1 AND status = $2',
        [item.product_id, 'active'],
      );

      if (!product) return err(`Product ${item.product_id} not found`, 404);
      if (product.stock < item.quantity) {
        return err(`Insufficient stock for product: ${product.name}`, 400);
      }

      subtotal += product.price * item.quantity;
      enrichedItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
        stock: product.stock,
      });
    }

    const tax = Math.round(subtotal * 0.1 * 100) / 100;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = Math.round((subtotal + tax + shipping) * 100) / 100;

    // Generate order number
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const order_number = `ORD-${Date.now()}-${rand}`;

    await client.query('BEGIN');

    const order = await client.query(
      `INSERT INTO orders
         (user_id, order_number, status, subtotal, tax, shipping, total, shipping_address, notes)
       VALUES ($1, $2, 'pending', $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [session.id, order_number, subtotal, tax, shipping, total,
       JSON.stringify(shipping_address), notes ?? null],
    );

    const createdOrder = order.rows[0];

    for (const item of enrichedItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [createdOrder.id, item.product_id, item.quantity, item.price],
      );

      await client.query(
        `UPDATE products SET stock = stock - $1, updated_at = NOW() WHERE id = $2`,
        [item.quantity, item.product_id],
      );
    }

    await client.query('COMMIT');

    return ok({ order: createdOrder }, 201);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('[POST /api/orders]', e);
    return err('Internal server error', 500);
  } finally {
    client.release();
  }
});
