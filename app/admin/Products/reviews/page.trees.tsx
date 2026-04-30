import { Metadata } from 'next';
import { Star } from 'lucide-react';

export const metadata: Metadata = { title: 'Product Reviews — Perry Admin' };

export default function ReviewsPage() {
  return (
    <div className="flex flex- col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Product Reviews
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Manage customer reviews</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Reviews content coming soon...</p>
      </div>
    </div>
  );
}
