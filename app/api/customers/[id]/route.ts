import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { withAdmin, ok, err } from '@/lib/middleware';

type Ctx = { params: Promise<{ id: string }> };

export const GET = withAdmin(async (_request: Request, ctx: Ctx) => {
  try {
    const { id } = await ctx.params;

    const customer = await queryOne<{
      id: number;
      name: string;
      email: string;
      role: string;
      created_at: string;
      updated_at: string;
      order_count: string;
      total_spent: string;
    }>(
      `SELECT
         u.id, u.name, u.email, u.role, u.created_at, u.updated_at,
         COUNT(o.id) AS order_count,
         COALESCE(SUM(o.total), 0) AS total_spent
       FROM users u
       LEFT JOIN orders o ON o.user_id = u.id
       WHERE u.id = $1 AND u.role = 'user'
       GROUP BY u.id`,
      [id],
    );

    if (!customer) return err('Customer not found', 404);

    return ok({
      customer: {
        ...customer,
        order_count: parseInt(customer.order_count, 10),
        total_spent: parseFloat(customer.total_spent),
      },
    });
  } catch (e) {
    console.error('[GET /api/customers/[id]]', e);
    return err('Internal server error', 500);
  }
});

export const PATCH = withAdmin(async (request: Request, ctx: Ctx) => {
  try {
    const { id } = await ctx.params;
    const body = await request.json();

    const allowedFields = ['name', 'email'];
    const fields = Object.entries(body as Record<string, unknown>).filter(
      ([key]) => allowedFields.includes(key),
    );

    if (fields.length === 0) return err('No valid fields to update', 400);

    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(', ');
    const values = fields.map(([, v]) => v);

    const customer = await queryOne(
      `UPDATE users
       SET ${setClauses}, updated_at = NOW()
       WHERE id = $${fields.length + 1} AND role = 'user'
       RETURNING id, name, email, role, created_at, updated_at`,
      [...values, id],
    );

    if (!customer) return err('Customer not found', 404);

    return ok({ customer });
  } catch (e) {
    console.error('[PATCH /api/customers/[id]]', e);
    return err('Internal server error', 500);
  }
});
