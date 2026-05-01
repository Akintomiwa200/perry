import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { withAdmin, ok, err } from '@/lib/middleware';

export const GET = withAdmin(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
    const offset = (page - 1) * limit;

    const conditions: string[] = ["u.role = 'user'"];
    const values: unknown[] = [];
    let idx = 1;

    if (search) {
      conditions.push(`(u.name ILIKE $${idx} OR u.email ILIKE $${idx})`);
      values.push(`%${search}%`);
      idx++;
    }

    const where = `WHERE ${conditions.join(' AND ')}`;

    const baseQuery = `FROM users u LEFT JOIN orders o ON o.user_id = u.id ${where}`;

    const countResult = await queryOne<{ count: string }>(
      `SELECT COUNT(DISTINCT u.id) AS count ${baseQuery}`,
      values,
    );
    const total = parseInt(countResult?.count ?? '0', 10);

    const customers = await query(
      `SELECT
         u.id,
         u.name,
         u.email,
         u.role,
         u.created_at,
         u.updated_at,
         COUNT(o.id)::int AS "ordersCount",
         COALESCE(SUM(o.total), 0)::float AS "totalSpent"
       ${baseQuery}
       GROUP BY u.id
       ORDER BY u.created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      [...values, limit, offset],
    );

    const totalPages = Math.ceil(total / limit);

    return ok({ customers, total, page, limit, totalPages });
  } catch (e) {
    console.error('[GET /api/customers]', e);
    return err('Internal server error', 500);
  }
});
