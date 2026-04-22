'use client';
import Link from 'next/link';
import { Coffee, Globe, Send, Share2 } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-text)', color: 'rgba(233,227,221,0.9)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Coffee size={22} style={{ color: '#E9E3DD' }} />
              <span className="text-lg font-bold" style={{ color: '#E9E3DD' }}>Perry Collectibles</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(233,227,221,0.65)' }}>
              Your curated destination for rare figures, comics, trading cards, and more.
            </p>
            <div className="flex gap-3">
            {[Globe, Send, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-md flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(233,227,221,0.08)' }}
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#E9E3DD' }}>
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(233,227,221,0.65)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E9E3DD')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(233,227,221,0.65)')}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#E9E3DD' }}>
              Account
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'My Orders', href: '/orders' },
                { label: 'Wishlist', href: '/wishlist' },
                { label: 'Addresses', href: '/addresses' },
                { label: 'Profile', href: '/profile' },
                { label: 'Sign In', href: '/login' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(233,227,221,0.65)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E9E3DD')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(233,227,221,0.65)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#E9E3DD' }}>
              Help
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(233,227,221,0.65)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E9E3DD')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(233,227,221,0.65)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(233,227,221,0.12)', color: 'rgba(233,227,221,0.45)' }}
        >
          <p>© {new Date().getFullYear()} Perry Collectibles. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
            <Link href="/terms" className="hover:opacity-80 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
