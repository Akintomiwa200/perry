'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AuthInput from '@/components/auth/AuthInput';
import ErrorAlert from '@/components/auth/ErrorAlert';

export default function AdminRegisterPage() {
  const router = useRouter();
  const { adminRegister, isLoading, error } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
    const result = await adminRegister({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    if (result.success) router.push('/admin');
  };

  return (
    <div >
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.8rem',
          color: 'var(--deep)',
          marginBottom: '0.25rem',
          textAlign: 'center',
        }}
      >
        Create Admin Account
      </h1>
      <p className="text-center text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
        Register to access the admin dashboard
      </p>

      {error && <ErrorAlert message={error} />}
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <AuthInput
            label="First Name"
            value={form.firstName}
            onChange={(v) => { setForm((p) => ({ ...p, firstName: v })); setErrors((e) => { const n = { ...e }; delete n.firstName; return n; }); }}
            error={errors.firstName}
            placeholder="Jane"
            autoComplete="given-name"
          />
          <AuthInput
            label="Last Name"
            value={form.lastName}
            onChange={(v) => { setForm((p) => ({ ...p, lastName: v })); setErrors((e) => { const n = { ...e }; delete n.lastName; return n; }); }}
            error={errors.lastName}
            placeholder="Doe"
            autoComplete="family-name"
          />
        </div>
        <AuthInput
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(v) => { setForm((p) => ({ ...p, email: v })); setErrors((e) => { const n = { ...e }; delete n.email; return n; }); }}
          error={errors.email}
          placeholder="admin@example.com"
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => { setForm((p) => ({ ...p, password: v })); setErrors((e) => { const n = { ...e }; delete n.password; return n; }); }}
          error={errors.password}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
        />
        <AuthInput
          label="Confirm Password"
          type="password"
          value={form.confirm}
          onChange={(v) => { setForm((p) => ({ ...p, confirm: v })); setErrors((e) => { const n = { ...e }; delete n.confirm; return n; }); }}
          error={errors.confirm}
          placeholder="Re-enter password"
          autoComplete="new-password"
        />
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          By creating an admin account you agree to our{' '}
          <Link href="/terms" className="underline" style={{ color: 'var(--color-primary)' }}>Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline" style={{ color: 'var(--color-primary)' }}>Privacy Policy</Link>.
        </p>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            background: 'var(--deep)',
            color: 'var(--cream)',
            fontSize: '.78rem',
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            padding: '1rem 2rem',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-sm mt-8" style={{ color: 'var(--color-text-muted)' }}>
        Already have an admin account?{' '}
        <Link href="/auth/admin/login" className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}

