'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
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
    if (result.success) router.push('/shop');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-20 bg-[#F9F7F5]">
      <div className="w-full max-w-md bg-white border border-[#DDD5CE] rounded-lg p-6 sm:p-10 shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-[#3E2B1E]">
            Welcome back
          </h1>
          <p className="text-sm text-[#8C7B6E] mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Global error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border-l-4 border-red-600 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#3E2B1E] tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className={`w-full px-4 py-3 sm:py-3.5 text-sm border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-[#5D4432] focus:border-transparent ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-[#DDD5CE] hover:border-[#5D4432]'
              }`}
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#3E2B1E] tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 sm:py-3.5 text-sm border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-[#5D4432] focus:border-transparent pr-12 ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-[#DDD5CE] hover:border-[#5D4432]'
                }`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7B6E] hover:text-[#5D4432] transition-colors"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end -mt-1">
            <Link
              href="/forgot-password"
              className="text-xs sm:text-sm text-[#5D4432] hover:text-[#4A3527] hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 sm:py-4 bg-[#5D4432] text-white text-xs sm:text-sm uppercase tracking-wider rounded-lg hover:bg-[#4A3527] disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98] font-medium mt-2"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-[#8C7B6E] mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-[#5D4432] font-semibold hover:underline transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}