import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = { title: 'Low Stock — Perry Admin' };

export default function LowStockPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Low Stock Alerts
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Products running low on inventory</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Low stock content coming soon...</p>
      </div>
    </div>
  );
}
