'use client';

import { useState } from 'react';
import { Plus, Tag, Pencil, Search } from 'lucide-react';

interface TagRow {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  pill: { bg: string; color: string };
}

const TAGS: TagRow[] = [
  {
    id: 'TAG-001',
    name: 'New Arrival',
    slug: 'new-arrival',
    productCount: 34,
    pill: { bg: '#E0F2FE', color: '#0369A1' },
  },
  {
    id: 'TAG-002',
    name: 'Bestseller',
    slug: 'bestseller',
    productCount: 52,
    pill: { bg: '#FEF9C3', color: '#854D0E' },
  },
  {
    id: 'TAG-003',
    name: 'Limited Edition',
    slug: 'limited-edition',
    productCount: 11,
    pill: { bg: '#FEE2E2', color: '#991B1B' },
  },
  {
    id: 'TAG-004',
    name: 'Sale',
    slug: 'sale',
    productCount: 28,
    pill: { bg: '#FFEDD5', color: '#9A3412' },
  },
  {
    id: 'TAG-005',
    name: 'Trending',
    slug: 'trending',
    productCount: 19,
    pill: { bg: '#F3E8FF', color: '#6B21A8' },
  },
  {
    id: 'TAG-006',
    name: 'Handmade',
    slug: 'handmade',
    productCount: 15,
    pill: { bg: '#DCFCE7', color: '#166534' },
  },
  {
    id: 'TAG-007',
    name: 'Luxury',
    slug: 'luxury',
    productCount: 23,
    pill: { bg: '#FCE7F3', color: '#9D174D' },
  },
  {
    id: 'TAG-008',
    name: 'Gift Ready',
    slug: 'gift-ready',
    productCount: 41,
    pill: { bg: '#E0F7F4', color: '#0F766E' },
  },
];

const MOST_USED = TAGS.reduce((prev, curr) =>
  curr.productCount > prev.productCount ? curr : prev,
);

// ─── Tag Pill ────────────────────────────────────────────────────────────────
function TagPill({ tag }: { tag: TagRow }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        background: tag.pill.bg,
        color: tag.pill.color,
        letterSpacing: '0.3px',
      }}
    >
      <Tag size={10} strokeWidth={2.5} />
      {tag.name}
    </span>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────
function TagTableRow({
  tag,
  idx,
  total,
}: {
  tag: TagRow;
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
      {/* Tag Name */}
      <td className="px-5 py-3.5">
        <TagPill tag={tag} />
      </td>

      {/* Slug */}
      <td className="px-5 py-3.5">
        <code
          className="text-xs px-2 py-0.5 rounded-md"
          style={{
            fontFamily: 'var(--font-mono)',
            background: 'var(--color-secondary)',
            color: 'var(--color-text-muted)',
          }}
        >
          {tag.slug}
        </code>
      </td>

      {/* Products Tagged */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 rounded-full"
            style={{
              width: `${Math.round((tag.productCount / MOST_USED.productCount) * 72)}px`,
              background: tag.pill.color,
              opacity: 0.35,
              minWidth: '6px',
            }}
          />
          <span
            className="text-sm font-medium tabular-nums"
            style={{ color: 'var(--color-text)' }}
          >
            {tag.productCount}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5">
        <button
          className="btn btn-sm btn-outline flex items-center gap-1.5"
          style={{ fontFamily: 'var(--font-primary)' }}
          aria-label={`Edit ${tag.name} tag`}
        >
          <Pencil size={12} />
          Edit
        </button>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminTagsTable() {
  const [query, setQuery] = useState('');

  const filtered = TAGS.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.slug.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{
              color: 'var(--deep)',
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Tags
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Label and filter your products with tags
          </p>
        </div>

        <button
          className="btn btn-primary flex items-center gap-2 self-start sm:self-auto"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <Plus size={15} />
          Add Tag
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Total Tags */}
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: '#F3E8FF' }}
          >
            <Tag size={18} style={{ color: '#6B21A8' }} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Total Tags
            </span>
            <span
              className="text-2xl font-bold leading-none"
              style={{
                color: 'var(--deep)',
                fontFamily: 'var(--font-primary)',
              }}
            >
              {TAGS.length}
            </span>
          </div>
        </div>

        {/* Most Used */}
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: MOST_USED.pill.bg }}
          >
            <Tag size={18} style={{ color: MOST_USED.pill.color }} />
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Most Used
            </span>
            <div className="flex items-center gap-2">
              <TagPill tag={MOST_USED} />
              <span
                className="text-xs font-semibold tabular-nums"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {MOST_USED.productCount} products
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div
        className="flex items-center gap-2 px-3 h-10 rounded-lg max-w-sm"
        style={{
          background: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border)',
        }}
      >
        <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          placeholder="Search tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-sm outline-none w-full"
          style={{
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
          }}
        />
      </div>

      {/* ── Table ── */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              style={{
                background: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {['Tag Name', 'Slug', 'Products Tagged', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((tag, idx) => (
                <TagTableRow
                  key={tag.id}
                  tag={tag}
                  idx={idx}
                  total={filtered.length}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--color-secondary)' }}
                    >
                      <Tag
                        size={22}
                        style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-text)' }}
                      >
                        No tags found
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {query
                          ? `No results for "${query}" — try a different search.`
                          : 'Add your first tag to start organising products.'}
                      </p>
                    </div>
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
