'use client';

import { Layers2, Plus, Search, BookOpen, Eye, Pencil } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';

interface Collection {
  id: string;
  name: string;
  description: string;
  products: number;
  status: 'published' | 'draft';
  slug: string;
}

const COLLECTIONS: Collection[] = [
  {
    id: 'COL-001',
    name: 'Summer Luxe',
    description: 'Vibrant, heat-ready pieces crafted for sun-soaked events and beach getaways.',
    products: 18,
    status: 'published',
    slug: 'summer-luxe',
  },
  {
    id: 'COL-002',
    name: 'Ankara Edit',
    description: 'Bold African print styles blending tradition with contemporary silhouettes.',
    products: 24,
    status: 'published',
    slug: 'ankara-edit',
  },
  {
    id: 'COL-003',
    name: 'Bridal Essentials',
    description: 'From Aso-Oke to accessories — everything the modern Nigerian bride needs.',
    products: 31,
    status: 'published',
    slug: 'bridal-essentials',
  },
  {
    id: 'COL-004',
    name: 'Street Style',
    description: 'Urban-inspired fits for the Lagos woman on the move — effortless and fierce.',
    products: 15,
    status: 'draft',
    slug: 'street-style',
  },
  {
    id: 'COL-005',
    name: 'Office Chic',
    description: 'Polished work-wear that commands the boardroom without sacrificing style.',
    products: 20,
    status: 'published',
    slug: 'office-chic',
  },
];

const statusVariantMap: Record<Collection['status'], 'success' | 'neutral'> = {
  published: 'success',
  draft: 'neutral',
};

/* ─── Stat Cards ─────────────────────────────────────────────────────────── */

interface StatCardData {
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
}

function StatCard({ label, value, iconBg, iconColor }: StatCardData) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-4"
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        className="rounded-lg p-2.5 shrink-0"
        style={{ background: iconBg }}
      >
        <Layers2 size={17} style={{ color: iconColor }} />
      </div>
      <div>
        <p
          className="text-xs uppercase tracking-wide font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {label}
        </p>
        <p
          className="text-xl font-bold mt-0.5"
          style={{ color: 'var(--color-text)' }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Collection Row ─────────────────────────────────────────────────────── */

function CollectionRow({
  collection,
  idx,
  total,
}: {
  collection: Collection;
  idx: number;
  total: number;
}) {
  return (
    <tr
      className="transition-colors"
      style={{
        background: 'var(--color-surface-raised)',
        borderBottom:
          idx < total - 1 ? '1px solid var(--color-border)' : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-surface-raised)';
      }}
    >
      {/* Collection name + id */}
      <td className="px-5 py-4 text-sm">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-secondary)' }}
          >
            <Layers2 size={16} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              {collection.name}
            </p>
            <p
              className="text-xs font-mono mt-0.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {collection.id}
            </p>
          </div>
        </div>
      </td>

      {/* Description */}
      <td className="px-5 py-4 text-sm max-w-xs">
        <p
          className="line-clamp-2 leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {collection.description}
        </p>
      </td>

      {/* Product count */}
      <td className="px-5 py-4 text-sm">
        <div className="flex items-center gap-1.5">
          <BookOpen size={13} style={{ color: 'var(--color-text-muted)' }} />
          <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
            {collection.products}
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {collection.products === 1 ? 'product' : 'products'}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge
          label={collection.status}
          variant={statusVariantMap[collection.status]}
        />
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm flex items-center gap-1.5"
            style={{
              background: 'var(--color-secondary)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-primary)',
            }}
            aria-label={`View ${collection.name}`}
          >
            <Eye size={13} />
            View
          </button>
          <button
            className="btn btn-sm btn-primary flex items-center gap-1.5"
            style={{ fontFamily: 'var(--font-primary)' }}
            aria-label={`Edit ${collection.name}`}
          >
            <Pencil size={13} />
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function AdminCollectionsTable() {
  const totalCollections = COLLECTIONS.length;
  const published = COLLECTIONS.filter((c) => c.status === 'published').length;
  const totalProducts = COLLECTIONS.reduce((sum, c) => sum + c.products, 0);

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{
              color: 'var(--deep)',
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Collections
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Curate themed product groups for your storefront
          </p>
        </div>

        <button
          className="btn btn-primary flex items-center gap-2 self-start sm:self-auto"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <Plus size={15} />
          New Collection
        </button>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Collections"
          value={totalCollections}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />
        <StatCard
          label="Published"
          value={published}
          iconBg="#DCFCE7"
          iconColor="var(--color-success)"
        />
        <StatCard
          label="Products in Collections"
          value={totalProducts}
          iconBg="var(--color-secondary)"
          iconColor="var(--color-primary)"
        />
      </div>

      {/* ── Search & Filter Bar ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}
        >
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search collections..."
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
          />
        </div>

        <select
          className="h-10 px-3 text-sm rounded-lg outline-none"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr
              style={{
                background: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {['Collection', 'Description', 'Products', 'Status', 'Actions'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {COLLECTIONS.length > 0 ? (
              COLLECTIONS.map((collection, idx) => (
                <CollectionRow
                  key={collection.id}
                  collection={collection}
                  idx={idx}
                  total={COLLECTIONS.length}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--color-secondary)' }}
                    >
                      <Layers2
                        size={22}
                        style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
                      />
                    </div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      No collections yet
                    </p>
                    <p
                      className="text-xs max-w-xs"
                      style={{ color: 'var(--color-text-muted)', opacity: 0.75 }}
                    >
                      Create your first collection to start grouping products for
                      your storefront.
                    </p>
                    <button
                      className="btn btn-primary btn-sm flex items-center gap-1.5 mt-1"
                      style={{ fontFamily: 'var(--font-primary)' }}
                    >
                      <Plus size={13} />
                      New Collection
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
