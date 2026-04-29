'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  Tags,
  Layers,
  ShoppingBag,
  RotateCcw,
  Truck,
  Users,
  UserCog,
  ShieldCheck,
  BarChart2,
  TrendingUp,
  PieChart,
  Star,
  MessageSquare,
  Megaphone,
  Gift,
  Percent,
  Mail,
  Wallet,
  CreditCard,
  Banknote,
  Store,
  Globe,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Menu,
  LogOut,
  Boxes,
  AlertTriangle,
  Ticket,
  Map,
  Headphones,
  FileText,
  Activity,
  Layers2,
  Webhook,
  KeyRound,
  FlaskConical,
  RefreshCcw,
  BadgePercent,
  Newspaper,
  UserCheck,
  LifeBuoy,
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

// ─── Types ───────────────────────────────────────────────────────────────────

type NavChild = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
};

type NavItem =
  | { type: 'link'; href: string; label: string; icon: React.ElementType; badge?: string | number }
  | { type: 'group'; label: string; icon: React.ElementType; children: NavChild[] }
  | { type: 'section'; title: string };

// ─── Nav Config ──────────────────────────────────────────────────────────────

const NAV: NavItem[] = [
  // Overview
  { type: 'link', href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  
  // Catalog
  { type: 'section', title: 'Catalog' },
  {
    type: 'group',
    label: 'Products',
    icon: Package,
    children: [
      { href: '/admin/products', label: 'All Products', icon: Package },
      { href: '/admin/products/new', label: 'Add Product', icon: PackagePlus },
      { href: '/admin/products/categories', label: 'Categories', icon: Layers },
      { href: '/admin/products/tags', label: 'Tags', icon: Tags },
      { href: '/admin/products/collections', label: 'Collections', icon: Layers2 },
      { href: '/admin/products/reviews', label: 'Product Reviews', icon: Star },
    ],
  },
  {
    type: 'group',
    label: 'Inventory',
    icon: Boxes,
    children: [
      { href: '/admin/inventory', label: 'Stock Overview', icon: Boxes },
      { href: '/admin/inventory/low-stock', label: 'Low Stock', icon: AlertTriangle, badge: '12' },
      { href: '/admin/inventory/adjustments', label: 'Adjustments', icon: RefreshCcw },
      { href: '/admin/inventory/warehouses', label: 'Warehouses', icon: Map },
    ],
  },

  // Sales
  { type: 'section', title: 'Sales' },
  {
    type: 'group',
    label: 'Orders',
    icon: ShoppingBag,
    children: [
      { href: '/admin/orders', label: 'All Orders', icon: ShoppingBag, badge: '5' },
      { href: '/admin/orders/pending', label: 'Pending', icon: ShoppingBag },
      { href: '/admin/orders/returns', label: 'Returns & Refunds', icon: RotateCcw },
      { href: '/admin/orders/fulfillment', label: 'Fulfillment', icon: Truck },
      { href: '/admin/orders/shipments', label: 'Shipments', icon: Truck },
    ],
  },
  {
    type: 'group',
    label: 'Promotions',
    icon: BadgePercent,
    children: [
      { href: '/admin/promotions/coupons', label: 'Coupons', icon: Ticket },
      { href: '/admin/promotions/discounts', label: 'Discounts', icon: Percent },
      { href: '/admin/promotions/gift-cards', label: 'Gift Cards', icon: Gift },
      { href: '/admin/promotions/campaigns', label: 'Campaigns', icon: Megaphone },
      { href: '/admin/promotions/flash-sales', label: 'Flash Sales', icon: FlaskConical },
    ],
  },

  // Customers
  { type: 'section', title: 'Customers' },
  {
    type: 'group',
    label: 'Customers',
    icon: Users,
    children: [
      { href: '/admin/customers', label: 'All Customers', icon: Users },
      { href: '/admin/customers/segments', label: 'Segments', icon: UserCog },
      { href: '/admin/customers/loyalty', label: 'Loyalty Program', icon: UserCheck },
      { href: '/admin/customers/wishlist', label: 'Wishlists', icon: Star },
    ],
  },
  {
    type: 'group',
    label: 'Support',
    icon: Headphones,
    children: [
      { href: '/admin/support/tickets', label: 'Tickets', icon: LifeBuoy, badge: '3' },
      { href: '/admin/support/messages', label: 'Messages', icon: MessageSquare },
      { href: '/admin/support/reviews', label: 'Reviews', icon: Star },
      { href: '/admin/support/faqs', label: 'FAQs', icon: FileText },
    ],
  },

  // Analytics
  { type: 'section', title: 'Analytics' },
  {
    type: 'group',
    label: 'Reports',
    icon: BarChart2,
    children: [
      { href: '/admin/analytics/overview', label: 'Overview', icon: BarChart2 },
      { href: '/admin/analytics/sales', label: 'Sales Report', icon: TrendingUp },
      { href: '/admin/analytics/products', label: 'Product Report', icon: PieChart },
      { href: '/admin/analytics/customers', label: 'Customer Report', icon: Users },
      { href: '/admin/analytics/traffic', label: 'Traffic & SEO', icon: Globe },
      { href: '/admin/analytics/conversions', label: 'Conversions', icon: Activity },
    ],
  },

  // Finance
  { type: 'section', title: 'Finance' },
  {
    type: 'group',
    label: 'Finance',
    icon: Banknote,
    children: [
      { href: '/admin/finance/transactions', label: 'Transactions', icon: Banknote },
      { href: '/admin/finance/payouts', label: 'Payouts', icon: Wallet },
      { href: '/admin/finance/payment-methods', label: 'Payment Methods', icon: CreditCard },
      { href: '/admin/finance/invoices', label: 'Invoices', icon: FileText },
      { href: '/admin/finance/taxes', label: 'Taxes', icon: Percent },
    ],
  },

  ];

// ─── Badge chip ───────────────────────────────────────────────────────────────

function Badge({ value }: { value: string | number }) {
  return (
    <span
      className="ml-auto text-[10px] font-bold leading-none px-1.5 py-0.5 rounded-full flex-shrink-0"
      style={{ background: 'var(--terracotta)', color: 'var(--cream)' }}
    >
      {value}
    </span>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV.forEach((item) => {
      if (item.type === 'group') {
        const active = item.children.some(
          (c) => pathname === c.href || pathname.startsWith(c.href + '/')
        );
        if (active) initial[item.label] = true;
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const isLinkActive = (href: string) =>
    pathname === href || (href !== '/admin' && pathname.startsWith(href + '/'));

  const isGroupActive = (children: NavChild[]) =>
    children.some((c) => isLinkActive(c.href));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* ── HEADER ── */}
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

        {/* Collapse toggle — desktop */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:opacity-80 transition-opacity"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--blush)' }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>

        {/* Close — mobile */}
        <button
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ color: 'var(--blush)' }}
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      {/* ── NAV ── */}
      <nav className="flex-1 overflow-hidden px-3 py-3 space-y-0.5">
        {NAV.map((item, idx) => {

          // Section divider / label
          if (item.type === 'section') {
            if (collapsed) {
              return (
                <div
                  key={idx}
                  className="my-3 mx-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                />
              );
            }
            return (
              <p
                key={idx}
                className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest select-none"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {item.title}
              </p>
            );
          }

          // Flat link
          if (item.type === 'link') {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={clsx(
                  'flex items-center gap-3 rounded-xl transition-all duration-150',
                  collapsed ? 'justify-center py-2.5 px-0' : 'px-3 py-2.5'
                )}
                style={{
                  background: active ? 'var(--terracotta)' : 'transparent',
                  color: active ? 'var(--cream)' : 'var(--blush)',
                }}
              >
                <item.icon size={17} className="flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && <Badge value={item.badge} />}
                  </>
                )}
              </Link>
            );
          }

          // Accordion group
          if (item.type === 'group') {
            const groupActive = isGroupActive(item.children);
            const isOpen = openGroups[item.label] ?? false;

            // Collapsed: icon-only, no children
            if (collapsed) {
              return (
                <button
                  key={item.label}
                  title={item.label}
                  className="w-full flex justify-center py-2.5 rounded-xl transition-all duration-150 hover:opacity-80"
                  style={{ color: groupActive ? 'var(--cream)' : 'var(--blush)' }}
                >
                  <item.icon size={17} />
                </button>
              );
            }

            // Total badge count to show on collapsed group header
            const groupBadgeTotal = item.children.reduce((sum, c) => {
              if (!c.badge) return sum;
              return sum + (typeof c.badge === 'number' ? c.badge : parseInt(String(c.badge)) || 0);
            }, 0);

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 hover:opacity-90"
                  style={{
                    color: groupActive ? 'var(--cream)' : 'var(--blush)',
                    background:
                      groupActive && !isOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
                  }}
                >
                  <item.icon size={17} className="flex-shrink-0" />
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  {!isOpen && groupBadgeTotal > 0 && <Badge value={groupBadgeTotal} />}
                  <ChevronDown
                    size={13}
                    className="flex-shrink-0"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    className="mt-0.5 mb-1 ml-5 pl-3 space-y-0.5 border-l"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    {item.children.map((child) => {
                      const active = isLinkActive(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150"
                          style={{
                            background: active ? 'var(--terracotta)' : 'transparent',
                            color: active ? 'var(--cream)' : 'var(--blush)',
                            opacity: active ? 1 : 0.85,
                          }}
                        >
                          <child.icon size={13} className="flex-shrink-0" />
                          <span className="flex-1 text-xs font-medium">{child.label}</span>
                          {child.badge && <Badge value={child.badge} />}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </nav>

      {/* ── FOOTER ── */}
      <div
        className="flex-shrink-0 border-t p-3 space-y-1"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* Admin profile */}
        <div
          className={clsx(
            'flex items-center gap-3 rounded-xl px-3 py-2.5',
            collapsed && 'justify-center px-0'
          )}
        >
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
              <p
                className="text-xs truncate"
                style={{ color: 'var(--blush)', opacity: 0.65 }}
              >
                admin@perry.com
              </p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={() => console.log('Logging out...')}
          title={collapsed ? 'Log out' : undefined}
          className={clsx(
            'w-full flex items-center gap-3 rounded-xl transition-opacity duration-150 hover:opacity-70',
            collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'
          )}
          style={{ color: 'var(--blush)' }}
        >
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen z-50 transition-all duration-300',
          'lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{
          width: collapsed ? '72px' : '252px',
          background: 'var(--deep)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
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