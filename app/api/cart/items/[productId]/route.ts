import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { withAuth, ok, err } from '@/lib/middleware';

type Ctx = { params: Promise<{ productId: string }> };

export const PATCH = withAuth(async (request: Request, ctx: Ctx) => {
  try {
    const { productId } = await ctx.params;
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const body = await request.json();
    const { quantity } = body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return err('quantity must be a positive integer', 400);
    }

    const item = await queryOne(
      `UPDATE cart_items
       SET quantity = $1, updated_at = NOW()
       WHERE user_id = $2 AND product_id = $3
       RETURNING *`,
      [quantity, session.id, productId],
    );

    if (!item) return err('Cart item not found', 404);

    return ok({ item });
  } catch (e) {
    console.error('[PATCH /api/cart/items/[productId]]', e);
    return err('Internal server error', 500);
  }
});

export const DELETE = withAuth(async (_request: Request, ctx: Ctx) => {
  try {
    const { productId } = await ctx.params;
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const item = await queryOne(
      `DELETE FROM cart_items
       WHERE user_id = $1 AND product_id = $2
       RETURNING id`,
      [session.id, productId],
    );

    if (!item) return err('Cart item not found', 404);

    return ok({ success: true });
  } catch (e) {
    console.error('[DELETE /api/cart/items/[productId]]', e);
    return err('Internal server error', 500);
  }
});
