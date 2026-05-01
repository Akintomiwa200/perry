'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Layers,
  CheckCircle2,
  FileText,
  FolderOpen,
  Loader2,
  Trash2,
} from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useRouter } from 'next/navigation';

type CategoryStatus = 'active' | 'draft';

export default function AdminCategoriesTable() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories ?? []);
    } catch {
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = search
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.slug.toLowerCase().includes(search.toLowerCase()),
      )
    : categories;

  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.status === 'active').length,
    draft: categories.filter((c) => c.status === 'draft').length,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
            Categories
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Organise your product catalogue
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/products/categories/new')}
          className="btn btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          Add Category
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Categories', value: stats.total, icon: Layers, iconBg: '#DBEAFE', iconColor: '#2563EB' },
          { label: 'Published', value: stats.active, icon: CheckCircle2, iconBg: '#DCFCE7', iconColor: 'var(--color-success)' },
          { label: 'Draft', value: stats.draft, icon: FileText, iconBg: '#FEF3C7', iconColor: 'var(--color-warning)' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl p-4" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
            <div className="rounded-lg p-2.5 shrink-0" style={{ background: s.iconBg }}>
              <s.icon size={18} style={{ color: s.iconColor }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              <p className="text-2xl font-bold mt-0.5 tabular-nums" style={{ color: 'var(--color-text)' }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 h-10 rounded-lg max-w-sm" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
        <Layers size={14} style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm outline-none w-full"
          style={{ color: 'var(--color-text)' }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
              {['Category', 'Slug', 'Products', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="px-5 py-16 text-center"><Loader2 size={24} className="animate-spin mx-auto" style={{ color: 'var(--color-text-muted)' }} /></td></tr>
            ) : error ? (
              <tr><td colSpan={5} className="px-5 py-16 text-center text-sm" style={{ color: 'var(--color-danger)' }}>{error}</td></tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-secondary)' }}>
                      <Layers size={22} style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>No categories found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((category, idx) => (
                <tr
                  key={category.id}
                  className="transition-colors hover:bg-[var(--color-surface)]"
                  style={{ background: 'var(--color-surface-raised)', borderBottom: idx < filtered.length - 1 ? '1px solid var(--color-border)' : undefined }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--color-secondary)' }}>
                        <FolderOpen size={15} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{category.name}</p>
                        <p className="text-xs mt-0.5 max-w-[200px] truncate" style={{ color: 'var(--color-text-muted)' }}>{category.description || 'No description'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <code className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>{category.slug}</code>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--color-text)' }}>{category.product_count ?? 0}</span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge label={category.status || 'draft'} variant={category.status === 'active' ? 'success' : 'neutral'} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="btn btn-sm btn-outline flex items-center gap-1.5" onClick={() => router.push(`/admin/products/categories/${category.slug}/edit`)}>
                        <Pencil size={12} /> Edit
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition" title="Delete">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
