import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { parseBody, updateOrderSchema } from '@/lib/validation';
import { withAuth, withAdmin, ok, err } from '@/lib/middleware';

type Ctx = { params: Promise<{ id: string }> };

export const GET = withAuth(async (request: Request, ctx: Ctx) => {
  try {
    const { id } = await ctx.params;
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const order = await queryOne<{
      id: number;
      user_id: number;
      order_number: string;
      status: string;
      total: number;
      subtotal: number;
      tax: number;
      shipping: number;
      shipping_address: unknown;
      tracking_number: string | null;
      notes: string | null;
      created_at: string;
      updated_at: string;
      items: unknown;
    }>(
      `SELECT
         o.id, o.user_id, o.order_number, o.status, o.total, o.subtotal,
         o.tax, o.shipping, o.shipping_address, o.tracking_number, o.notes,
         o.created_at, o.updated_at,
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
       WHERE o.id = $1
       GROUP BY o.id`,
      [id],
    );

    if (!order) return err('Order not found', 404);

    // Only the owner or admin can view
    if (order.user_id !== Number(session.id) && session.role !== 'admin' && session.role !== 'super_admin') {
      return err('Forbidden', 403);
    }

    return ok({ order });
  } catch (e) {
    console.error('[GET /api/orders/[id]]', e);
    return err('Internal server error', 500);
  }
});

export const PATCH = withAdmin(async (request: Request, ctx: Ctx) => {
  try {
    const { id } = await ctx.params;
    const body = await request.json();
    const parsed = parseBody(updateOrderSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { status, tracking_number, notes } = parsed.data;

    const fields: Array<[string, unknown]> = [];
    if (status !== undefined) fields.push(['status', status]);
    if (tracking_number !== undefined) fields.push(['tracking_number', tracking_number]);
    if (notes !== undefined) fields.push(['notes', notes]);

    if (fields.length === 0) return err('No fields to update', 400);

    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(', ');
    const values = fields.map(([, v]) => v);

    const order = await queryOne(
      `UPDATE orders
       SET ${setClauses}, updated_at = NOW()
       WHERE id = $${fields.length + 1}
       RETURNING *`,
      [...values, id],
    );

    if (!order) return err('Order not found', 404);

    return ok({ order });
  } catch (e) {
    console.error('[PATCH /api/orders/[id]]', e);
    return err('Internal server error', 500);
  }
});
