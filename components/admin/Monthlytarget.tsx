'use client';

const PERCENT = 85;
const R = 52;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function MonthlyTarget() {
  const progress = (PERCENT / 100) * CIRCUMFERENCE;

  return (
    <div className="card monthly-target">
      <p className="card__label">Monthly Target</p>

      {/* Radial */}
      <div className="monthly-target__radial-wrap">
        <svg width={130} height={130} viewBox="0 0 130 130">
          <circle
            cx={65}
            cy={65}
            r={R}
            fill="none"
            stroke="#FEE8D6"
            strokeWidth={10}
          />
          <circle
            cx={65}
            cy={65}
            r={R}
            fill="none"
            stroke="#F97316"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${CIRCUMFERENCE}`}
            strokeDashoffset={CIRCUMFERENCE * 0.25}
            transform="rotate(-90 65 65)"
          />
        </svg>
        <div className="monthly-target__center">
          <span className="monthly-target__pct">{PERCENT}%</span>
          <span className="monthly-target__sub">of target</span>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="goal-progress">
        <p className="card__label" style={{ marginBottom: 8 }}>Goal Progress</p>
        {[
          { label: 'Sales Target', value: 78, color: '#F97316' },
          { label: 'User Target', value: 62, color: '#FB923C' },
          { label: 'Revenue Goal', value: 91, color: '#FED7AA' },
        ].map((g) => (
          <div key={g.label} className="goal-progress__row">
            <div className="goal-progress__meta">
              <span className="goal-progress__name">{g.label}</span>
              <span className="goal-progress__pct">{g.value}%</span>
            </div>
            <div className="goal-progress__track">
              <div
                className="goal-progress__fill"
                style={{ width: `${g.value}%`, background: g.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mini KPIs */}
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
  );
}