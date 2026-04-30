import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/session';
import { parseBody, createReviewSchema } from '@/lib/validation';
import { withAuth, ok, err } from '@/lib/middleware';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;

    const product = await queryOne<{ id: number }>(
      'SELECT id FROM products WHERE slug = $1',
      [slug],
    );
    if (!product) return err('Product not found', 404);

    const reviews = await query(
      `SELECT
         r.id, r.rating, r.title, r.body, r.is_approved,
         r.created_at, r.updated_at,
         u.id AS user_id, u.name AS user_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.product_id = $1 AND r.is_approved = true
       ORDER BY r.created_at DESC`,
      [product.id],
    );

    return ok({ reviews });
  } catch (e) {
    console.error('[GET /api/products/[slug]/reviews]', e);
    return err('Internal server error', 500);
  }
}

export const POST = withAuth(async (request: Request, ctx: Ctx) => {
  try {
    const { slug } = await ctx.params;
    const session = await getSession();
    if (!session) return err('Unauthorized', 401);

    const product = await queryOne<{ id: number }>(
      'SELECT id FROM products WHERE slug = $1 AND status = $2',
      [slug, 'active'],
    );
    if (!product) return err('Product not found', 404);

    const existing = await queryOne<{ id: number }>(
      'SELECT id FROM reviews WHERE user_id = $1 AND product_id = $2',
      [session.id, product.id],
    );
    if (existing) return err('You have already reviewed this product', 409);

    const body = await request.json();
    const parsed = parseBody(createReviewSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { rating, title, review_body } = parsed.data;

    const review = await queryOne(
      `INSERT INTO reviews (user_id, product_id, rating, title, body, is_approved)
       VALUES ($1, $2, $3, $4, $5, false)
       RETURNING *`,
      [session.id, product.id, rating, title ?? null, review_body ?? null],
    );

    return ok({ review }, 201);
  } catch (e) {
    console.error('[POST /api/products/[slug]/reviews]', e);
    return err('Internal server error', 500);
  }
});
