import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/db';
import ProductDetails from '@/components/product/ProductDetails';
import ProductReviews from '@/components/product/ProductReviews';
import ProductList from '@/components/product/ProductList';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = mockProducts.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = mockProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8" aria-label="Breadcrumb" style={{ color: 'var(--color-text-muted)' }}>
        <a href="/" style={{ color: 'var(--color-primary)' }}>Home</a>
        <span>/</span>
        <a href="/shop" style={{ color: 'var(--color-primary)' }}>Shop</a>
        <span>/</span>
        <a href={`/categories/${product.category}`} style={{ color: 'var(--color-primary)' }}>
          {product.category.replace(/-/g, ' ')}
        </a>
        <span>/</span>
        <span className="truncate max-w-xs">{product.name}</span>
      </nav>

      <ProductDetails product={product} />
      <ProductReviews product={product} />

      {related.length > 0 && (
        <section className="mt-16">
          <ProductList products={related} title="You Might Also Like" />
        </section>
      )}
    </div>
  );
}
