'use client';

import { Search, Star } from 'lucide-react';

interface ReviewRow {
  id: string;
  user: string;
  product: string;
  comment: string;
  rating: number;
  date: string;
}

const REVIEWS: ReviewRow[] = [
  { id: 'REV-001', user: 'Amara Okafor',  product: 'Silk Press Lace Wig — 24"',    comment: 'Absolutely love it! The quality is outstanding.',   rating: 5, date: 'Mar 15, 2024' },
  { id: 'REV-002', user: 'Chioma Nwosu',  product: 'Matte Velvet Lipstick Set',     comment: 'Great colour payoff, stays on all day.',            rating: 4, date: 'Mar 14, 2024' },
  { id: 'REV-003', user: 'Bolanle Ade',   product: 'Gold-Plated Hoop Earrings',     comment: 'Pretty but the coating chipped after two weeks.',   rating: 3, date: 'Mar 13, 2024' },
  { id: 'REV-004', user: 'Ngozi Eze',     product: 'Designer Clutch Bag',           comment: 'Exactly as pictured. Very elegant.',                rating: 5, date: 'Mar 12, 2024' },
  { id: 'REV-005', user: 'Funmi Bakare',  product: 'Stiletto Heels — Nude',         comment: 'True to size and very comfortable for heels.',      rating: 4, date: 'Mar 11, 2024' },
];

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

function ReviewRow({ review, idx, total }: { review: ReviewRow; idx: number; total: number }) {
  return (
    <tr
      className="transition-colors"
      style={{
        background: 'var(--color-surface-raised)',
        borderBottom: idx < total - 1 ? '1px solid var(--color-border)' : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-surface-raised)';
      }}
    >
      <td className="px-4 py-3.5 text-sm">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
            style={{ background: 'var(--color-secondary)', color: 'var(--color-primary)' }}
          >
            {review.user.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{review.user}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{review.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>{review.product}</td>
      <td className="px-4 py-3.5 text-sm max-w-xs">
        <p className="truncate" style={{ color: 'var(--color-text-muted)' }}>{review.comment}</p>
      </td>
      <td className="px-4 py-3.5">
        <StarRating rating={review.rating} />
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>{review.date}</td>
    </tr>
  );
}

export default function AdminReviewsTable() {
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Product Reviews
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Manage and moderate customer reviews
          </p>
        </div>

        {/* Average rating pill */}
        <div
          className="flex items-center gap-2.5 px-4 py-2 rounded-xl self-start sm:self-auto"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
          <Star size={18} fill="currentColor" style={{ color: 'var(--terracotta)' }} />
          <div>
            <p className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Avg. Rating
            </p>
            <p className="text-lg font-bold" style={{ color: 'var(--deep)', fontFamily: 'var(--font-primary)' }}>
              4.2 / 5
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
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
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          <option>All Ratings</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: 'var(--color-surface)' }}>
              {['Customer', 'Product', 'Comment', 'Rating', 'Date'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REVIEWS.length > 0 ? (
              REVIEWS.map((review, idx) => (
                <ReviewRow key={review.id} review={review} idx={idx} total={REVIEWS.length} />
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Star size={28} style={{ color: 'var(--mid)', opacity: 0.5 }} />
                    <p className="mt-3 text-sm" style={{ color: 'var(--mid)' }}>
                      No reviews yet
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
