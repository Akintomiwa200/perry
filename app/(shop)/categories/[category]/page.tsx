import { notFound } from 'next/navigation';
import ProductList from '@/components/product/ProductList';
import { query } from '@/lib/db';
import { CATEGORIES } from '@/lib/constants';
import type { Metadata } from 'next';
import { Product } from '@/types/product.types';

interface Props { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  return { title: cat ? `${cat.name} Collectibles` : 'Category' };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = await query<Product>(
    `SELECT
       p.id::text AS id,
       p.name,
       p.slug,
       p.description,
       p.price,
       p.compare_at_price AS "compareAtPrice",
       COALESCE(p.images, ARRAY[]::text[]) AS images,
       COALESCE(c.slug, 'uncategorized') AS category,
       COALESCE(p.stock, 0) AS stock,
       COALESCE(p.sku, '') AS sku,
       COALESCE(p.rating, 0) AS rating,
       COALESCE(p.review_count, 0) AS "reviewCount",
       COALESCE(p.featured, false) AS featured,
       COALESCE(p.is_new, false) AS "isNew",
       COALESCE(p.is_sale, false) AS "isSale",
       p.status,
       p.created_at AS "createdAt",
       p.updated_at AS "updatedAt",
       ARRAY[]::text[] AS tags
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     WHERE p.status = 'active' AND c.slug = $1
     ORDER BY p.created_at DESC`,
    [category],
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{cat.icon}</span>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{cat.name}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{products.length} items</p>
        </div>
      </div>
      <ProductList
        products={products}
        emptyMessage={`No ${cat.name.toLowerCase()} listed yet. Check back soon!`}
      />
    </div>
  );
}
