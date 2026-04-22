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
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-[var(--bg-light)]">
      <div className="w-full max-w-md bg-[var(--cream)] border border-[var(--blush)] rounded-lg p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-[var(--deep)]">
            Welcome back
          </h1>
          <p className="text-sm text-[var(--mid)] mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border-l-4 border-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[var(--deep)]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className={`w-full px-3 py-3 border rounded text-sm bg-white outline-none focus:ring-1 ${
                errors.email ? 'border-red-600' : 'border-[var(--blush)]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[var(--deep)]">
              Password
            </label>

            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-3 py-3 pr-16 border rounded text-sm bg-white outline-none focus:ring-1 ${
                  errors.password ? 'border-red-600' : 'border-[var(--blush)]'
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--mid)]"
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-[var(--terracotta)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[var(--deep)] text-[var(--cream)] text-xs uppercase tracking-widest hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-[var(--mid)] mt-4">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-[var(--terracotta)] font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}