'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types/product.types';

interface ProductListProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
  gridCols?: number;
}

export default function ProductList({
  products,
  title,
  emptyMessage = 'No items here yet. Start exploring →',
  gridCols = 3,
}: ProductListProps) {
  // Build a safe Tailwind class for desktop columns (avoids dynamic class purging)
  const desktopColsClass: Record<number, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };
  const lgCols = desktopColsClass[gridCols] ?? 'lg:grid-cols-3';

  return (
    <section>
      {title && (
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          {title}
        </h2>
      )}

      {products.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-xl"
          style={{ background: 'var(--color-secondary)', color: 'var(--color-text-muted)' }}
        >
          <span className="text-5xl mb-4">📦</span>
          <p className="text-base font-medium">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
      )}
    </section>
  );
}