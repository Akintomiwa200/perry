'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = 'A valid email is required';
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const result = await login({ email, password });
    if (result.success) router.push('/');
  };

  return (
    <div
      className="p-6 sm:p-8 rounded-2xl w-full"
      style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
    >
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Welcome back
        </h1>
        <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Sign in to your account
        </p>
      </div>

      {error && (
        <div 
          className="p-3 sm:p-4 rounded-xl mb-4 sm:mb-5 text-sm" 
          style={{ background: '#FEE2E2', color: 'var(--color-danger)', borderLeft: '4px solid var(--color-danger)' }} 
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
        <Input 
          label="Email Address" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          error={errors.email} 
          placeholder="jane@example.com" 
          autoComplete="email" 
        />
        
        <div className="relative">
          <Input 
            label="Password" 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            error={errors.password} 
            placeholder="Enter your password" 
            autoComplete="current-password"
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] sm:top-[42px] text-muted hover:text-primary transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-end -mt-1">
          <Link 
            href="/forgot-password" 
            className="text-xs sm:text-sm hover:underline transition-opacity" 
            style={{ color: 'var(--color-primary)' }}
          >
            Forgot password?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className="btn btn-primary w-full py-3 sm:py-3.5 text-sm sm:text-base mt-2"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-xs sm:text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
        Don't have an account?{' '}
        <Link href="/register" className="font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--color-primary)' }}>
          Create one
        </Link>
      </p>
    </div>
  );
}