'use client';
import Link from 'next/link';
import { X, Coffee } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { useEffect } from 'react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--color-overlay)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative ml-auto w-72 max-w-full h-full flex flex-col animate-fade-in"
        style={{ background: 'var(--color-surface-raised)' }}
      >
        <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Coffee size={20} style={{ color: 'var(--color-primary)' }} />
            <span className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>Perry Collectibles</span>
          </Link>
          <button onClick={onClose} className="btn btn-ghost btn-icon" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Categories
          </p>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 py-3 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)' }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={onClose}
            className="flex items-center gap-3 py-3 text-sm font-semibold"
            style={{ color: 'var(--color-primary)' }}
          >
            View All Items →
          </Link>
        </nav>

        <div className="p-4 flex flex-col gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
          <Link href="/login" onClick={onClose} className="btn btn-outline w-full">Sign In</Link>
          <Link href="/register" onClick={onClose} className="btn btn-primary w-full">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
