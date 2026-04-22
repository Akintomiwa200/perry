'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <div className="w-full max-w-md bg-surface-raised border border-default rounded-lg p-6 sm:p-10 shadow-md">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-primary">
            Create account
          </h1>
          <p className="text-sm text-muted mt-2">
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
              <label className="text-xs font-medium text-primary tracking-wide">
                First Name
              </label>
              <input
                value={form.firstName}
                onChange={set('firstName')}
                className={`input ${errors.firstName ? 'input-error' : ''}`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-xs text-danger mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-primary tracking-wide">
                Last Name
              </label>
              <input
                value={form.lastName}
                onChange={set('lastName')}
                className={`input ${errors.lastName ? 'input-error' : ''}`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-xs text-danger mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-primary tracking-wide">
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
              <p className="text-xs text-danger mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-primary tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={set('password')}
                className={`input ${errors.password ? 'input-error' : ''} pr-12`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-danger mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-primary tracking-wide">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={set('confirm')}
                className={`input ${errors.confirm ? 'input-error' : ''} pr-12`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirm && (
              <p className="text-xs text-danger mt-1">{errors.confirm}</p>
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
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}