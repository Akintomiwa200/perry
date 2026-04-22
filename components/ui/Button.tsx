import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary',
          variant === 'outline' && 'btn-outline',
          variant === 'ghost' && 'btn-ghost',
          variant === 'danger' && 'btn-danger',
          size === 'sm' && 'btn-sm',
          size === 'lg' && 'btn-lg',
          size === 'icon' && 'btn-icon',
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
