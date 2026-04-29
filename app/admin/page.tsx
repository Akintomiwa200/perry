'use client';

import { useEffect, useState } from 'react';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/* ─── MOCK DATA ─── */
const fetchDashboardData = () =>
  new Promise<any>((resolve) =>
    setTimeout(
      () =>
        resolve({
          revenue: [
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
          ],
          categories: [
            { name: 'Electronics', value: 3000000, color: '#F97316' },
            { name: 'Fashion', value: 900000, color: '#FED7AA' },
            { name: 'Grocery', value: 700000, color: '#FB923C' },
            { name: 'Beauty', value: 500000, color: '#FDBA74' },
          ],
          conversion: [
            { name: 'Jan', sessions: 26000, conversions: 12000 },
            { name: 'Feb', sessions: 12000, conversions: 8500 },
            { name: 'Mar', sessions: 8100, conversions: 6200 },
            { name: 'Apr', sessions: 6200, conversions: 3000 },
            { name: 'May', sessions: 3000, conversions: 1800 },
          ],
          traffic: [
            { label: 'Direct Traffic', value: 32540, pct: 68, color: '#F97316' },
            { label: 'Organic Search', value: 18200, pct: 48, color: '#FB923C' },
            { label: 'Social Media', value: 9400, pct: 30, color: '#FED7AA' },
            { label: 'Email Campaigns', value: 6100, pct: 22, color: '#FDBA74' },
            { label: 'Referral', value: 3800, pct: 14, color: '#FEF3C7' },
          ],
          users: [
            { name: 'Amara Okafor', role: 'Customer', active: true },
            { name: 'Chioma Nwosu', role: 'Customer', active: true },
            { name: 'Bolanle Ade', role: 'Vendor', active: false },
            { name: 'Kelechi Eze', role: 'Admin', active: true },
          ],
        }),
      1200
    )
  );

/* ─── TOOLTIPS ─── */
const RevenueTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      <p style={{ color: '#F97316' }}>This year: ${payload[0]?.value?.toLocaleString()}</p>
      <p style={{ color: '#FDBA74' }}>Last year: ${payload[1]?.value?.toLocaleString()}</p>
    </div>
  );
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.fill }}>
          {p.name}: {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const tooltipStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #f1f5f9',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

/* ─── SKELETON ─── */
const Skeleton = ({ h = 160 }: { h?: number }) => (
  <div
    style={{
      height: h,
      borderRadius: 10,
      background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
    }}
  />
);

/* ─── STAT CARD ─── */
function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: any;
  color: string;
}) {
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            {title}
          </p>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', fontFamily: "'DM Sans', sans-serif" }}>
            {value}
          </p>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={18} color={color} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
        {positive !== undefined && (positive
          ? <TrendingUp size={12} color="#22C55E" />
          : <TrendingDown size={12} color="#EF4444" />)}
        <span style={{ fontSize: 12, fontWeight: 600, color: positive === undefined ? '#F59E0B' : positive ? '#22C55E' : '#EF4444' }}>
          {change}
        </span>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 14,
  padding: '18px 20px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  border: '1px solid #f1f5f9',
};

/* ─── MAIN COMPONENT ─── */
export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData().then(setData);
  }, []);

  const loading = !data;

  const RADIAL_R = 52;
  const CIRC = 2 * Math.PI * RADIAL_R;
  const PERCENT = 85;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;600;700&display=swap');

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
.db-root {
  width: 100%;
}
        /* GRID LAYOUTS */
        .db-kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .db-mid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .db-bot { display: grid; grid-template-columns: 1fr 1.6fr 1.2fr; gap: 14px; }

        @media (max-width: 1024px) {
          .db-kpi { grid-template-columns: repeat(2, 1fr); }
          .db-mid { grid-template-columns: 1fr 1fr; }
          .db-bot { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .db-root { padding: 14px; }
          .db-kpi { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .db-mid { grid-template-columns: 1fr; }
          .db-bot { grid-template-columns: 1fr; }
        }

        /* SHARED CARD */
        .card {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          border: 1px solid #f1f5f9;
        }
        .card__label {
          font-size: 12px;
          font-weight: 600;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 12px;
        }

        /* LEGEND */
        .legend-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #64748B; }
        .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        /* TOP CATEGORIES */
        .top-categories__donut { position: relative; height: 150px; display: flex; align-items: center; justify-content: center; }
        .top-categories__center {
          position: absolute;
          text-align: center;
          pointer-events: none;
        }
        .top-categories__center-label { font-size: 11px; color: #94A3B8; }
        .top-categories__center-value { font-size: 14px; font-weight: 700; color: #1E293B; }
        .top-categories__list { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
        .top-categories__row { display: flex; align-items: center; gap: 8px; font-size: 12px; }
        .top-categories__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .top-categories__name { flex: 1; color: #475569; }
        .top-categories__val { font-weight: 600; color: #1E293B; }

        /* MONTHLY TARGET */
        .monthly-target__radial { display: flex; justify-content: center; margin: 8px 0 16px; }
        .monthly-target__center { text-align: center; }
        .monthly-target__pct { font-size: 24px; font-weight: 700; color: #1E293B; display: block; }
        .monthly-target__sub { font-size: 11px; color: #94A3B8; }
        .monthly-target__kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px; }
        .monthly-target__kpi { background: #FFF7ED; border-radius: 10px; padding: 10px 12px; }
        .monthly-target__kpi-val { font-size: 15px; font-weight: 700; color: #F97316; display: block; }
        .monthly-target__kpi-label { font-size: 10px; color: #94A3B8; margin-top: 2px; display: block; }

        /* GOAL PROGRESS */
        .goal-row { margin-bottom: 10px; }
        .goal-meta { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 11px; }
        .goal-name { color: #475569; }
        .goal-pct { font-weight: 600; color: #1E293B; }
        .goal-track { height: 5px; background: #F1F5F9; border-radius: 99px; overflow: hidden; }
        .goal-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }

        /* ACTIVE USERS */
        .active-users__count { font-size: 28px; font-weight: 700; color: #1E293B; margin-bottom: 14px; font-family: 'Sora', sans-serif; }
        .active-users__list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .active-users__row { display: flex; align-items: center; gap: 10px; }
        .active-users__avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #F97316, #FDBA74);
          color: #fff; font-weight: 700; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .active-users__info { flex: 1; min-width: 0; }
        .active-users__name { font-size: 12px; font-weight: 600; color: #1E293B; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .active-users__role { font-size: 10px; color: #94A3B8; }
        .active-users__status { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        /* MINI BAR CHART */
        .mini-bars { display: flex; align-items: flex-end; gap: 4px; height: 60px; margin-top: 8px; }
        .mini-bar-col { display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 1; height: 100%; justify-content: flex-end; }
        .mini-bar { width: 100%; border-radius: 3px 3px 0 0; min-height: 4px; }
        .mini-bar-lbl { font-size: 9px; color: #94A3B8; }

        /* TRAFFIC SOURCES */
        .traffic__list { display: flex; flex-direction: column; gap: 12px; }
        .traffic__row {}
        .traffic__meta { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .traffic__label { font-size: 12px; color: #475569; }
        .traffic__val { font-size: 12px; font-weight: 600; color: #1E293B; }
        .traffic__track { height: 5px; background: #F1F5F9; border-radius: 99px; overflow: hidden; }
        .traffic__fill { height: 100%; border-radius: 99px; }
      `}</style>

      <div className="flex flex-col gap-4">

        {/* HEADER */}
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Sora', sans-serif", color: '#1E293B' }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>
            Welcome back — here's what's happening today.
          </p>
        </div>

        {/* ── ROW 1: KPI STAT CARDS ── */}
        <div className="db-kpi" style={{ marginBottom: 14 }}>
          <StatCard title="Total Sales" value="$983,410" change="+12.5% vs last month" positive icon={DollarSign} color="#F97316" />
          <StatCard title="Total Orders" value="58,375" change="+8.2% vs last month" positive icon={ShoppingBag} color="#FB923C" />
          <StatCard title="Total Visitors" value="237,782" change="+24.0% vs last month" positive icon={Users} color="#F97316" />
          <div style={cardStyle}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Top Categories
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', fontFamily: "'Sora', sans-serif" }}>$3,400,000</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
              {['Electronics', 'Fashion', 'Grocery'].map((c, i) => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: ['#F97316','#FED7AA','#FB923C'][i], display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: '#64748B' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 2: REVENUE + MONTHLY TARGET ── */}
        <div className="db-mid" style={{ marginBottom: 14 }}>

          {/* Revenue Analytics */}
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
              <p className="card__label" style={{ marginBottom: 0 }}>Revenue Analytics</p>
              <div className="legend-row">
                <div className="legend-item"><span className="legend-dot" style={{ background: '#F97316' }} />This Year</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#FED7AA' }} />Last Year</div>
              </div>
            </div>
            {loading ? <Skeleton h={170} /> : (
              <div style={{ height: 170 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.revenue} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FED7AA" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#FED7AA" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip content={<RevenueTooltip />} />
                    <Area type="monotone" dataKey="thisYear" stroke="#F97316" strokeWidth={2.5} fill="url(#gA)" dot={false} />
                    <Area type="monotone" dataKey="lastYear" stroke="#FED7AA" strokeWidth={2} fill="url(#gB)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Monthly Target */}
          <div className="card">
            <p className="card__label">Monthly Target</p>
            <div className="monthly-target__radial">
              <div style={{ position: 'relative', width: 130, height: 130 }}>
                <svg width={130} height={130} viewBox="0 0 130 130">
                  <circle cx={65} cy={65} r={RADIAL_R} fill="none" stroke="#FEE8D6" strokeWidth={10} />
                  <circle
                    cx={65} cy={65} r={RADIAL_R} fill="none"
                    stroke="#F97316" strokeWidth={10} strokeLinecap="round"
                    strokeDasharray={`${(PERCENT / 100) * CIRC} ${CIRC}`}
                    transform="rotate(-90 65 65)"
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="monthly-target__pct">{PERCENT}%</span>
                  <span className="monthly-target__sub">of target</span>
                </div>
              </div>
            </div>

            {/* Goal Progress bars */}
            {[
              { label: 'Sales Target', value: 78, color: '#F97316' },
              { label: 'User Target', value: 62, color: '#FB923C' },
              { label: 'Revenue Goal', value: 91, color: '#FED7AA' },
            ].map((g) => (
              <div key={g.label} className="goal-row">
                <div className="goal-meta">
                  <span className="goal-name">{g.label}</span>
                  <span className="goal-pct">{g.value}%</span>
                </div>
                <div className="goal-track">
                  <div className="goal-fill" style={{ width: `${g.value}%`, background: g.color }} />
                </div>
              </div>
            ))}

            <div className="monthly-target__kpis">
              <div className="monthly-target__kpi">
                <span className="monthly-target__kpi-val">$48K</span>
                <span className="monthly-target__kpi-label">Goal Revenue</span>
              </div>
              <div className="monthly-target__kpi">
                <span className="monthly-target__kpi-val">$41K</span>
                <span className="monthly-target__kpi-label">This Month</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: ACTIVE USERS + CONVERSION + TRAFFIC ── */}
        <div className="db-bot">

          {/* Active Users */}
          <div className="card">
            <p className="card__label">Active User</p>
            <p className="active-users__count">2,758</p>

            {loading ? <Skeleton h={100} /> : (
              <div className="active-users__list">
                {data.users.map((u: any) => (
                  <div key={u.name} className="active-users__row">
                    <div className="active-users__avatar">{u.name.charAt(0)}</div>
                    <div className="active-users__info">
                      <span className="active-users__name">{u.name}</span>
                      <span className="active-users__role">{u.role}</span>
                    </div>
                    <span className="active-users__status" style={{ background: u.active ? '#22C55E' : '#94A3B8' }} />
                  </div>
                ))}
              </div>
            )}

            <div className="mini-bars">
              {[{ l: 'M', h: 60 },{ l: 'T', h: 80 },{ l: 'W', h: 45 },{ l: 'T', h: 90 },{ l: 'F', h: 70 },{ l: 'S', h: 55 },{ l: 'S', h: 40 }].map((d, i) => (
                <div key={i} className="mini-bar-col">
                  <div className="mini-bar" style={{ height: `${d.h}%`, background: '#F97316', opacity: 0.7 + i * 0.04 }} />
                  <span className="mini-bar-lbl">{d.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 6 }}>
              <p className="card__label" style={{ marginBottom: 0 }}>Conversion Rate</p>
              <div className="legend-row">
                <div className="legend-item"><span className="legend-dot" style={{ background: '#F97316' }} />Sessions</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#FED7AA' }} />Conversions</div>
              </div>
            </div>

            {loading ? <Skeleton h={155} /> : (
              <div style={{ height: 155 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.conversion} barGap={3} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip content={<BarTooltip />} />
                    <Bar dataKey="sessions" fill="#F97316" radius={[4, 4, 0, 0]} maxBarSize={16} name="Sessions" />
                    <Bar dataKey="conversions" fill="#FED7AA" radius={[4, 4, 0, 0]} maxBarSize={16} name="Conversions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Traffic Sources */}
          <div className="card">
            <p className="card__label">Traffic Sources</p>
            {loading ? <Skeleton h={160} /> : (
              <div className="traffic__list">
                {data.traffic.map((s: any) => (
                  <div key={s.label} className="traffic__row">
                    <div className="traffic__meta">
                      <span className="traffic__label">{s.label}</span>
                      <span className="traffic__val">{s.value.toLocaleString()}</span>
                    </div>
                    <div className="traffic__track">
                      <div className="traffic__fill" style={{ width: `${s.pct}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}