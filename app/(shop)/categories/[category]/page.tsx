import { notFound } from 'next/navigation';
import ProductList from '@/components/product/ProductList';
import { mockProducts } from '@/lib/db';
import { CATEGORIES } from '@/lib/constants';
import type { Metadata } from 'next';

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

  const products = mockProducts.filter((p) => p.category === category);

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
