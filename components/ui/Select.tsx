import { cn } from '@/lib/utils';
import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={selectId} className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn('input pr-10 appearance-none', error && 'input-error', className)}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-text-muted)' }}
          />
        </div>
        {error && (
          <p className="text-xs" style={{ color: 'var(--color-danger)' }} role="alert">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
export default Select;
