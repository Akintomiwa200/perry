import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { parseBody, createProductSchema } from '@/lib/validation';
import { withAdmin, ok, err } from '@/lib/middleware';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');
    const isNew = searchParams.get('isNew');
    const isSale = searchParams.get('isSale');
    const status = searchParams.get('status') ?? 'active';
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
    const offset = (page - 1) * limit;

    const conditions: string[] = ['p.status = $1'];
    const values: unknown[] = [status];
    let idx = 2;

    if (category) {
      conditions.push(`c.slug = $${idx++}`);
      values.push(category);
    }
    if (search) {
      conditions.push(`(p.name ILIKE $${idx} OR p.description ILIKE $${idx})`);
      values.push(`%${search}%`);
      idx++;
    }
    if (minPrice) {
      conditions.push(`p.price >= $${idx++}`);
      values.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      conditions.push(`p.price <= $${idx++}`);
      values.push(parseFloat(maxPrice));
    }
    if (featured !== null) {
      conditions.push(`p.featured = $${idx++}`);
      values.push(featured === 'true');
    }
    if (isNew !== null) {
      conditions.push(`p.is_new = $${idx++}`);
      values.push(isNew === 'true');
    }
    if (isSale !== null) {
      conditions.push(`p.is_sale = $${idx++}`);
      values.push(isSale === 'true');
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const baseQuery = `
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${where}
    `;

    const countResult = await queryOne<{ count: string }>(
      `SELECT COUNT(*) AS count ${baseQuery}`,
      values,
    );
    const total = parseInt(countResult?.count ?? '0', 10);

    const products = await query<{
      id: number;
      name: string;
      slug: string;
      description: string;
      price: number;
      compare_at_price: number | null;
      images: string[];
      stock: number;
      sku: string;
      rating: number;
      review_count: number;
      featured: boolean;
      is_new: boolean;
      is_sale: boolean;
      status: string;
      category_id: number | null;
      category_name: string | null;
      category_slug: string | null;
      created_at: string;
    }>(
      `SELECT
         p.id, p.name, p.slug, p.description, p.price, p.compare_at_price,
         p.images, p.stock, p.sku, p.rating, p.review_count, p.featured,
         p.is_new, p.is_sale, p.status, p.category_id, p.created_at,
         c.name AS category_name, c.slug AS category_slug
       ${baseQuery}
       ORDER BY p.created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      [...values, limit, offset],
    );

    const totalPages = Math.ceil(total / limit);

    return ok({ products, total, page, limit, totalPages });
  } catch (e) {
    console.error('[GET /api/products]', e);
    return err('Internal server error', 500);
  }
}

export const POST = withAdmin(async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = parseBody(createProductSchema, body);
    if (!parsed.success) return err(parsed.error, 400);

    const {
      name, slug, description, price, compare_at_price,
      images, stock, sku, category_id, featured, is_new, is_sale,
    } = parsed.data;

    const product = await queryOne(
      `INSERT INTO products
         (name, slug, description, price, compare_at_price, images, stock, sku,
          category_id, featured, is_new, is_sale, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'active')
       RETURNING *`,
      [name, slug, description, price, compare_at_price ?? null,
       images ?? [], stock ?? 0, sku ?? null, category_id ?? null,
       featured ?? false, is_new ?? false, is_sale ?? false],
    );

    return ok({ product }, 201);
  } catch (e) {
    console.error('[POST /api/products]', e);
    return err('Internal server error', 500);
  }
});
