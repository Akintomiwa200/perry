'use client';

import { useMemo, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdminOrders } from '@/hooks/useAdmin';
import { formatNaira } from '@/lib/utils';

const statusMap: Record<string, 'success' | 'info' | 'warning' | 'neutral' | 'danger'> = {
  delivered: 'success',
  shipped: 'info',
  processing: 'warning',
  pending: 'neutral',
  cancelled: 'danger',
};

function OrderRow({ order, idx, total }: { order: any; idx: number; total: number }) {
  const created = order.created_at ? new Date(order.created_at) : null;
  const customer = order.customer_name ?? order.customer_email ?? 'Customer';
  return (
    <tr
      key={order.id}
      className="transition-colors"
      style={{
        background: 'var(--color-surface-raised)',
        borderBottom: idx < total - 1 ? '1px solid var(--color-border)' : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-surface-raised)';
      }}
    >
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
        {order.order_number ?? `#${order.id}`}
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>{customer}</td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {created ? created.toLocaleDateString() : '-'}
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {Array.isArray(order.items) ? order.items.length : 0} item
        {Array.isArray(order.items) && order.items.length > 1 ? 's' : ''}
      </td>
      <td className="px-4 py-3.5 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
        {formatNaira(Number(order.total ?? 0))}
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge label={order.status} variant={statusMap[order.status] || 'neutral'} />
      </td>
    </tr>
  );
}

export default function AdminOrdersTable() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const { orders, total, isLoading, error } = useAdminOrders({
    status: statusFilter || undefined,
    search: search || undefined,
    limit: 50,
  });

  const counts = useMemo(() => {
    const out = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
    };
    for (const o of orders as any[]) {
      if (o.status in out) out[o.status as keyof typeof out] += 1;
    }
    return out;
  }, [orders]);

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
              {s.label === 'Pending'
                ? counts.pending
                : s.label === 'Processing'
                  ? counts.processing
                  : s.label === 'Shipped'
                    ? counts.shipped
                    : counts.delivered}
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
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setSearch(inputSearch.trim());
            }}
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          className="flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition-colors"
          style={{ background: 'var(--color-secondary)', color: 'var(--color-text)' }}
          onClick={() => setSearch(inputSearch.trim())}
        >
          <Filter size={14} />
          Filter
        </button>
      </div>

       {/* Table */}
       <div
         className="overflow-x-auto rounded-xl"
         style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
       >
         <table className="w-full text-left border-collapse">
           <thead>
             <tr style={{ background: 'var(--color-surface)' }}>
               {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status'].map((h) => (
                 <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                   {h}
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {isLoading && (
               <tr>
                 <td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                   Loading orders…
                 </td>
               </tr>
             )}
             {!isLoading && error && (
               <tr>
                 <td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-danger)' }}>
                   {error}
                 </td>
               </tr>
             )}
             {!isLoading && !error && (orders as any[]).map((order, idx) => (
               <OrderRow key={order.id} order={order} idx={idx} total={(orders as any[]).length} />
             ))}
             {!isLoading && !error && (orders as any[]).length === 0 && (
               <tr>
                 <td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                   No orders found.
                 </td>
               </tr>
             )}
           </tbody>
         </table>
       </div>
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        Showing {(orders as any[]).length} of {total} orders
      </p>
    </div>
  );
}
