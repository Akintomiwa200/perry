import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-surface)' }}>
      <div className="text-center px-6 animate-fade-in">
        <p className="text-8xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>404</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Page Not Found</h1>
        <p className="mb-8 text-base" style={{ color: 'var(--color-text-muted)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
