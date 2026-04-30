import { Metadata } from 'next';
import { Truck } from 'lucide-react';

export const metadata: Metadata = { title: 'Shipments — Perry Admin' };

export default function ShipmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Shipments
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Track and manage shipments</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Shipments content coming soon...</p>
      </div>
    </div>
  );
}
