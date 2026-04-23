import Link from 'next/link';
import { ReactNode } from 'react';
import { Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: ReactNode;
  className?: string;
  headerText: string;
  subText: string;
  footer?: ReactNode;
}

export default function AuthCard({ children, className = '', headerText, subText, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Header */}
      <header className="w-full py-6 px-6 flex justify-center" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)' }}>
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Coffee size={24} style={{ color: 'var(--color-primary)' }} />
          <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>Perry Collectibles</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className={`w-full max-w-md p-8 rounded-2xl border box-shadow-md animate-fade-in ${className}`} style={{ backgroundColor: 'var(--color-surface-raised)', borderColor: 'var(--color-border)' }}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>{headerText}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{subText}</p>
          </div>
          {children}
        </div>
      </main>

      {/* Footer */}
      {footer || (
        <footer className="py-4 text-center text-xs" style={{ color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)' }}>
          © {new Date().getFullYear()} Perry Collectibles ·{' '}
          <Link href="/privacy" className="hover:underline">Privacy</Link> ·{' '}
          <Link href="/terms" className="hover:underline">Terms</Link>
        </footer>
      )}
    </div>
  );
}
