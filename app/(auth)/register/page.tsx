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
    <main className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-20 bg-surface">
      <div className="w-full max-w-md bg-surface-raised border border-default rounded-lg p-5 sm:p-10 shadow-md">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-primary">
            Create account
          </h1>
          <p className="text-sm text-muted mt-2">
            Join thousands of collectors
          </p>
        </div>

        {/* Global error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border-l-4 border-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">

          {/* Grid - Stacks on mobile, side by side on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-primary">
                First Name
              </label>
              <input
                value={form.firstName}
                onChange={set('firstName')}
                className={`input ${errors.firstName ? 'input-error' : ''}`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-primary">
                Last Name
              </label>
              <input
                value={form.lastName}
                onChange={set('lastName')}
                className={`input ${errors.lastName ? 'input-error' : ''}`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-primary">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="hello@example.com"
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
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              className={`input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-primary">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              className={`input ${errors.confirm ? 'input-error' : ''}`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.confirm && (
              <p className="text-xs text-red-600">{errors.confirm}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full mt-2"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-muted mt-4">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}