import { Metadata } from 'next';
import { RotateCcw } from 'lucide-react';

export const metadata: Metadata = { title: 'Returns & Refunds — Perry Admin' };

export default function ReturnsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Returns & Refunds
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Manage returns and refund requests</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Returns content coming soon...</p>
      </div>
    </div>
  );
}
