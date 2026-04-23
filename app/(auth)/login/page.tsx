'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AuthInput from '@/components/auth/AuthInput';
import ErrorAlert from '@/components/auth/ErrorAlert';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <>
      {error && <ErrorAlert message={error} />}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <AuthInput
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder="jane@example.com"
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs text-color-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg w-full">
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="text-center text-sm mt-8 text-color-text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-color-primary hover:underline">
          Create one
        </Link>
      </p>
    </>
  );
}
