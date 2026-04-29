'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const DATA = [
  { name: 'Jan', sessions: 26000, conversions: 12000 },
  { name: 'Feb', sessions: 12000, conversions: 8500 },
  { name: 'Mar', sessions: 8100, conversions: 6200 },
  { name: 'Apr', sessions: 6200, conversions: 3000 },
  { name: 'May', sessions: 3000, conversions: 1800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function ConversionRate() {
  return (
    <div className="card conversion-rate">
      <p className="card__label">Conversion Rate</p>

      <div className="conversion-rate__legend">
        <span className="legend-dot" style={{ background: '#F97316' }} />
        <span className="legend-text">Sessions</span>
        <span className="legend-dot" style={{ background: '#FED7AA' }} />
        <span className="legend-text">Conversions</span>
      </div>

      <div style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} barGap={3} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94A3B8' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sessions" fill="#F97316" radius={[3, 3, 0, 0]} maxBarSize={18} name="Sessions" />
            <Bar dataKey="conversions" fill="#FED7AA" radius={[3, 3, 0, 0]} maxBarSize={18} name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}