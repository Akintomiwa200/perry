'use client';

import { Search, Users, Mail, Phone } from 'lucide-react';

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  joined: string;
}

const CUSTOMERS: CustomerRow[] = [
  { id: 'CUS-001', name: 'Amara Okafor', email: 'amara.okafor@email.com', phone: '+234 801 234 5678', orders: 8, spent: 425000, joined: 'Jan 2024' },
  { id: 'CUS-002', name: 'Chioma Nwosu', email: 'chioma.n@email.com', phone: '+234 802 345 6789', orders: 5, spent: 210000, joined: 'Feb 2024' },
  { id: 'CUS-003', name: 'Bolanle Ade', email: 'bolanle.ade@email.com', phone: '+234 803 456 7890', orders: 12, spent: 890000, joined: 'Nov 2023' },
  { id: 'CUS-004', name: 'Ngozi Eze', email: 'ngozi.eze@email.com', phone: '+234 804 567 8901', orders: 3, spent: 95000, joined: 'Mar 2024' },
  { id: 'CUS-005', name: 'Funmi Bakare', email: 'funmi.b@email.com', phone: '+234 805 678 9012', orders: 6, spent: 340000, joined: 'Dec 2023' },
  { id: 'CUS-006', name: 'Adeola Martins', email: 'adeola.m@email.com', phone: '+234 806 789 0123', orders: 2, spent: 67000, joined: 'Mar 2024' },
];

export default function AdminCustomersTable() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Customers
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Manage your customer base and view purchase history
          </p>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-xl self-start sm:self-auto"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
          <Users size={18} style={{ color: 'var(--terracotta)' }} />
          <div>
            <p className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Total
            </p>
            <p className="text-lg font-bold" style={{ color: 'var(--deep)', fontFamily: 'var(--font-primary)' }}>
              892
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search customers..."
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <select
          className="h-10 px-3 text-sm rounded-lg outline-none"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          <option>All Time</option>
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl"
        style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: 'var(--color-surface)' }}>
              <th
                key="name"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)', width: undefined }}
              >
                Customer
              </th>
              <th
                key="email"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)', width: undefined }}
              >
                Contact
              </th>
              <th
                key="orders"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)', width: undefined }}
              >
                Orders
              </th>
              <th
                key="spent"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)', width: undefined }}
              >
                Total Spent
              </th>
              <th
                key="joined"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)', width: undefined }}
              >
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((row, idx) => (
              <tr
                key={row.id}
                className="transition-colors"
                style={{
                  background: 'var(--color-surface-raised)',
                  borderBottom:
                    idx < CUSTOMERS.length - 1 ? '1px solid var(--color-border)' : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface-raised)';
                }}
              >
                <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                      style={{ background: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                    >
                      {row.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {row.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {row.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <Mail size={12} style={{ color: 'var(--color-text-muted)' }} />
                      <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                        {row.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone size={12} style={{ color: 'var(--color-text-muted)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {row.phone}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {row.orders}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    ₦{row.spent.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
                  {row.joined}
                </td>
              </tr>
            ))}
            {CUSTOMERS.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  No data available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}