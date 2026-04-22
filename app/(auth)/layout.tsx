import Link from 'next/link';
import { Coffee } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Simple auth header */}
      <header className="w-full py-4 px-6 flex justify-center" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-raised)' }}>
        <Link href="/" className="flex items-center gap-2">
          <Coffee size={22} style={{ color: 'var(--color-primary)' }} />
          <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>Perry Collectibles</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          {children}
        </div>
      </div>

      <footer className="py-4 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
        © {new Date().getFullYear()} Perry Collectibles · <Link href="/privacy" className="hover:underline">Privacy</Link> · <Link href="/terms" className="hover:underline">Terms</Link>
      </footer>
    </div>
  );
}
