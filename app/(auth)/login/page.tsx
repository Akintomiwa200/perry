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
  const [showPw, setShowPw] = useState(false);
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
      className="p-8 rounded-2xl"
      style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Welcome back</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Sign in to your account</p>
      </div>

      {error && (
        <div
          className="p-4 rounded-xl mb-5 text-sm"
          style={{ background: '#FEE2E2', color: 'var(--color-danger)', borderLeft: '4px solid var(--color-danger)' }}
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="jane@example.com"
          autoComplete="email"
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input pr-10${errors.password ? ' input-error' : ''}`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff size={16} style={{ color: 'var(--color-text-muted)' }} /> : <Eye size={16} style={{ color: 'var(--color-text-muted)' }} />}
            </button>
          </div>
          {errors.password && <p className="text-xs" style={{ color: 'var(--color-danger)' }} role="alert">{errors.password}</p>}
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs" style={{ color: 'var(--color-primary)' }}>
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg w-full">
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium" style={{ color: 'var(--color-primary)' }}>
          Create one
        </Link>
      </p>
    </div>
  );
}
