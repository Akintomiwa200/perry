'use client';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User, MapPin, Heart, Package, Settings } from 'lucide-react';

const NAV_LINKS = [
  { href: '/account', label: 'Overview', icon: User },
  { href: '/account/profile', label: 'Profile', icon: Settings },
  { href: '/orders', label: 'My Orders', icon: Package },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside>
            <nav
              className="p-4 rounded-xl"
              style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-2" style={{ color: 'var(--color-text-muted)' }}>
                My Account
              </p>
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: 'var(--color-text)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-secondary)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text)';
                  }}
                >
                  <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="md:col-span-3 page-enter">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
