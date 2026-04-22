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
    <>
      
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ padding: '2.5rem', background: 'var(--cream)', borderRadius: 4, border: '1px solid var(--blush)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: 'var(--deep)' }}>Welcome back</h1>
            <p style={{ fontSize: '.9rem', color: 'var(--mid)', marginTop: '0.5rem' }}>Sign in to your account</p>
          </div>

          {error && (
            <div style={{ padding: '1rem', marginBottom: '1.25rem', background: '#FEE2E2', color: '#991b1b', borderLeft: '4px solid #991b1b', borderRadius: 4, fontSize: '.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '.75rem', color: 'var(--deep)', fontWeight: 500 }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                style={{ padding: '0.75rem', borderRadius: 4, border: errors.email ? '1px solid #991b1b' : '1px solid var(--blush)', fontSize: '.9rem', background: '#fff' }}
              />
              {errors.email && <p style={{ fontSize: '.75rem', color: '#991b1b' }}>{errors.email}</p>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '.75rem', color: 'var(--deep)', fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: 4, border: errors.password ? '1px solid #991b1b' : '1px solid var(--blush)', fontSize: '.9rem', background: '#fff' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.85rem', color: 'var(--mid)' }}
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p style={{ fontSize: '.75rem', color: '#991b1b' }}>{errors.password}</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/forgot-password" style={{ fontSize: '.8rem', color: 'var(--terracotta)', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={isLoading} style={{
              background: 'var(--deep)', color: 'var(--cream)',
              fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
              padding: '1rem', border: 'none', cursor: 'pointer',
            }}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '.85rem', marginTop: '1.5rem', color: 'var(--mid)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: 'var(--terracotta)', fontWeight: 500, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </main>
      
    </>
  );
}