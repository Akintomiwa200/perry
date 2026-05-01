'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, Settings, LogOut, User, ChevronDown, X, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/settings': 'Settings',
};

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const title = breadcrumbMap[pathname] || 'Dashboard';

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    let mounted = true;
    const fetchNotifications = () => {
      fetch('/api/admin/notifications')
        .then((res) => res.json())
        .then((data) => {
          if (!mounted) return;
          setNotifications(
            (data.notifications ?? []).map((n: any, idx: number) => ({
              ...n,
              id: n.id ?? idx,
              icon: idx === 0 ? '🛒' : idx === 1 ? '⚠️' : '⭐',
              read: false,
            })),
          );
        })
        .catch(() => {
          if (mounted) setNotifications([]);
        });
    };
    fetchNotifications();
    const t = setInterval(fetchNotifications, 30000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    const unread = notifications.filter((n) => !n.read);
    await Promise.all(
      unread.map((n) =>
        fetch('/api/admin/notifications', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationId: n.id, markAs: true }),
        }).catch(() => {})
      ),
    );
  };

  const markRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    await fetch('/api/admin/notifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId: id, markAs: true }),
    }).catch(() => {});
  };

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <header
      className="flex items-center justify-between h-16 px-6 lg:px-10"
      style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* TITLE */}
      <h1
        className="text-xl font-semibold tracking-tight"
        style={{ color: 'var(--deep)' }}
      >
        {title}
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-full px-4 h-9 w-52 gap-2">
          <Search size={13} className="opacity-40 shrink-0" />
          <input
            placeholder="Search..."
            className="text-sm outline-none bg-transparent w-full placeholder:opacity-50"
            style={{ color: 'var(--deep)' }}
          />
        </div>

        {/* ── NOTIFICATION BELL ── */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative p-2 rounded-full transition"
            style={{
              background: notifOpen ? 'var(--color-surface-raised)' : 'transparent',
            }}
            aria-label="Notifications"
          >
            <Bell size={17} style={{ color: 'var(--deep)' }} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-[7px] w-[7px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-red-500" />
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-2xl shadow-xl z-50 overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--deep)' }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-red-500 text-white rounded-full px-1.5 py-0.5 leading-none">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs opacity-50 hover:opacity-100 transition flex items-center gap-1"
                    style={{ color: 'var(--deep)' }}
                  >
                    <Check size={11} /> Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <ul className="divide-y divide-[var(--color-border)] max-h-72 overflow-y-auto">
                {notifications.length === 0 && (
                  <li className="py-8 text-center text-sm opacity-40" style={{ color: 'var(--deep)' }}>
                    All caught up 🎉
                  </li>
                )}
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 group transition hover:bg-[var(--color-surface-raised)] cursor-pointer"
                    style={{ opacity: n.read ? 0.6 : 1 }}
                    onClick={() => {
                      markRead(n.id);
                      if (n.href) router.push(n.href);
                    }}
                  >
                    <span className="text-lg mt-0.5 shrink-0">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: 'var(--deep)' }}>
                        {n.title}
                      </p>
                      <p className="text-xs opacity-50 mt-0.5 leading-relaxed" style={{ color: 'var(--deep)' }}>
                        {n.desc}
                      </p>
                      <p className="text-[10px] opacity-30 mt-1" style={{ color: 'var(--deep)' }}>
                        {n.time}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                      className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition p-0.5 rounded"
                    >
                      <X size={12} style={{ color: 'var(--deep)' }} />
                    </button>
                    {!n.read && (
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="px-4 py-2.5 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button className="text-xs opacity-40 hover:opacity-80 transition" style={{ color: 'var(--deep)' }} onClick={() => router.push('/admin')}>
                  Refresh notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── PROFILE ── */}
        <div className="relative pl-2 border-l border-[var(--color-border)]" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[var(--color-surface-raised)]"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {(user?.firstName?.[0] ?? 'A')}{(user?.lastName?.[0] ?? 'D')}
            </div>
            <span className="hidden md:block text-sm font-medium" style={{ color: 'var(--deep)' }}>
              {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
            </span>
            <ChevronDown
              size={13}
              className="hidden md:block opacity-40 transition-transform"
              style={{ transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {profileOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-2xl shadow-xl z-50 overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* User Info */}
              <div className="px-4 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {(user?.firstName?.[0] ?? 'A')}{(user?.lastName?.[0] ?? 'D')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--deep)' }}>
                    {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                  </p>
                  <p className="text-xs opacity-40 truncate" style={{ color: 'var(--deep)' }}>
                    {user?.email ?? ''}
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {[
                  { icon: User, label: 'My Profile', href: '/account' },
                  { icon: Settings, label: 'Settings', href: '/admin/settings' },
                ].map(({ icon: Icon, label, href }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-[var(--color-surface-raised)]"
                    style={{ color: 'var(--deep)' }}
                    onClick={() => {
                      setProfileOpen(false);
                      router.push(href);
                    }}
                  >
                    <Icon size={14} className="opacity-50" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Sign Out */}
              <div className="py-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={async () => {
                    await signOut();
                    router.push('/auth/admin/login');
                  }}
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
