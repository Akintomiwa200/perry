import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { withAdmin, ok, err } from '@/lib/middleware';

export async function GET(_request: Request) {
  try {
    const collections = await query(
      `SELECT
         c.id, c.name, c.slug, c.description, c.status, c.created_at,
         COUNT(pc.product_id) AS product_count
       FROM collections c
       LEFT JOIN product_collections pc ON c.id = pc.collection_id
       GROUP BY c.id
       ORDER BY c.name ASC`,
      [],
    );

    return ok({ collections });
  } catch (e) {
    console.error('[GET /api/collections]', e);
    return err('Internal server error', 500);
  }
}

export const POST = withAdmin(async (request: Request) => {
  try {
    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return err('name and slug are required', 400);
    }

    const collection = await queryOne(
      `INSERT INTO collections (name, slug, description, status)
       VALUES ($1, $2, $3, 'draft')
       RETURNING *`,
      [name, slug, description ?? null],
    );

    return ok({ collection }, 201);
  } catch (e) {
    console.error('[POST /api/collections]', e);
    return err('Internal server error', 500);
  }
});
