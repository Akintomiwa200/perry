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

  if (sent) {
    return (
      <div className="text-center flex flex-col items-center gap-6 py-8">
        <CheckCircle size={48} style={{ color: 'var(--color-success)' }} />
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Check your inbox</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          We sent a password reset link to <strong>{email}</strong>. It expires in 30 minutes.
        </p>
        <Link href="/login" className="btn btn-primary w-full max-w-sm">Back to Sign In</Link>
      </div>
    );
  }

  return (
    <>
      {error && <ErrorAlert message={error} />}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <AuthInput
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
          error={error}
          placeholder="jane@example.com"
          autoComplete="email"
        />
        <button type="submit" className="btn btn-primary btn-lg w-full">Send Reset Link</button>
      </form>
      <p className="text-center text-sm mt-8 text-color-text-muted">
        Remembered it?{' '}
        <Link href="/login" className="font-medium text-color-primary hover:underline">Sign in</Link>
      </p>
    </>
  );
}
