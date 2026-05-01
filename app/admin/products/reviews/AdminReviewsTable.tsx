'use client';

import { useState, useEffect } from 'react';
import { Search, Star, Check, X, Loader2 } from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          size={13}
          fill={idx < rating ? 'currentColor' : 'none'}
          style={{ color: 'var(--terracotta)' }}
        />
      ))}
    </div>
  );
}

function ReviewRow({ review, onApprove, onReject, isUpdating }: {
  review: any;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isUpdating: boolean;
}) {
  const initials = review.user_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <tr className="transition-colors hover:bg-[var(--color-surface)]" style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border)' }}>
      <td className="px-4 py-3.5 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold" style={{ background: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{review.user_name}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{review.user_email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>{review.product_name}</td>
      <td className="px-4 py-3.5 text-sm max-w-xs">
        <p className="truncate" style={{ color: 'var(--color-text-muted)' }}>{review.title && <span className="font-medium">{review.title}: </span>}{review.body}</p>
      </td>
      <td className="px-4 py-3.5">
        <StarRating rating={review.rating} />
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {new Date(review.created_at).toLocaleDateString()}
      </td>
      <td className="px-4 py-3.5">
        {review.is_approved ? (
          <span className="text-xs font-medium text-green-600">Approved</span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onApprove(review.id)}
              disabled={isUpdating}
              className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition"
              title="Approve"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => onReject(review.id)}
              disabled={isUpdating}
              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
              title="Reject"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filter === 'pending') params.set('is_approved', 'false');
      if (filter === 'approved') params.set('is_approved', 'true');

      const res = await fetch(`/api/reviews?${params.toString()}`);
      const data = await res.json();
      setReviews(data.reviews ?? []);
    } catch {
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const handleApprove = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId: id, approved: true }),
      });
      if (res.ok) load();
    } catch (e) {
      console.error('Failed to approve review', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId: id, approved: false }),
      });
      if (res.ok) load();
    } catch (e) {
      console.error('Failed to reject review', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
            Product Reviews
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Manage and moderate customer reviews
          </p>
        </div>

        {/* Average rating pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl self-start sm:self-auto" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
          <Star size={18} fill="currentColor" style={{ color: 'var(--terracotta)' }} />
          <div>
            <p className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Avg. Rating
            </p>
            <p className="text-lg font-bold" style={{ color: 'var(--deep)', fontFamily: 'var(--font-primary)' }}>
              {avgRating} / 5
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search reviews..."
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <select
          className="h-10 px-3 text-sm rounded-lg outline-none"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'approved')}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: 'var(--color-surface)' }}>
              {['Customer', 'Product', 'Comment', 'Rating', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <Loader2 size={24} className="animate-spin mx-auto" style={{ color: 'var(--color-text-muted)' }} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-danger)' }}>
                  {error}
                </td>
              </tr>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewRow
                  key={review.id}
                  review={review}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  isUpdating={updatingId === review.id}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Star size={28} style={{ color: 'var(--mid)', opacity: 0.5 }} />
                    <p className="mt-3 text-sm" style={{ color: 'var(--mid)' }}>
                      No reviews found
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
