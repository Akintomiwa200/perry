'use client';

import { useState, useEffect, useCallback } from 'react';
import { Package, Plus, Search, Loader2, ImageOff } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { formatNaira } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const statusMap: Record<string, 'success' | 'warning' | 'neutral'> = {
  active: 'success',
  draft: 'neutral',
  out_of_stock: 'warning',
};

function ProductCard({ product, onSelect }: { product: any; onSelect: (id: number) => void }) {
  const stock = Number(product.stock ?? 0);
  const status = stock === 0 ? 'out_of_stock' : product.status;
  const image = product.images?.[0];

  return (
    <div
      onClick={() => onSelect(product.id)}
      className="group cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md"
      style={{ background: 'var(--color-surface-raised)', borderColor: 'var(--color-border)' }}
    >
      <div className="w-full h-40 rounded-lg mb-3 flex items-center justify-center overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
        {image ? (
          <img src={image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <ImageOff size={32} style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>{product.name}</h3>
          <StatusBadge label={status.replace('_', ' ')} variant={statusMap[status] || 'neutral'} />
        </div>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {product.sku || `#${product.id}`} • {product.category_name ?? 'Uncategorized'}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold" style={{ color: 'var(--deep)' }}>{formatNaira(Number(product.price ?? 0))}</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              color: stock === 0 ? 'var(--color-danger)' : stock <= 5 ? 'var(--color-warning)' : 'var(--color-success)',
              background: stock === 0 ? '#FEE2E2' : stock <= 5 ? '#FEF3C7' : '#DCFCE7',
            }}
          >
            {stock === 0 ? 'Out' : stock <= 5 ? `Low (${stock})` : `In (${stock})`}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, idx, onSelect }: { product: any; idx: number; onSelect: (id: number) => void }) {
  const stock = Number(product.stock ?? 0);
  const status = stock === 0 ? 'out_of_stock' : product.status;

  return (
    <tr
      onClick={() => onSelect(product.id)}
      className="cursor-pointer transition-colors hover:bg-[var(--color-surface)]"
      style={{ background: 'var(--color-surface-raised)', borderBottom: idx < idx ? '1px solid var(--color-border)' : undefined }}
    >
      <td className="px-4 py-3.5 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
            {product.images?.[0] ? (
              <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
            ) : (
              <Package size={16} style={{ color: 'var(--color-primary)' }} />
            )}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{product.name}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{product.sku || `#${product.id}`}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>{product.category_name ?? 'Uncategorized'}</td>
      <td className="px-4 py-3.5 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{formatNaira(Number(product.price ?? 0))}</td>
      <td className="px-4 py-3.5 text-sm">
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{
            color: stock === 0 ? 'var(--color-danger)' : stock <= 5 ? 'var(--color-warning)' : 'var(--color-success)',
            background: stock === 0 ? '#FEE2E2' : stock <= 5 ? '#FEF3C7' : '#DCFCE7',
          }}
        >
          {stock === 0 ? 'Out of stock' : stock}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge label={status.replace('_', ' ')} variant={statusMap[status] || 'neutral'} />
      </td>
    </tr>
  );
}

export default function AdminProductsTable() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const loadProducts = useCallback(() => {
    const params = new URLSearchParams();
    params.set('limit', '100');
    if (status && status !== 'all') params.set('status', status);
    if (search) params.set('search', search);
    if (category) params.set('category', category);

    setIsLoading(true);
    setError(null);
    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setError('Failed to load products'))
      .finally(() => setIsLoading(false));
  }, [search, category, status]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleSelect = (id: number) => {
    router.push(`/admin/products/${id}`);
  };

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    outOfStock: products.filter((p) => Number(p.stock ?? 0) === 0).length,
    lowStock: products.filter((p) => { const s = Number(p.stock ?? 0); return s > 0 && s <= 5; }).length,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'var(--deep)' },
          { label: 'Active', value: stats.active, color: 'var(--color-success)' },
          { label: 'Low Stock', value: stats.lowStock, color: 'var(--color-warning)' },
          { label: 'Out of Stock', value: stats.outOfStock, color: 'var(--color-danger)' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs uppercase tracking-wider font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>Products</h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>Manage your store catalog and inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <button onClick={() => setViewMode('table')} className="px-3 py-1.5 text-xs font-medium transition" style={{ background: viewMode === 'table' ? 'var(--deep)' : 'var(--color-surface-raised)', color: viewMode === 'table' ? 'var(--cream)' : 'var(--color-text)' }}>Table</button>
            <button onClick={() => setViewMode('grid')} className="px-3 py-1.5 text-xs font-medium transition" style={{ background: viewMode === 'grid' ? 'var(--deep)' : 'var(--color-surface-raised)', color: viewMode === 'grid' ? 'var(--cream)' : 'var(--color-text)' }}>Grid</button>
          </div>
          <button onClick={() => router.push('/admin/products/new')} className="btn btn-primary flex items-center gap-2" style={{ background: 'var(--deep)', color: 'var(--cream)' }}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input type="text" placeholder="Search products..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') setSearch(searchInput.trim()); }} className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--color-text)' }} />
        </div>
        <select className="h-10 px-3 text-sm rounded-lg outline-none" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="accessories">Accessories</option>
          <option value="footwear">Footwear</option>
          <option value="wigs-hair">Wigs & Hair</option>
          <option value="beauty">Beauty</option>
          <option value="handbags">Handbags</option>
        </select>
        <select className="h-10 px-3 text-sm rounded-lg outline-none" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <button className="h-10 px-4 text-sm rounded-lg font-medium transition hover:opacity-80" style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)' }} onClick={() => { setSearch(searchInput.trim()); }}>Search</button>
        <button className="h-10 px-4 text-sm rounded-lg font-medium transition hover:opacity-80" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }} onClick={() => { setSearch(''); setCategory(''); setStatus('all'); setSearchInput(''); }}>Clear</button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-text-muted)' }} /></div>
      ) : error ? (
        <div className="text-center py-12 text-sm" style={{ color: 'var(--color-danger)' }}>{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
          <Package size={48} className="mx-auto mb-4 opacity-20" />
          <p>No products found.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={handleSelect} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: 'var(--color-surface)' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <ProductRow key={product.id} product={product} idx={idx} onSelect={handleSelect} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
