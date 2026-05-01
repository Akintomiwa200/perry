'use client';

import { useState, useEffect } from 'react';
import { Layers2, Plus, Search, BookOpen, Pencil, Loader2, Trash2 } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useRouter } from 'next/navigation';

export default function AdminCollectionsTable() {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/collections');
      const data = await res.json();
      setCollections(data.collections ?? []);
    } catch {
      setError('Failed to load collections');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = collections.filter((c) => {
    const matchesSearch = search
      ? c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: collections.length,
    published: collections.filter((c) => c.status === 'published').length,
    totalProducts: collections.reduce((sum, c) => sum + (c.product_count ?? 0), 0),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
            Collections
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Curate themed product groups for your storefront
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/products/collections/new')}
          className="btn btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          New Collection
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Collections', value: stats.total, iconBg: '#DBEAFE', iconColor: '#2563EB' },
          { label: 'Published', value: stats.published, iconBg: '#DCFCE7', iconColor: 'var(--color-success)' },
          { label: 'Products in Collections', value: stats.totalProducts, iconBg: 'var(--color-secondary)', iconColor: 'var(--color-primary)' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl p-4" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
            <div className="rounded-lg p-2.5 shrink-0" style={{ background: s.iconBg }}>
              <Layers2 size={17} style={{ color: s.iconColor }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              <p className="text-xl font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--color-text)' }}
          />
        </div>
        <select
          className="h-10 px-3 text-sm rounded-lg outline-none"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
              {['Collection', 'Description', 'Products', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="px-5 py-16 text-center"><Loader2 size={24} className="animate-spin mx-auto" style={{ color: 'var(--color-text-muted)' }} /></td></tr>
            ) : error ? (
              <tr><td colSpan={5} className="px-5 py-16 text-center text-sm" style={{ color: 'var(--color-danger)' }}>{error}</td></tr>
            ) : filtered.length > 0 ? (
              filtered.map((collection, idx) => (
                <tr
                  key={collection.id}
                  className="transition-colors hover:bg-[var(--color-surface)]"
                  style={{ background: 'var(--color-surface-raised)', borderBottom: idx < filtered.length - 1 ? '1px solid var(--color-border)' : undefined }}
                >
                  <td className="px-5 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--color-secondary)' }}>
                        <Layers2 size={16} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{collection.name}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{collection.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm max-w-xs">
                    <p className="line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{collection.description || 'No description'}</p>
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={13} style={{ color: 'var(--color-text-muted)' }} />
                      <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{collection.product_count ?? 0}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge label={collection.status} variant={collection.status === 'published' ? 'success' : 'neutral'} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-sm flex items-center gap-1.5"
                        style={{ background: 'var(--color-secondary)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                        onClick={() => router.push(`/admin/products/collections/${collection.slug}`)}
                      >
                        <BookOpen size={13} /> View
                      </button>
                      <button
                        className="btn btn-sm btn-primary flex items-center gap-1.5"
                        onClick={() => router.push(`/admin/products/collections/${collection.slug}/edit`)}
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition" title="Delete">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-secondary)' }}>
                      <Layers2 size={22} style={{ color: 'var(--color-text-muted)', opacity: 0.6 }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>No collections yet</p>
                    <button
                      className="btn btn-primary btn-sm flex items-center gap-1.5 mt-1"
                      onClick={() => router.push('/admin/products/collections/new')}
                    >
                      <Plus size={13} /> New Collection
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
