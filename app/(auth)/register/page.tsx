'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    if (result.success) router.push('/shop');
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ padding: '2.5rem', background: 'var(--cream)', borderRadius: 4, border: '1px solid var(--blush)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: 'var(--deep)' }}>Create your account</h1>
            <p style={{ fontSize: '.9rem', color: 'var(--mid)', marginTop: '0.5rem' }}>Join thousands of collectors</p>
          </div>

          {error && (
            <div style={{ padding: '1rem', marginBottom: '1.25rem', background: '#FEE2E2', color: '#991b1b', borderLeft: '4px solid #991b1b', borderRadius: 4, fontSize: '.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '.75rem', color: 'var(--deep)', fontWeight: 500 }}>First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={set('firstName')}
                  placeholder="Jane"
                  style={{ padding: '0.75rem', borderRadius: 4, border: errors.firstName ? '1px solid #991b1b' : '1px solid var(--blush)', fontSize: '.9rem', background: '#fff' }}
                />
                {errors.firstName && <p style={{ fontSize: '.75rem', color: '#991b1b' }}>{errors.firstName}</p>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '.75rem', color: 'var(--deep)', fontWeight: 500 }}>Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={set('lastName')}
                  placeholder="Doe"
                  style={{ padding: '0.75rem', borderRadius: 4, border: errors.lastName ? '1px solid #991b1b' : '1px solid var(--blush)', fontSize: '.9rem', background: '#fff' }}
                />
                {errors.lastName && <p style={{ fontSize: '.75rem', color: '#991b1b' }}>{errors.lastName}</p>}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '.75rem', color: 'var(--deep)', fontWeight: 500 }}>Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="jane@example.com"
                style={{ padding: '0.75rem', borderRadius: 4, border: errors.email ? '1px solid #991b1b' : '1px solid var(--blush)', fontSize: '.9rem', background: '#fff' }}
              />
              {errors.email && <p style={{ fontSize: '.75rem', color: '#991b1b' }}>{errors.email}</p>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '.75rem', color: 'var(--deep)', fontWeight: 500 }}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={set('password')}
                placeholder="Min. 8 characters"
                style={{ padding: '0.75rem', borderRadius: 4, border: errors.password ? '1px solid #991b1b' : '1px solid var(--blush)', fontSize: '.9rem', background: '#fff' }}
              />
              {errors.password && <p style={{ fontSize: '.75rem', color: '#991b1b' }}>{errors.password}</p>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '.75rem', color: 'var(--deep)', fontWeight: 500 }}>Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={set('confirm')}
                placeholder="Re-enter password"
                style={{ padding: '0.75rem', borderRadius: 4, border: errors.confirm ? '1px solid #991b1b' : '1px solid var(--blush)', fontSize: '.9rem', background: '#fff' }}
              />
              {errors.confirm && <p style={{ fontSize: '.75rem', color: '#991b1b' }}>{errors.confirm}</p>}
            </div>

            <p style={{ fontSize: '.75rem', color: 'var(--mid)' }}>
              By creating an account you agree to our{' '}
              <Link href="/terms" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>Terms of Service</Link>{' '}
              and{' '}
              <Link href="/privacy" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={isLoading} style={{
              background: 'var(--deep)', color: 'var(--cream)',
              fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
              padding: '1rem', border: 'none', cursor: 'pointer',
            }}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '.85rem', marginTop: '1.5rem', color: 'var(--mid)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--terracotta)', fontWeight: 500, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}