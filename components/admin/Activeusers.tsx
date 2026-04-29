'use client';

const USERS = [
  { name: 'Amara Okafor', role: 'Customer', active: true },
  { name: 'Chioma Nwosu', role: 'Customer', active: true },
  { name: 'Bolanle Ade', role: 'Vendor', active: false },
  { name: 'Kelechi Eze', role: 'Admin', active: true },
];

export default function ActiveUsers({ count = 2758 }: { count?: number }) {
  return (
    <div className="card active-users">
      <p className="card__label">Active User</p>
      <p className="active-users__count">{count.toLocaleString()}</p>

      <div className="active-users__list">
        {USERS.map((u) => (
          <div key={u.name} className="active-users__row">
            <div className="active-users__avatar">
              {u.name.charAt(0)}
            </div>
            <div className="active-users__info">
              <span className="active-users__name">{u.name}</span>
              <span className="active-users__role">{u.role}</span>
            </div>
            <span
              className="active-users__dot"
              style={{ background: u.active ? '#22C55E' : '#94A3B8' }}
            />
          </div>
        ))}
      </div>

      <div className="active-users__bar-wrap">
        {[
          { label: 'Mon', h: 60 },
          { label: 'Tue', h: 80 },
          { label: 'Wed', h: 45 },
          { label: 'Thu', h: 90 },
          { label: 'Fri', h: 70 },
          { label: 'Sat', h: 55 },
          { label: 'Sun', h: 40 },
        ].map((d) => (
          <div key={d.label} className="active-users__bar-col">
            <div
              className="active-users__bar"
              style={{ height: `${d.h}%`, background: '#F97316' }}
            />
            <span className="active-users__bar-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}