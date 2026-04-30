import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/session';
import { withAuth, ok, err } from '@/lib/middleware';

export const GET = withAuth(async (_request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

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

    return ok({ items });
  } catch (e) {
    console.error('[GET /api/cart]', e);
    return err('Internal server error', 500);
  }
});

export const DELETE = withAuth(async (_request: Request) => {
  try {
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    await query(
      'DELETE FROM cart_items WHERE user_id = $1',
      [session.id],
    );

    return ok({ success: true });
  } catch (e) {
    console.error('[DELETE /api/cart]', e);
    return err('Internal server error', 500);
  }
});
