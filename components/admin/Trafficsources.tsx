'use client';

const SOURCES = [
  { label: 'Direct Traffic', value: 32540, pct: 68, color: '#F97316' },
  { label: 'Organic Search', value: 18200, pct: 48, color: '#FB923C' },
  { label: 'Social Media', value: 9400, pct: 30, color: '#FED7AA' },
  { label: 'Email Campaigns', value: 6100, pct: 22, color: '#FDBA74' },
  { label: 'Referral Traffic', value: 3800, pct: 14, color: '#FEF3C7' },
];

export default function TrafficSources() {
  return (
    <div className="card traffic-sources">
      <p className="card__label">Traffic Sources</p>

      <div className="traffic-sources__list">
        {SOURCES.map((s) => (
          <div key={s.label} className="traffic-sources__row">
            <div className="traffic-sources__meta">
              <span className="traffic-sources__label">{s.label}</span>
              <span className="traffic-sources__val">{s.value.toLocaleString()}</span>
            </div>
            <div className="traffic-sources__track">
              <div
                className="traffic-sources__fill"
                style={{ width: `${s.pct}%`, background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}