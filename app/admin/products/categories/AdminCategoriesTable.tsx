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
                <td colSpan={5} className="px-5 py-16 text-center">
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

/* ─── Data ──────────────────────────────────────────────────────────────── */

const CATEGORIES: CategoryRow[] = [
  {
    id: 'CAT-001',
    name: 'Wigs & Hair',
    slug: 'wigs-hair',
    description: 'Lace fronts, closures, bundles & styling tools',
    productCount: 38,
    status: 'active',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    id: 'CAT-002',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Skincare, makeup, fragrance & cosmetics',
    productCount: 61,
    status: 'active',
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
  },
  {
    id: 'CAT-003',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Jewellery, belts, scarves & sunglasses',
    productCount: 44,
    status: 'active',
    iconBg: '#DBEAFE',
    iconColor: '#2563EB',
  },
  {
    id: 'CAT-004',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Heels, sandals, sneakers & flats',
    productCount: 27,
    status: 'active',
    iconBg: '#DCFCE7',
    iconColor: 'var(--color-success)',
  },
  {
    id: 'CAT-005',
    name: 'Handbags',
    slug: 'handbags',
    description: 'Totes, clutches, crossbodies & mini bags',
    productCount: 19,
    status: 'active',
    iconBg: '#F3E8FF',
    iconColor: '#9333EA',
  },
  {
    id: 'CAT-006',
    name: 'Apparel',
    slug: 'apparel',
    description: 'Dresses, co-ords, blouses & occasionwear',
    productCount: 0,
    status: 'draft',
    iconBg: 'var(--color-secondary)',
    iconColor: 'var(--color-text-muted)',
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */

const statusVariantMap: Record<CategoryStatus, 'success' | 'neutral'> = {
  active: 'success',
  draft: 'neutral',
};

const totalCategories = CATEGORIES.length;
const totalPublished = CATEGORIES.filter((c) => c.status === 'active').length;
const totalDraft = CATEGORIES.filter((c) => c.status === 'draft').length;

/* ─── Sub-components ────────────────────────────────────────────────────── */

function CategoryTableRow({
  category,
  idx,
  total,
}: {
  category: CategoryRow;
  idx: number;
  total: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      className="transition-colors"
      style={{
        background: hovered ? 'var(--color-surface)' : 'var(--color-surface-raised)',
        borderBottom: idx < total - 1 ? '1px solid var(--color-border)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Category name + icon */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: category.iconBg }}
          >
            <FolderOpen size={15} style={{ color: category.iconColor }} />
          </div>
          <div>
            <p
              className="text-sm font-semibold leading-tight"
              style={{ color: 'var(--color-text)' }}
            >
              {category.name}
            </p>
            <p
              className="text-xs mt-0.5 max-w-[200px] truncate"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {category.description}
            </p>
          </div>
        </div>
      </td>

      {/* Slug */}
      <td className="px-5 py-4">
        <code
          className="text-xs font-mono px-2 py-1 rounded"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border)',
          }}
        >
          {category.slug}
        </code>
      </td>

      {/* Product count */}
      <td className="px-5 py-4">
        <span
          className="text-sm font-semibold tabular-nums"
          style={{
            color:
              category.productCount === 0
                ? 'var(--color-text-muted)'
                : 'var(--color-text)',
          }}
        >
          {category.productCount === 0 ? '—' : category.productCount}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge
          label={category.status}
          variant={statusVariantMap[category.status]}
        />
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <button
          className="btn btn-sm btn-outline flex items-center gap-1.5"
          style={{ fontFamily: 'var(--font-primary)' }}
          aria-label={`Edit ${category.name}`}
        >
          <Pencil size={12} />
          Edit
        </button>
      </td>
    </tr>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export default function AdminCategoriesTable() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-semibold mb-1"
            style={{
              color: 'var(--deep)',
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Categories
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Organise your product catalogue
          </p>
        </div>

        <button
          className="btn btn-primary flex items-center gap-2 self-start sm:self-auto"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <Plus size={15} />
          Add Category
        </button>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total */}
        <div
          className="flex items-center gap-4 rounded-xl p-4"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            className="rounded-lg p-2.5 shrink-0"
            style={{ background: '#DBEAFE' }}
          >
            <Layers size={18} style={{ color: '#2563EB' }} />
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Total Categories
            </p>
            <p
              className="text-2xl font-bold mt-0.5 tabular-nums"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
            >
              {totalCategories}
            </p>
          </div>
        </div>

        {/* Published */}
        <div
          className="flex items-center gap-4 rounded-xl p-4"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            className="rounded-lg p-2.5 shrink-0"
            style={{ background: '#DCFCE7' }}
          >
            <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Published
            </p>
            <p
              className="text-2xl font-bold mt-0.5 tabular-nums"
              style={{ color: 'var(--color-success)', fontFamily: 'var(--font-primary)' }}
            >
              {totalPublished}
            </p>
          </div>
        </div>

        {/* Draft */}
        <div
          className="flex items-center gap-4 rounded-xl p-4"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            className="rounded-lg p-2.5 shrink-0"
            style={{ background: '#FEF3C7' }}
          >
            <FileText size={18} style={{ color: 'var(--color-warning)' }} />
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Draft
            </p>
            <p
              className="text-2xl font-bold mt-0.5 tabular-nums"
              style={{ color: 'var(--color-warning)', fontFamily: 'var(--font-primary)' }}
            >
              {totalDraft}
            </p>
          </div>
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr
              style={{
                background: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {['Category', 'Slug', 'Products', 'Status', 'Actions'].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {CATEGORIES.length > 0 ? (
              CATEGORIES.map((category, idx) => (
                <CategoryTableRow
                  key={category.id}
                  category={category}
                  idx={idx}
                  total={CATEGORIES.length}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--color-secondary)' }}
                    >
                      <Layers size={22} style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      No categories yet
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Add your first category to start organising products.
                    </p>
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
