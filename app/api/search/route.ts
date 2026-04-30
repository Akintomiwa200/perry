import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ok, err } from '@/lib/middleware';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q || q.trim().length === 0) {
      return ok({ products: [] });
    }

    const searchTerm = `%${q.trim()}%`;

    const products = await query(
      `SELECT
         p.id, p.name, p.slug, p.price, p.compare_at_price,
         p.images, p.rating, p.review_count, p.status,
         c.name AS category_name, c.slug AS category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE (p.name ILIKE $1 OR p.description ILIKE $1)
         AND p.status = 'active'
       ORDER BY p.name ASC
       LIMIT 10`,
      [searchTerm],
    );

    return ok({ products });
  } catch (e) {
    console.error('[GET /api/search]', e);
    return err('Internal server error', 500);
  }
}
