import { NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { withAuth, ok, err } from '@/lib/middleware';

type Ctx = { params: Promise<{ id: string }> };

export const POST = withAuth(async (_request: Request, ctx: Ctx) => {
  const client = await pool.connect();
  try {
    const { id } = await ctx.params;
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const order = await queryOne<{
      id: number;
      user_id: number;
      status: string;
    }>(
      'SELECT id, user_id, status FROM orders WHERE id = $1',
      [id],
    );

    if (!order) return err('Order not found', 404);

    if (order.user_id !== Number(session.id)) return err('Forbidden', 403);

    if (!['pending', 'processing'].includes(order.status)) {
      return err('Only pending or processing orders can be cancelled', 400);
    }

    // Fetch order items to restore stock
    const items = await query<{ product_id: number; quantity: number }>(
      'SELECT product_id, quantity FROM order_items WHERE order_id = $1',
      [order.id],
    );

    await client.query('BEGIN');

    await client.query(
      `UPDATE orders SET status = 'cancelled', updated_at = NOW() WHERE id = $1`,
      [order.id],
    );

    for (const item of items) {
      await client.query(
        `UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2`,
        [item.quantity, item.product_id],
      );
    }

    await client.query('COMMIT');

    return ok({ success: true, message: 'Order cancelled' });
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('[POST /api/orders/[id]/cancel]', e);
    return err('Internal server error', 500);
  } finally {
    client.release();
  }
});
