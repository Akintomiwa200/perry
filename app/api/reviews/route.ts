import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { withAdmin, ok, err } from '@/lib/middleware';

export const GET = withAdmin(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const isApproved = searchParams.get('is_approved');

    const conditions: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (isApproved !== null) {
      conditions.push(`r.is_approved = $${idx++}`);
      values.push(isApproved === 'true');
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const reviews = await query(
      `SELECT
         r.id, r.rating, r.title, r.body, r.is_approved, r.created_at, r.updated_at,
         u.id AS user_id, u.name AS user_name, u.email AS user_email,
         p.id AS product_id, p.name AS product_name, p.slug AS product_slug
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       JOIN products p ON r.product_id = p.id
       ${where}
       ORDER BY r.created_at DESC`,
      values,
    );

    return ok({ reviews });
  } catch (e) {
    console.error('[GET /api/reviews]', e);
    return err('Internal server error', 500);
  }
});

export const PATCH = withAdmin(async (request: Request) => {
  try {
    const body = await request.json();
    const { reviewId, approved } = body;

    if (!reviewId) return err('reviewId is required', 400);
    if (typeof approved !== 'boolean') return err('approved must be a boolean', 400);

    const review = await queryOne(
      `UPDATE reviews
       SET is_approved = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [approved, reviewId],
    );

    if (!review) return err('Review not found', 404);

    return ok({ review });
  } catch (e) {
    console.error('[PATCH /api/reviews]', e);
    return err('Internal server error', 500);
  }
});
