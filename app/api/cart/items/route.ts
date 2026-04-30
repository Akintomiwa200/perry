import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { withAuth, ok, err } from '@/lib/middleware';

export const POST = withAuth(async (request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) return err('productId is required', 400);
    if (typeof quantity !== 'number' || quantity < 1) {
      return err('quantity must be a positive integer', 400);
    }

    const product = await queryOne<{ id: number; stock: number }>(
      'SELECT id, stock FROM products WHERE id = $1 AND status = $2',
      [productId, 'active'],
    );
    if (!product) return err('Product not found', 404);

    await queryOne(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + $3, updated_at = NOW()`,
      [session.id, productId, quantity],
    );

    // Return updated cart
    const items = await query(
      `SELECT
         ci.id, ci.quantity, ci.created_at, ci.updated_at,
         p.id AS product_id, p.name, p.slug, p.price, p.compare_at_price,
         p.images, p.stock, p.status
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1
       ORDER BY ci.created_at DESC`,
      [session.id],
    );

    return ok({ items }, 201);
  } catch (e) {
    console.error('[POST /api/cart/items]', e);
    return err('Internal server error', 500);
  }
});
