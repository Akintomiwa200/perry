import { useState, ChangeEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from '@/components/ui/Input';

interface AuthInputProps {
  label: string;
  type?: 'email' | 'text' | 'password';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export default function AuthInput({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder = '', 
  autoComplete, 
  className 
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  if (type !== 'password') {
    return (
      <Input
        label={label}
        type={inputType}
        value={value}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{label}</label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={handleChange}
          className={`input pr-12 w-full${error ? ' input-error' : ''}`}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
          style={{ opacity: 0.7 }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} style={{ color: 'var(--color-text-muted)' }} /> : <Eye size={18} style={{ color: 'var(--color-text-muted)' }} />}
        </button>
      </div>
      {error && <p className="text-xs" style={{ color: 'var(--color-danger)' }} role="alert">{error}</p>}
    </div>
  );
}
