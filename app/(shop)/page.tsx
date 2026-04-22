'use client';
import { useState } from 'react';
import ProductList from '@/components/product/ProductList';
import Select from '@/components/ui/Select';
import { useProducts } from '@/hooks/useProducts';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const { products, isLoading, total } = useProducts({ category: category || undefined });

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...CATEGORIES.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>All Collectibles</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {isLoading ? 'Loading...' : `${total} items`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={16} style={{ color: 'var(--color-text-muted)' }} />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categoryOptions}
            aria-label="Filter by category"
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={SORT_OPTIONS}
            aria-label="Sort products"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius-lg)' }} />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
