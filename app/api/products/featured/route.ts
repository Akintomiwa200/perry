import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ok, err } from '@/lib/middleware';

export async function GET(_request: Request) {
  try {
    const products = await query(
      `SELECT
         p.id, p.name, p.slug, p.description, p.price, p.compare_at_price,
         p.images, p.stock, p.sku, p.rating, p.review_count, p.featured,
         p.is_new, p.is_sale, p.status, p.category_id, p.created_at,
         c.name AS category_name, c.slug AS category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.featured = true AND p.status = 'active'
       ORDER BY p.created_at DESC
       LIMIT 8`,
      [],
    );

    return ok({ products });
  } catch (e) {
    console.error('[GET /api/products/featured]', e);
    return err('Internal server error', 500);
  }
}
