import { Metadata } from 'next';
import { Clock } from 'lucide-react';

export const metadata: Metadata = { title: 'Pending Orders — Perry Admin' };

export default function PendingOrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Pending Orders
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Orders awaiting processing</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Pending orders content coming soon...</p>
      </div>
    </div>
  );
}
