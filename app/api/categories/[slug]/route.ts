import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { parseBody, createCategorySchema } from '@/lib/validation';
import { withAdmin, ok, err } from '@/lib/middleware';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;

    const category = await queryOne(
      `SELECT
         c.id, c.name, c.slug, c.description, c.image, c.parent_id, c.created_at,
         p.name AS parent_name, p.slug AS parent_slug
       FROM categories c
       LEFT JOIN categories p ON c.parent_id = p.id
       WHERE c.slug = $1`,
      [slug],
    );

    if (!category) return err('Category not found', 404);

    const products = await query(
      `SELECT
         p.id, p.name, p.slug, p.price, p.compare_at_price,
         p.images, p.rating, p.review_count, p.featured, p.is_new, p.is_sale
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE c.slug = $1 AND p.status = 'active'
       ORDER BY p.created_at DESC
       LIMIT 20`,
      [slug],
    );

    return ok({ category, products });
  } catch (e) {
    console.error('[GET /api/categories/[slug]]', e);
    return err('Internal server error', 500);
  }
}

export const PATCH = withAdmin(async (request: Request, ctx: Ctx) => {
  try {
    const { slug } = await ctx.params;
    const body = await request.json();
    const parsed = parseBody(createCategorySchema.partial(), body);
    if (!parsed.success) return err(parsed.error, 400);

    const fields = Object.entries(parsed.data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return err('No fields to update', 400);

    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(', ');
    const values = fields.map(([, v]) => v);

    const category = await queryOne(
      `UPDATE categories
       SET ${setClauses}, updated_at = NOW()
       WHERE slug = $${fields.length + 1}
       RETURNING *`,
      [...values, slug],
    );

    if (!category) return err('Category not found', 404);

    return ok({ category });
  } catch (e) {
    console.error('[PATCH /api/categories/[slug]]', e);
    return err('Internal server error', 500);
  }
});

export const DELETE = withAdmin(async (_request: Request, ctx: Ctx) => {
  try {
    const { slug } = await ctx.params;

    const cat = await queryOne<{ id: number }>(
      'SELECT id FROM categories WHERE slug = $1',
      [slug],
    );
    if (!cat) return err('Category not found', 404);

    const productCount = await queryOne<{ count: string }>(
      'SELECT COUNT(*) AS count FROM products WHERE category_id = $1',
      [cat.id],
    );

    if (parseInt(productCount?.count ?? '0', 10) > 0) {
      return err('Cannot delete category with assigned products', 409);
    }

    await queryOne(
      'DELETE FROM categories WHERE id = $1 RETURNING id',
      [cat.id],
    );

    return ok({ success: true });
  } catch (e) {
    console.error('[DELETE /api/categories/[slug]]', e);
    return err('Internal server error', 500);
  }
});
