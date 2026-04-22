'use client';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

// Mock orders — replace with real API call
const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    createdAt: '2024-03-15T10:30:00Z',
    status: 'delivered',
    total: 124.98,
    itemCount: 2,
  },
  {
    id: 'ORD-002',
    createdAt: '2024-02-20T14:15:00Z',
    status: 'shipped',
    total: 299.99,
    itemCount: 1,
  },
  {
    id: 'ORD-003',
    createdAt: '2024-01-08T09:00:00Z',
    status: 'processing',
    total: 54.97,
    itemCount: 3,
  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending:    { bg: 'var(--color-secondary)', color: 'var(--color-text-muted)', label: 'Pending' },
  processing: { bg: '#FEF3C7', color: 'var(--color-warning)', label: 'Processing' },
  shipped:    { bg: '#DBEAFE', color: '#1D4ED8', label: 'Shipped' },
  delivered:  { bg: '#DCFCE7', color: 'var(--color-success)', label: 'Delivered' },
  cancelled:  { bg: '#FEE2E2', color: 'var(--color-danger)', label: 'Cancelled' },
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>My Orders</h1>

      {MOCK_ORDERS.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <Package size={48} style={{ color: 'var(--color-border)' }} />
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>No orders yet</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Start shopping to see your orders here.</p>
          <Link href="/shop" className="btn btn-primary mt-2">Browse Collectibles</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map((order) => {
            const status = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between p-5 transition-all hover:shadow-md"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--color-secondary)' }}
                  >
                    <Package size={18} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                      {order.id}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {formatDate(order.createdAt)} · {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="badge"
                    style={{ background: status.bg, color: status.color }}
                  >
                    {status.label}
                  </span>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                    {formatPrice(order.total)}
                  </span>
                  <ChevronRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
