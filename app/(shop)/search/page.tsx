'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import ProductList from '@/components/product/ProductList';
import { useProducts } from '@/hooks/useProducts';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);

  const { products, isLoading } = useProducts({ search: submitted || undefined });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(query);
    router.replace(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Search</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-10 max-w-xl">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collectibles..."
            className="input pl-10"
            autoFocus
            aria-label="Search"
          />
        </div>
        <button type="submit" className="btn btn-primary px-6">Search</button>
      </form>

      {submitted && (
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          {isLoading ? 'Searching...' : `${products.length} results for "${submitted}"`}
        </p>
      )}

      {!submitted ? (
        <div className="text-center py-20">
          <span className="text-6xl">🔍</span>
          <p className="mt-4 text-base" style={{ color: 'var(--color-text-muted)' }}>
            Enter a search term to find collectibles
          </p>
        </div>
      ) : (
        <ProductList
          products={products}
          emptyMessage={`No results for "${submitted}". Try a different search.`}
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center" style={{ color: 'var(--color-text-muted)' }}>Loading search…</div>
    }>
      <SearchContent />
    </Suspense>
  );
}
