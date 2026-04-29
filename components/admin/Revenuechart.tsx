'use client';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DATA = [
  { month: 'Jan', thisYear: 18000, lastYear: 12000 },
  { month: 'Feb', thisYear: 22000, lastYear: 16000 },
  { month: 'Mar', thisYear: 19000, lastYear: 20000 },
  { month: 'Apr', thisYear: 28000, lastYear: 18000 },
  { month: 'May', thisYear: 32000, lastYear: 24000 },
  { month: 'Jun', thisYear: 27000, lastYear: 22000 },
  { month: 'Jul', thisYear: 35000, lastYear: 26000 },
  { month: 'Aug', thisYear: 38000, lastYear: 28000 },
  { month: 'Sep', thisYear: 30000, lastYear: 25000 },
  { month: 'Oct', thisYear: 42000, lastYear: 30000 },
  { month: 'Nov', thisYear: 39000, lastYear: 27000 },
  { month: 'Dec', thisYear: 45000, lastYear: 32000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      <p style={{ color: '#F97316' }}>This year: ${payload[0]?.value?.toLocaleString()}</p>
      <p style={{ color: '#FED7AA' }}>Last year: ${payload[1]?.value?.toLocaleString()}</p>
    </div>
  );
};

export default function RevenueChart() {
  return (
    <div className="card revenue-chart">
      <div className="revenue-chart__header">
        <div>
          <p className="card__label">Revenue Analytics</p>
        </div>
        <div className="revenue-chart__legend">
          <span className="legend-dot" style={{ background: '#F97316' }} />
          <span className="legend-text">This Year</span>
          <span className="legend-dot" style={{ background: '#FED7AA' }} />
          <span className="legend-text">Last Year</span>
        </div>
      </div>

      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FED7AA" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#FED7AA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
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
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="#F97316"
              strokeWidth={2}
              fill="url(#gradA)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="lastYear"
              stroke="#FED7AA"
              strokeWidth={2}
              fill="url(#gradB)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}