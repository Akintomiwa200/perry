import ProductList from '@/components/product/ProductList';
import { mockProducts } from '@/lib/db';

export const metadata = { title: 'All Products' };

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>All Products</h1>
      <ProductList products={mockProducts} />
    </div>
  );
}
