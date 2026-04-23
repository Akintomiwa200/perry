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

     
    </div>
  );
}
