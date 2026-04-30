import { Metadata } from 'next';
import { Map } from 'lucide-react';

export const metadata: Metadata = { title: 'Warehouses — Perry Admin' };

export default function WarehousesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Warehouses
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Manage warehouse locations</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Warehouses content coming soon...</p>
      </div>
    </div>
  );
}
