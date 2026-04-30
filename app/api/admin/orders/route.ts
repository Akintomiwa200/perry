import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { withAdmin, ok, err } from '@/lib/middleware';

export const GET = withAdmin(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
    const offset = (page - 1) * limit;

    const conditions: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (status) {
      conditions.push(`o.status = $${idx++}`);
      values.push(status);
    }
    if (search) {
      conditions.push(`(o.order_number ILIKE $${idx} OR u.email ILIKE $${idx})`);
      values.push(`%${search}%`);
      idx++;
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const baseQuery = `
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ${where}
    `;

    const countResult = await queryOne<{ count: string }>(
      `SELECT COUNT(*) AS count ${baseQuery}`,
      values,
    );
    const total = parseInt(countResult?.count ?? '0', 10);

    const orders = await query(
      `SELECT
         o.id, o.order_number, o.status, o.total, o.subtotal, o.tax, o.shipping,
         o.shipping_address, o.tracking_number, o.notes, o.created_at, o.updated_at,
         u.id AS customer_id, u.name AS customer_name, u.email AS customer_email
       ${baseQuery}
       ORDER BY o.created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      [...values, limit, offset],
    );

    const totalPages = Math.ceil(total / limit);

    return ok({ orders, total, page, limit, totalPages });
  } catch (e) {
    console.error('[GET /api/admin/orders]', e);
    return err('Internal server error', 500);
  }
});
