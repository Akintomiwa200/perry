'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, User } from 'lucide-react';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/settings': 'Settings',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = breadcrumbMap[pathname] || 'Admin';

  return (
    <header
      className="flex items-center justify-between h-16 px-8 sticky top-0 z-30"
      style={{
        background: 'var(--color-surface-raised)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Admin
        </span>
        <span style={{ color: 'var(--color-text-muted)' }}>/</span>
        <h1 className="text-base font-semibold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}>
          {title}
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-40"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
          />
        </div>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-secondary)';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: 'var(--color-danger)' }}
          />
        </button>

        {/* Profile */}
        <button
          className="flex items-center gap-2 pl-2 pr-3 h-9 rounded-lg transition-colors"
          style={{ border: '1px solid var(--color-border)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-primary)' }}
          >
            <User size={12} color="#fff" />
          </div>
          <span className="text-xs font-medium hidden md:block" style={{ color: 'var(--color-text)' }}>
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}

