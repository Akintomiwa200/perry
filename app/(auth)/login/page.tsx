'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

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
    if (result.success) router.push('/shop');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-20 bg-surface">
      <div className="w-full max-w-md bg-surface-raised border border-default rounded-lg p-5 sm:p-10 shadow-md">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-primary">
            Welcome back
          </h1>
          <p className="text-sm text-muted mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Global error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border-l-4 border-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
          
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-primary">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className={`input ${errors.email ? 'input-error' : ''}`}
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-primary">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`input ${errors.password ? 'input-error' : ''} pr-16`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-primary transition-colors font-medium"
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full mt-2"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-muted mt-4">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}