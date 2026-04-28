'use client';

interface OrderRowData {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
}

interface RecentOrderRowProps {
  order: OrderRowData;
  idx: number;
  total: number;
}

export default function RecentOrderRow({ order, idx, total }: RecentOrderRowProps) {
  const statusStyles: Record<string, { bg: string; color: string }> = {
    delivered: { bg: '#DCFCE7', color: 'var(--color-success)' },
    shipped: { bg: '#DBEAFE', color: '#2563EB' },
    processing: { bg: '#FEF3C7', color: 'var(--color-warning)' },
    pending: { bg: 'var(--color-secondary)', color: 'var(--color-text-muted)' },
  };

  const style = statusStyles[order.status] || statusStyles.pending;

  return (
    <tr
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
      <td className="px-4 py-3.5 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
        {order.id}
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
        {order.customer}
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {order.date}
      </td>
      <td className="px-4 py-3.5 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
        ₦{order.total.toFixed(2)}
      </td>
      <td className="px-4 py-3.5">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide"
          style={{ background: style.bg, color: style.color }}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
}
