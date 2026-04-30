import { Metadata } from 'next';
import { Package } from 'lucide-react';

export const metadata: Metadata = { title: 'Order Fulfillment — Perry Admin' };

export default function FulfillmentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}>
          Order Fulfillment
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>Process and fulfill orders</p>
      </div>
      <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
        <p style={{ color: 'var(--mid)' }}>Fulfillment content coming soon...</p>
      </div>
    </div>
  );
}
