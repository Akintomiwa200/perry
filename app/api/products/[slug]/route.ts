import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { parseBody, updateProductSchema } from '@/lib/validation';
import { withAdmin, ok, err } from '@/lib/middleware';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;

    const product = await queryOne(
      `SELECT
         p.id, p.name, p.slug, p.description, p.price, p.compare_at_price,
         p.images, p.stock, p.sku, p.rating, p.review_count, p.featured,
         p.is_new, p.is_sale, p.status, p.category_id, p.created_at, p.updated_at,
         c.name AS category_name, c.slug AS category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = $1`,
      [slug],
    );

    if (!product) return err('Product not found', 404);

    return ok({ product });
  } catch (e) {
    console.error('[GET /api/products/[slug]]', e);
    return err('Internal server error', 500);
  }
}

export const PATCH = withAdmin(async (request: Request, ctx: Ctx) => {
  try {
    const { slug } = await ctx.params;
    const body = await request.json();
    const parsed = parseBody(updateProductSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const fields = Object.entries(parsed.data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return err('No fields to update', 400);

    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(', ');
    const values = fields.map(([, v]) => v);

    const product = await queryOne(
      `UPDATE products
       SET ${setClauses}, updated_at = NOW()
       WHERE slug = $${fields.length + 1}
       RETURNING *`,
      [...values, slug],
    );

    if (!product) return err('Product not found', 404);

    return ok({ product });
  } catch (e) {
    console.error('[PATCH /api/products/[slug]]', e);
    return err('Internal server error', 500);
  }
});

export const DELETE = withAdmin(async (_request: Request, ctx: Ctx) => {
  try {
    const { slug } = await ctx.params;

    const product = await queryOne(
      `UPDATE products SET status = 'archived', updated_at = NOW()
       WHERE slug = $1
       RETURNING id, slug, status`,
      [slug],
    );

    if (!product) return err('Product not found', 404);

    return ok({ product });
  } catch (e) {
    console.error('[DELETE /api/products/[slug]]', e);
    return err('Internal server error', 500);
  }
});
