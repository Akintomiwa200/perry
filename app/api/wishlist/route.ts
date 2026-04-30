import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { withAuth, ok, err } from '@/lib/middleware';

export const GET = withAuth(async (_request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const items = await query(
      `SELECT
         w.id, w.created_at,
         p.id AS product_id, p.name, p.slug, p.price, p.compare_at_price,
         p.images, p.rating, p.review_count, p.status, p.stock
       FROM wishlists w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [session.id],
    );

    return ok({ items });
  } catch (e) {
    console.error('[GET /api/wishlist]', e);
    return err('Internal server error', 500);
  }
});

export const POST = withAuth(async (request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const body = await request.json();
    const { productId } = body;

    if (!productId) return err('productId is required', 400);

    const product = await queryOne<{ id: number }>(
      'SELECT id FROM products WHERE id = $1',
      [productId],
    );
    if (!product) return err('Product not found', 404);

    await queryOne(
      `INSERT INTO wishlists (user_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, product_id) DO NOTHING`,
      [session.id, productId],
    );

    // Return updated wishlist
    const items = await query(
      `SELECT
         w.id, w.created_at,
         p.id AS product_id, p.name, p.slug, p.price, p.compare_at_price,
         p.images, p.rating, p.review_count, p.status, p.stock
       FROM wishlists w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [session.id],
    );

    return ok({ items }, 201);
  } catch (e) {
    console.error('[POST /api/wishlist]', e);
    return err('Internal server error', 500);
  }
});

export const DELETE = withAuth(async (request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const body = await request.json();
    const { productId } = body;

    if (!productId) return err('productId is required', 400);

    await queryOne(
      'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2',
      [session.id, productId],
    );

    return ok({ success: true });
  } catch (e) {
    console.error('[DELETE /api/wishlist]', e);
    return err('Internal server error', 500);
  }
});
