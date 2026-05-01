'use client';

import { useAdminStats } from '@/hooks/useAdmin';

function money(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminDashboardPage() {
  const { stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return <p style={{ color: 'var(--color-text-muted)' }}>Loading dashboard…</p>;
  }

  if (error || !stats) {
    return (
      <div
        style={{
          padding: '1rem',
          border: '1px solid #fecaca',
          background: '#fef2f2',
          color: '#b91c1c',
          borderRadius: 8,
        }}
      >
        {error ?? 'Failed to load admin dashboard.'}
      </div>
    );
  }

  const cards = [
    { label: 'Revenue', value: money(stats.totalRevenue) },
    { label: 'Orders', value: stats.totalOrders.toLocaleString() },
    { label: 'Customers', value: stats.totalCustomers.toLocaleString() },
    { label: 'Active Products', value: stats.totalProducts.toLocaleString() },
    { label: 'Low Stock', value: stats.lowStockCount.toLocaleString() },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: 4 }}>
          Live overview from your backend data.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              padding: '0.9rem',
            }}
          >
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{card.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: 10,
          padding: '1rem',
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 10 }}>
          Recent Orders
        </h2>
        {stats.recentOrders.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No recent orders yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: 8 }}>
            {stats.recentOrders.map((order: any) => (
              <div
                key={order.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 8,
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: 8,
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                    {order.order_number ?? order.orderNumber ?? `#${order.id}`}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                    {order.customer_name ?? order.customerName ?? 'Customer'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                    {money(Number(order.total ?? 0))}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                    {String(order.status ?? '').toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
