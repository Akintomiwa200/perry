'use client';
import { useState } from 'react';
import Link from 'next/link';
import AuthInput from '@/components/auth/AuthInput';
import ErrorAlert from '@/components/auth/ErrorAlert';
import { CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div >
      {sent ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <CheckCircle size={48} style={{ color: 'var(--color-success)', marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--deep)', marginBottom: '0.5rem' }}>Check your inbox</h2>
          <p style={{ fontSize: '.9rem', color: 'var(--mid)' }}>
            We sent a password reset link to <strong>{email}</strong>. It expires in 30 minutes.
          </p>
          <Link href="/login" style={{ display: 'inline-block', marginTop: '1.5rem', background: 'var(--deep)', color: 'var(--cream)', fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase', padding: '1rem 2rem', textDecoration: 'none' }}>Back to Sign In</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && <ErrorAlert message={error} />}
          <AuthInput label="Email Address" type="email" value={email} onChange={(v) => { setEmail(v); setError(''); }} error={error} placeholder="jane@example.com" autoComplete="email" />
          <button type="submit" style={{ background: 'var(--deep)', color: 'var(--cream)', fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase', padding: '1rem 2rem', border: 'none', cursor: 'pointer', width: '100%' }}>
            Send Reset Link
          </button>
        </form>
      )}
      {!sent && (
        <p className="text-center text-sm mt-8" style={{ color: 'var(--color-text-muted)' }}>
          Remembered it?{' '}
          <Link href="/login" className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
        </p>
      )}
    </div>
  );
}
