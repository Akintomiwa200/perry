'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AuthInput from '@/components/auth/AuthInput';
import ErrorAlert from '@/components/auth/ErrorAlert';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
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
    const result = await register({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password });
    if (result.success) router.push('/');
  };

  return (
    <>
      {error && <ErrorAlert message={error} />}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <AuthInput 
            label="First Name" 
            value={form.firstName} 
            onChange={set('firstName')} 
            error={errors.firstName} 
            placeholder="Jane" 
            autoComplete="given-name" 
          />
          <AuthInput 
            label="Last Name" 
            value={form.lastName} 
            onChange={set('lastName')} 
            error={errors.lastName} 
            placeholder="Doe" 
            autoComplete="family-name" 
          />
        </div>
        <AuthInput 
          label="Email Address" 
          type="email" 
          value={form.email} 
          onChange={set('email')} 
          error={errors.email} 
          placeholder="jane@example.com" 
          autoComplete="email" 
        />
        <AuthInput 
          label="Password" 
          type="password" 
          value={form.password} 
          onChange={set('password')} 
          error={errors.password} 
          placeholder="Min. 8 characters" 
          autoComplete="new-password" 
        />
        <AuthInput 
          label="Confirm Password" 
          type="password" 
          value={form.confirm} 
          onChange={set('confirm')} 
          error={errors.confirm} 
          placeholder="Re-enter password" 
          autoComplete="new-password" 
        />
        <p className="text-xs text-color-text-muted">
          By creating an account you agree to our{' '}
          <Link href="/terms" className="underline text-color-primary">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline text-color-primary">Privacy Policy</Link>.
        </p>
        <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg w-full">
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-sm mt-8 text-color-text-muted">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-color-primary hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
