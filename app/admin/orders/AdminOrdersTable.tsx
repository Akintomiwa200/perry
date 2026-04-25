'use client';

import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { Search, Filter } from 'lucide-react';

interface OrderRow {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const ORDERS: OrderRow[] = [
  { id: 'ORD-001', customer: 'Amara Okafor', date: 'Mar 15, 2024', items: 2, total: 124.5, status: 'delivered' },
  { id: 'ORD-002', customer: 'Chioma Nwosu', date: 'Mar 14, 2024', items: 1, total: 89.0, status: 'shipped' },
  { id: 'ORD-003', customer: 'Bolanle Ade', date: 'Mar 14, 2024', items: 4, total: 245.0, status: 'processing' },
  { id: 'ORD-004', customer: 'Ngozi Eze', date: 'Mar 13, 2024', items: 1, total: 56.99, status: 'pending' },
  { id: 'ORD-005', customer: 'Funmi Bakare', date: 'Mar 12, 2024', items: 3, total: 178.25, status: 'delivered' },
  { id: 'ORD-006', customer: 'Adeola Martins', date: 'Mar 12, 2024', items: 2, total: 134.0, status: 'cancelled' },
];

const statusMap: Record<string, 'success' | 'info' | 'warning' | 'neutral' | 'danger'> = {
  delivered: 'success',
  shipped: 'info',
  processing: 'warning',
  pending: 'neutral',
  cancelled: 'danger',
};

export default function AdminOrdersTable() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
        >
          Orders
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>
          Track and manage customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending', value: '12', color: 'var(--color-text-muted)' },
          { label: 'Processing', value: '8', color: 'var(--color-warning)' },
          { label: 'Shipped', value: '24', color: '#2563EB' },
          { label: 'Delivered', value: '186', color: 'var(--color-success)' },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 p-4 rounded-xl"
            style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
          >
            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>
              {s.label}
            </span>
            <span className="text-xl font-bold" style={{ color: s.color, fontFamily: 'var(--font-primary)' }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <select
          className="h-10 px-3 text-sm rounded-lg outline-none"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <button
          className="flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition-colors"
          style={{ background: 'var(--color-secondary)', color: 'var(--color-text)' }}
        >
          <Filter size={14} />
          Filter
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: 'id', header: 'Order ID' },
          { key: 'customer', header: 'Customer' },
          { key: 'date', header: 'Date' },
          {
            key: 'items',
            header: 'Items',
            render: (row: OrderRow) => (
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {row.items} item{row.items > 1 ? 's' : ''}
              </span>
            ),
          },
          {
            key: 'total',
            header: 'Total',
            render: (row: OrderRow) => (
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                ₦{row.total.toFixed(2)}
              </span>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row: OrderRow) => (
              <StatusBadge label={row.status} variant={statusMap[row.status] || 'neutral'} />
            ),
          },
        ]}
        data={ORDERS}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
}