'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Coffee,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300"
      style={{
        width: collapsed ? '80px' : '280px',
        background: 'var(--deep)',
        borderRight: '1px solid rgba(232, 196, 176, 0.15)',
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-6 h-16 shrink-0"
        style={{ borderBottom: '1px solid rgba(232, 196, 176, 0.15)' }}
      >
        <Coffee size={22} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        {!collapsed && (
          <span
            className="font-bold text-lg whitespace-nowrap overflow-hidden"
            style={{ color: 'var(--cream)', fontFamily: 'var(--font-primary)' }}
          >
            Perry Admin
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isActive ? 'var(--cream)' : 'var(--blush)',
                background: isActive ? 'var(--terracotta)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(232, 196, 176, 0.1)';
                  e.currentTarget.style.color = 'var(--cream)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--blush)';
                }
              }}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        className="px-3 py-3 shrink-0"
        style={{ borderTop: '1px solid rgba(232, 196, 176, 0.15)' }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
          style={{ color: 'var(--blush)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(232, 196, 176, 0.1)';
            e.currentTarget.style.color = 'var(--cream)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--blush)';
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <>
            <ChevronLeft size={16} />
            <span>Collapse</span>
          </>}
        </button>
      </div>
    </aside>
  );
}

