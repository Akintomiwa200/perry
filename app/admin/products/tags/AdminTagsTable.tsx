'use client';

import { useState, useEffect } from 'react';
import { Plus, Tag, Pencil, Search, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminTagsTable() {
  const router = useRouter();
  const [tags, setTags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/tags');
      const data = await res.json();
      setTags(data.tags ?? []);
    } catch {
      setError('Failed to load tags');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = query
    ? tags.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.slug.toLowerCase().includes(query.toLowerCase()),
      )
    : tags;

  const mostUsed = tags.reduce((prev, curr) =>
    (curr.product_count ?? 0) > (prev.product_count ?? 0) ? curr : prev,
    null as any,
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
            Tags
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Label and filter your products with tags
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/products/tags/new')}
          className="btn btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          Add Tag
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F3E8FF' }}>
            <Tag size={18} style={{ color: '#6B21A8' }} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>Total Tags</span>
            <span className="text-2xl font-bold leading-none" style={{ color: 'var(--deep)' }}>{tags.length}</span>
          </div>
        </div>

        {mostUsed && (
          <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#E0F2FE' }}>
              <Tag size={18} style={{ color: '#0369A1' }} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>Most Used</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                  <Tag size={10} /> {mostUsed.name}
                </span>
                <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--color-text-muted)' }}>{mostUsed.product_count ?? 0} products</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 h-10 rounded-lg max-w-sm" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
        <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          placeholder="Search tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-sm outline-none w-full"
          style={{ color: 'var(--color-text)' }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
              {['Tag Name', 'Slug', 'Products Tagged', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="px-5 py-16 text-center"><Loader2 size={24} className="animate-spin mx-auto" style={{ color: 'var(--color-text-muted)' }} /></td></tr>
            ) : error ? (
              <tr><td colSpan={4} className="px-5 py-16 text-center text-sm" style={{ color: 'var(--color-danger)' }}>{error}</td></tr>
            ) : filtered.length > 0 ? (
              filtered.map((tag, idx) => (
                <tr key={tag.id} className="transition-colors hover:bg-[var(--color-surface)]" style={{ background: 'var(--color-surface-raised)', borderBottom: idx < filtered.length - 1 ? '1px solid var(--color-border)' : undefined }}>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                      <Tag size={10} /> {tag.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--color-secondary)', color: 'var(--color-text-muted)' }}>{tag.slug}</code>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium tabular-nums" style={{ color: 'var(--color-text)' }}>{tag.product_count ?? 0}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="btn btn-sm btn-outline flex items-center gap-1.5" onClick={() => router.push(`/admin/products/tags/${tag.slug}/edit`)}>
                        <Pencil size={12} /> Edit
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
                <td colSpan={4}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-secondary)' }}>
                      <Tag size={22} style={{ color: 'var(--color-text-muted)', opacity: 0.6 }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>No tags found</p>
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
