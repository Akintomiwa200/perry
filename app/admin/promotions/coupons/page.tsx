import { Metadata } from 'next';
import { Ticket } from 'lucide-react';

export const metadata: Metadata = { title: 'Coupons — Perry Admin' };

export default function CouponsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Coupons
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Manage promotional coupons</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Coupons content coming soon...</p>
      </div>
    </div>
  );
}
