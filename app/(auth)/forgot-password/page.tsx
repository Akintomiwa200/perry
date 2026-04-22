'use client';
import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import { CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    // In production: await authService.forgotPassword(email)
    setSent(true);
  };

  return (
    <div
      className="p-8 rounded-2xl"
      style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
    >
      {sent ? (
        <div className="text-center flex flex-col items-center gap-4 py-4">
          <CheckCircle size={48} style={{ color: 'var(--color-success)' }} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Check your inbox</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            We sent a password reset link to <strong>{email}</strong>. It expires in 30 minutes.
          </p>
          <Link href="/login" className="btn btn-primary w-full mt-4">Back to Sign In</Link>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Reset your password</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Enter your email and we'll send you a reset link.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              placeholder="jane@example.com"
              autoComplete="email"
            />
            <button type="submit" className="btn btn-primary btn-lg w-full">Send Reset Link</button>
          </form>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
            Remembered it?{' '}
            <Link href="/login" className="font-medium" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
          </p>
        </>
      )}
    </div>
  );
}
