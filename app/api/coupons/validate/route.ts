import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { ok, err } from '@/lib/middleware';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, orderTotal } = body;

    if (!code) return err('Coupon code is required', 400);
    if (typeof orderTotal !== 'number') return err('orderTotal must be a number', 400);

    const coupon = await queryOne(
      `SELECT
         id, code, discount_type, discount_value, min_order,
         usage_limit, usage_count, expires_at, is_active
       FROM coupons
       WHERE code = $1
         AND is_active = true
         AND (expires_at IS NULL OR expires_at > NOW())
         AND (usage_limit IS NULL OR usage_count < usage_limit)
         AND min_order <= $2`,
      [code.trim().toUpperCase(), orderTotal],
    );

    if (!coupon) return err('Coupon not found or not applicable', 404);

    return ok({ coupon });
  } catch (e) {
    console.error('[POST /api/coupons/validate]', e);
    return err('Internal server error', 500);
  }
}
