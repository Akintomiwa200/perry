import { Metadata } from 'next';
import { RefreshCcw } from 'lucide-react';

export const metadata: Metadata = { title: 'Inventory Adjustments — Perry Admin' };

export default function AdjustmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Inventory Adjustments
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Record inventory changes</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Adjustments content coming soon...</p>
      </div>
    </div>
  );
}
