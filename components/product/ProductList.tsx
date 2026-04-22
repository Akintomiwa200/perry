import ProductCard from './ProductCard';
import { Product } from '@/types/product.types';

interface ProductListProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

export default function ProductList({ products, title, emptyMessage = 'No items here yet. Start exploring →' }: ProductListProps) {
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
