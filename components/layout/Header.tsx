'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ShoppingCart, Search, User, Menu, Coffee } from 'lucide-react';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { CATEGORIES } from '@/lib/constants';

export default function Header() {
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const user = useSelector((s: RootState) => s.auth.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'var(--color-surface-raised)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Coffee size={22} style={{ color: 'var(--color-primary)' }} />
              <span className="text-xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>
                Perry Collectibles
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                  style={{ color: 'var(--color-text)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/shop"
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                style={{ color: 'var(--color-text)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              >
                All Items
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link href="/search" className="btn btn-ghost btn-icon hidden sm:flex" aria-label="Search">
                <Search size={18} />
              </Link>
              <Link
                href={user ? '/account' : '/login'}
                className="btn btn-ghost btn-icon hidden sm:flex"
                aria-label={user ? 'My Account' : 'Sign In'}
              >
                <User size={18} />
              </Link>
              <Link href="/cart" className="btn btn-ghost btn-icon relative" aria-label={`Cart (${cartCount} items)`}>
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full text-white"
                    style={{ background: 'var(--color-primary)', fontSize: '10px' }}
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
              <button
                className="btn btn-ghost btn-icon lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
