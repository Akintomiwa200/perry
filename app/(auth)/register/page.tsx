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
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-[var(--bg-light)]">
      <div className="w-full max-w-md bg-[var(--cream)] border border-[var(--blush)] rounded-lg p-6 sm:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-[var(--deep)]">
            Create your account
          </h1>
          <p className="text-sm text-[var(--mid)] mt-2">
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--deep)]">
                First Name
              </label>
              <input
                value={form.firstName}
                onChange={set('firstName')}
                className={`px-3 py-3 border rounded text-sm bg-white outline-none ${
                  errors.firstName ? 'border-red-600' : 'border-[var(--blush)]'
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--deep)]">
                Last Name
              </label>
              <input
                value={form.lastName}
                onChange={set('lastName')}
                className={`px-3 py-3 border rounded text-sm bg-white outline-none ${
                  errors.lastName ? 'border-red-600' : 'border-[var(--blush)]'
                }`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[var(--deep)]">
              Email
            </label>
            <input
              value={form.email}
              onChange={set('email')}
              className={`px-3 py-3 border rounded text-sm bg-white outline-none ${
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
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              className={`px-3 py-3 border rounded text-sm bg-white outline-none ${
                errors.password ? 'border-red-600' : 'border-[var(--blush)]'
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[var(--deep)]">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              className={`px-3 py-3 border rounded text-sm bg-white outline-none ${
                errors.confirm ? 'border-red-600' : 'border-[var(--blush)]'
              }`}
            />
            {errors.confirm && (
              <p className="text-xs text-red-600">{errors.confirm}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[var(--deep)] text-[var(--cream)] text-xs uppercase tracking-widest hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-[var(--mid)] mt-4">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[var(--terracotta)] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}