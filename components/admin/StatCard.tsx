import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'warning' | 'neutral';
  icon: LucideIcon;
  accentColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  accentColor = 'var(--terracotta)',
}: StatCardProps) {
  return (
    <div
      className="card flex items-start justify-between"
      style={{ background: 'var(--color-surface-raised)', padding: '20px' }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          {title}
        </p>
        <p
          className="text-2xl font-bold"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
        >
          {value}
        </p>
        {change && (
          <div className="flex items-center gap-1">
            {changeType === 'positive' && <TrendingUp size={12} style={{ color: 'var(--color-success)' }} />}
            {changeType === 'negative' && <TrendingDown size={12} style={{ color: 'var(--color-danger)' }} />}
            {changeType === 'warning' && <TrendingDown size={12} style={{ color: 'var(--color-warning)' }} />}
            <span
              className="text-xs font-medium"
              style={{
                color:
                  changeType === 'positive'
                    ? 'var(--color-success)'
                    : changeType === 'negative'
                    ? 'var(--color-danger)'
                    : changeType === 'warning'
                    ? 'var(--color-warning)'
                    : 'var(--color-text-muted)',
              }}
            >
              {change}
            </span>
          </div>
        )}
      </div>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accentColor}15` }}
      >
        <Icon size={18} style={{ color: accentColor }} />
      </div>
    </div>
  );
}

