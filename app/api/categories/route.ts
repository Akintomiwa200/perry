import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { parseBody, createCategorySchema } from '@/lib/validation';
import { withAdmin, ok, err } from '@/lib/middleware';

export async function GET(_request: Request) {
  try {
    const categories = await query(
      `SELECT
         c.id, c.name, c.slug, c.description, c.image, c.parent_id, c.created_at,
         p.name AS parent_name, p.slug AS parent_slug
       FROM categories c
       LEFT JOIN categories p ON c.parent_id = p.id
       ORDER BY c.name ASC`,
      [],
    );

    return ok({ categories });
  } catch (e) {
    console.error('[GET /api/categories]', e);
    return err('Internal server error', 500);
  }
}

export const POST = withAdmin(async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = parseBody(createCategorySchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const { name, slug, description, image, parent_id } = parsed.data;

    const category = await queryOne(
      `INSERT INTO categories (name, slug, description, image, parent_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, slug, description ?? null, image ?? null, parent_id ?? null],
    );

    return ok({ category }, 201);
  } catch (e) {
    console.error('[POST /api/categories]', e);
    return err('Internal server error', 500);
  }
});
