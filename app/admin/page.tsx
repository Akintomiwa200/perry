import { Metadata } from 'next';
import StatCard from '@/components/admin/StatCard';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import RecentOrderRow from '@/components/admin/RecentOrderRow';

export const metadata: Metadata = { title: 'Admin Dashboard — Perry Collectibles' };

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Amara Okafor', date: 'Mar 15, 2024', total: 124.5, status: 'delivered' },
  { id: 'ORD-002', customer: 'Chioma Nwosu', date: 'Mar 14, 2024', total: 89.0, status: 'shipped' },
  { id: 'ORD-003', customer: 'Bolanle Ade', date: 'Mar 14, 2024', total: 245.0, status: 'processing' },
  { id: 'ORD-004', customer: 'Ngozi Eze', date: 'Mar 13, 2024', total: 56.99, status: 'pending' },
  { id: 'ORD-005', customer: 'Funmi Bakare', date: 'Mar 12, 2024', total: 178.25, status: 'delivered' },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
        >
          Welcome back, Admin
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="₦1,245,000"
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          accentColor="var(--gold)"
        />
        <StatCard
          title="Total Orders"
          value="1,284"
          change="+8.2%"
          changeType="positive"
          icon={ShoppingBag}
          accentColor="var(--terracotta)"
        />
        <StatCard
          title="Customers"
          value="892"
          change="+24 new"
          changeType="positive"
          icon={Users}
          accentColor="var(--rose)"
        />
        <StatCard
          title="Products"
          value="156"
          change="3 low stock"
          changeType="warning"
          icon={Package}
          accentColor="var(--mid)"
        />
      </div>

      {/* Recent Orders */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
            style={{ color: 'var(--terracotta)' }}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div
          className="overflow-x-auto rounded-xl"
          style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: 'var(--color-surface)' }}>
                {['Order ID', 'Customer', 'Date', 'Total', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order, idx) => (
                <RecentOrderRow
                  key={order.id}
                  order={order}
                  idx={idx}
                  total={RECENT_ORDERS.length}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Add New Product',
            desc: 'List a new item in your store catalog',
            href: '/admin/products',
            color: 'var(--terracotta)',
          },
          {
            title: 'Manage Orders',
            desc: 'Review and fulfill pending orders',
            href: '/admin/orders',
            color: 'var(--gold)',
          },
          {
            title: 'Store Settings',
            desc: 'Customize branding and preferences',
            href: '/admin/settings',
            color: 'var(--rose)',
          },
        ].map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="card flex flex-col gap-2 group"
            style={{ background: 'var(--color-surface-raised)', padding: '20px' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--deep)' }}>
                {action.title}
              </h3>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
                style={{ color: action.color }}
              />
            </div>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {action.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

