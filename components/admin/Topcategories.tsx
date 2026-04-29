'use client';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const CATEGORIES = [
  { name: 'Electronics', value: 3000000, color: '#F97316' },
  { name: 'Fashion', value: 900000, color: '#FED7AA' },
  { name: 'Grocery', value: 700000, color: '#FB923C' },
  { name: 'Beauty & Personal Care', value: 500000, color: '#FDBA74' },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function TopCategories() {
  return (
    <div className="card top-categories">
      <p className="card__label">Top Categories</p>

      <div className="top-categories__donut-wrap">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={CATEGORIES}
              innerRadius={44}
              outerRadius={64}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {CATEGORIES.map((c, i) => (
                <Cell key={i} fill={c.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="top-categories__center">
          <p className="top-categories__center-label">Total</p>
          <p className="top-categories__center-value">$3,400,000</p>
        </div>
      </div>

      <div className="top-categories__list">
        {CATEGORIES.map((c) => (
          <div key={c.name} className="top-categories__row">
            <div className="top-categories__dot" style={{ background: c.color }} />
            <span className="top-categories__name">{c.name}</span>
            <span className="top-categories__val">{fmt(c.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}