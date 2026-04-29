'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* HEADER — Logo + collapse button */}
      <div
        className={clsx(
          'flex items-center h-16 px-4 border-b flex-shrink-0',
          collapsed ? 'justify-center' : 'justify-between'
        )}
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {!collapsed && (
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: 'var(--cream)' }}
          >
            Perry
          </span>
        )}

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:opacity-80"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--blush)' }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>

        {/* Close — mobile only */}
        <button
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ color: 'var(--blush)' }}
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== '/admin' && pathname.startsWith(`${href}/`));

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                'flex items-center gap-3 rounded-xl transition-all duration-150',
                collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'
              )}
              style={{
                background: isActive ? 'var(--terracotta)' : 'transparent',
                color: isActive ? 'var(--cream)' : 'var(--blush)',
              }}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER — Admin profile + logout */}
      <div
        className="flex-shrink-0 border-t p-3 space-y-1"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* Admin profile row */}
        <div
          className={clsx(
            'flex items-center gap-3 rounded-xl px-3 py-2.5',
            collapsed && 'justify-center px-0'
          )}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold"
            style={{ background: 'var(--terracotta)', color: 'var(--cream)' }}
          >
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--cream)' }}>
                Admin User
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--blush)', opacity: 0.7 }}>
                admin@perry.com
              </p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          className={clsx(
            'w-full flex items-center gap-3 rounded-xl transition-colors duration-150 hover:opacity-80',
            collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'
          )}
          style={{ color: 'var(--blush)' }}
          title={collapsed ? 'Log out' : undefined}
          onClick={() => {
            // your logout logic here
            console.log('Logging out...');
          }}
        >
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={clsx(
          // Mobile: fixed, slides in/out
          'fixed top-0 left-0 h-screen z-50 transition-all duration-300',
          // Desktop: static, no translate
          'lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{
          width: collapsed ? '72px' : '240px',
          background: 'var(--deep)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* MOBILE HAMBURGER TRIGGER */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 flex items-center justify-center w-9 h-9 rounded-lg shadow-md"
        style={{ background: 'var(--deep)', color: 'var(--cream)' }}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>
    </>
  );
}