import { Metadata } from 'next';
import { Boxes } from 'lucide-react';

export const metadata: Metadata = { title: 'Inventory — Perry Admin' };

export default function InventoryPage() {
  return (
    <div className="flex flex- col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Inventory
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Stock Overview</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Inventory content coming soon...</p>
      </div>
    </div>
  );
}
