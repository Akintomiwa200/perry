'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'First name is required';
    if (!form.lastName) e.lastName = 'Last name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'A valid email is required';
    if (!form.password || form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const result = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password
    });

    if (result.success) router.push('/shop');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-20 bg-[#F9F7F5]">
      <div className="w-full max-w-md bg-white border border-[#DDD5CE] rounded-lg p-6 sm:p-10 shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-[#3E2B1E]">
            Create account
          </h1>
          <p className="text-sm text-[#8C7B6E] mt-2">
            Join thousands of collectors
          </p>
        </div>

        {/* Global error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border-l-4 border-red-600 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#3E2B1E] tracking-wide">
                First Name
              </label>
              <input
                value={form.firstName}
                onChange={set('firstName')}
                className={`w-full px-4 py-3 sm:py-3.5 text-sm border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-[#5D4432] focus:border-transparent ${
                  errors.firstName 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-[#DDD5CE] hover:border-[#5D4432]'
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#3E2B1E] tracking-wide">
                Last Name
              </label>
              <input
                value={form.lastName}
                onChange={set('lastName')}
                className={`w-full px-4 py-3 sm:py-3.5 text-sm border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-[#5D4432] focus:border-transparent ${
                  errors.lastName 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-[#DDD5CE] hover:border-[#5D4432]'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#3E2B1E] tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              className={`w-full px-4 py-3 sm:py-3.5 text-sm border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-[#5D4432] focus:border-transparent ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-[#DDD5CE] hover:border-[#5D4432]'
              }`}
              placeholder="hello@example.com"
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
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              className={`w-full px-4 py-3 sm:py-3.5 text-sm border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-[#5D4432] focus:border-transparent ${
                errors.password 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-[#DDD5CE] hover:border-[#5D4432]'
              }`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#3E2B1E] tracking-wide">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              className={`w-full px-4 py-3 sm:py-3.5 text-sm border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-[#5D4432] focus:border-transparent ${
                errors.confirm 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-[#DDD5CE] hover:border-[#5D4432]'
              }`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.confirm && (
              <p className="text-xs text-red-600 mt-1">{errors.confirm}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 sm:py-4 bg-[#5D4432] text-white text-xs sm:text-sm uppercase tracking-wider rounded-lg hover:bg-[#4A3527] disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98] font-medium mt-2"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-[#8C7B6E] mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#5D4432] font-semibold hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}