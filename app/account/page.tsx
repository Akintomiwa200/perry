import Link from 'next/link';
import { Package, MapPin, Heart, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'My Account' };

const QUICK_LINKS = [
  { href: '/orders', label: 'My Orders', description: 'Track and manage your orders', icon: Package, count: '3 orders' },
  { href: '/addresses', label: 'Addresses', description: 'Manage your saved addresses', icon: MapPin, count: '2 saved' },
  { href: '/wishlist', label: 'Wishlist', description: 'Items you\'ve saved for later', icon: Heart, count: '5 items' },
];

export default function AccountPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Welcome back!</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Manage your orders, profile, and preferences.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {QUICK_LINKS.map(({ href, label, description, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className="card flex flex-col gap-3 group"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-secondary)' }}
              >
                <Icon size={18} style={{ color: 'var(--color-primary)' }} />
              </div>
              <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
            </div>
            <span className="badge badge-secondary self-start">{count}</span>
          </Link>
        ))}
      </div>

      {/* Recent order placeholder */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Recent Orders</h2>
          <Link href="/orders" className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>View all →</Link>
        </div>
        <div
          className="p-5 rounded-xl flex items-center justify-between"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-secondary)' }}>
              <Package size={16} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>ORD-001</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Mar 15, 2024 · 2 items</p>
            </div>
          </div>
          <span className="badge" style={{ background: '#DCFCE7', color: '#16A34A' }}>Delivered</span>
        </div>
      </div>
    </div>
  );
}
