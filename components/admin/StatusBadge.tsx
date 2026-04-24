'use client';

type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
}

const variantStyles: Record<StatusVariant, { bg: string; color: string }> = {
  success: { bg: '#DCFCE7', color: 'var(--color-success)' },
  warning: { bg: '#FEF3C7', color: 'var(--color-warning)' },
  danger: { bg: '#FEE2E2', color: 'var(--color-danger)' },
  info: { bg: '#DBEAFE', color: '#2563EB' },
  neutral: { bg: 'var(--color-secondary)', color: 'var(--color-text-muted)' },
};

export default function StatusBadge({ label, variant = 'neutral' }: StatusBadgeProps) {
  const style = variantStyles[variant];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: style.bg, color: style.color }}
    >
      {label}
    </span>
  );
}

