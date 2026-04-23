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
    <div style={{ padding: '8rem 1.5rem 4rem', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--deep)' }}>
          Sign In
        </h1>
        <p style={{ color: 'var(--mid)', marginTop: '0.5rem' }}>
          Welcome back to Perry Collectibles.
        </p>
      </div>
      <div style={{ padding: '2rem', borderRadius: 8, background: 'var(--cream)', border: '1px solid var(--blush)' }}>
        {error && <ErrorAlert message={error} />}
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AuthInput label="Email Address" type="email" value={email} onChange={(v) => { setEmail(v); setErrors(e => { delete e.email; return { ...e }; }); }} error={errors.email} placeholder="jane@example.com" autoComplete="email" />
          <AuthInput label="Password" type="password" value={password} onChange={(v) => { setPassword(v); setErrors(e => { delete e.password; return { ...e }; }); }} error={errors.password} placeholder="••••••••" autoComplete="current-password" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/forgot-password" className="text-xs hover:underline" style={{ color: 'var(--color-primary)' }}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" disabled={isLoading} style={{ background: 'var(--deep)', color: 'var(--cream)', fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase', padding: '1rem 2rem', border: 'none', cursor: 'pointer', width: '100%' }}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm mt-8" style={{ color: 'var(--color-text-muted)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
