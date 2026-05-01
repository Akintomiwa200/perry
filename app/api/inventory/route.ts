import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import pool from '@/lib/db';
import { getAdminSession } from '@/lib/session';
import { parseBody, inventoryAdjustmentSchema } from '@/lib/validation';
import { withAdmin, ok, err } from '@/lib/middleware';

export const GET = withAdmin(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const lowStock = searchParams.get('lowStock') === 'true';

    const where = lowStock ? 'WHERE p.stock <= 10' : '';

    const products = await query(
      `SELECT
         p.id, p.name, p.slug, p.sku, p.stock, p.status,
         p.price, p.created_at, p.updated_at,
         c.name AS category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       ${where}
       ORDER BY p.stock ASC, p.name ASC`,
      [],
    );

    return ok({ products });
  } catch (e) {
    console.error('[GET /api/inventory]', e);
    return err('Internal server error', 500);
  }
});

export const POST = withAdmin(async (request: Request) => {
  const client = await pool.connect();
  try {
    const session = await getAdminSession();
    if (!session) return err('Unauthorized', 401);

    const body = await request.json();
    const parsed = parseBody(inventoryAdjustmentSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { productId, type, quantity, reason } = parsed.data;
    const product_id = Number(productId);
    const adjustment_type = type;

    const product = await queryOne<{ id: number; stock: number }>(
      'SELECT id, stock FROM products WHERE id = $1',
      [product_id],
    );
    if (!product) return err('Product not found', 404);

    let newStock: number;
    if (adjustment_type === 'addition') {
      newStock = product.stock + quantity;
    } else if (adjustment_type === 'reduction') {
      newStock = product.stock - quantity;
      if (newStock < 0) return err('Stock cannot go below zero', 400);
    } else {
      // correction — set absolute value
      newStock = quantity;
    }

    await client.query('BEGIN');

    await client.query(
      `INSERT INTO inventory_adjustments (product_id, admin_id, adjustment_type, quantity, reason, stock_before, stock_after)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [product_id, session.userId, adjustment_type, quantity, reason ?? null, product.stock, newStock],
    );

    await client.query(
      `UPDATE products SET stock = $1, updated_at = NOW() WHERE id = $2`,
      [newStock, product_id],
    );

    await client.query('COMMIT');

    return ok({ success: true, product_id, previous_stock: product.stock, new_stock: newStock }, 201);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('[POST /api/inventory]', e);
    return err('Internal server error', 500);
  } finally {
    client.release();
  }
});
