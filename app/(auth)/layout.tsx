import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--cream)' }}>
      <header style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'center', borderBottom: '1px solid var(--blush)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, letterSpacing: '.04em', color: 'var(--deep)' }}>
            Perry <span style={{ color: 'var(--terracotta)' }}>Collectibles</span>
          </span>
        </Link>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {children}
        </div>
      </div>

      <footer style={{ padding: '1rem', textAlign: 'center', fontSize: '.75rem', color: 'var(--mid)' }}>
        © {new Date().getFullYear()} Perry Collectibles · <Link href="/privacy" style={{ color: 'var(--terracotta)' }}>Privacy</Link> · <Link href="/terms" style={{ color: 'var(--terracotta)' }}>Terms</Link>
      </footer>
    </div>
  );
}