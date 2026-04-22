import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export default function Card({ className, hoverable = true, padding = 'md', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border',
        hoverable && 'card',
        !hoverable && 'rounded-lg border',
        padding === 'sm' && 'p-4',
        padding === 'md' && 'p-6',
        padding === 'lg' && 'p-8',
        padding === 'none' && 'p-0',
        className
      )}
      style={
        !hoverable
          ? {
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
}
