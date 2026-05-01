import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { parseBody, createCouponSchema } from '@/lib/validation';
import { withAdmin, ok, err } from '@/lib/middleware';

export const GET = withAdmin(async (_request: Request) => {
  try {
    const coupons = await query(
      `SELECT
         id, code, discount_type, discount_value, min_order,
         usage_limit, usage_count, expires_at, is_active, created_at
       FROM coupons
       ORDER BY created_at DESC`,
      [],
    );

    return ok({ coupons });
  } catch (e) {
    console.error('[GET /api/coupons]', e);
    return err('Internal server error', 500);
  }
});

export const POST = withAdmin(async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = parseBody(createCouponSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const {
      code,
      type,
      value,
      minOrder,
      usageLimit,
      expiresAt,
    } = parsed.data;

    const coupon = await queryOne(
      `INSERT INTO coupons (code, discount_type, discount_value, min_order, usage_limit, expires_at, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, true)
       RETURNING *`,
      [
        code.trim().toUpperCase(),
        type,
        value,
        minOrder ?? 0,
        usageLimit ?? null,
        expiresAt ?? null,
      ],
    );

    return ok({ coupon }, 201);
  } catch (e) {
    console.error('[POST /api/coupons]', e);
    return err('Internal server error', 500);
  }
});
