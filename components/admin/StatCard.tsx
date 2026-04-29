import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'warning' | 'neutral';
  icon: LucideIcon;
  accentColor?: string;
  iconBg?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  accentColor = '#F97316',
  iconBg,
}: StatCardProps) {
  const changeColor =
    changeType === 'positive'
      ? '#22C55E'
      : changeType === 'negative'
      ? '#EF4444'
      : changeType === 'warning'
      ? '#F59E0B'
      : '#94A3B8';

  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ background: iconBg || `${accentColor}18` }}>
        <Icon size={20} color={accentColor} />
      </div>
      <p className="stat-card__title">{title}</p>
      <p className="stat-card__value">{value}</p>
      {change && (
        <div className="stat-card__change">
          {changeType === 'positive' && <TrendingUp size={12} color={changeColor} />}
          {changeType === 'negative' && <TrendingDown size={12} color={changeColor} />}
          <span style={{ color: changeColor }}>{change}</span>
        </div>
      )}
    </div>
  );
}