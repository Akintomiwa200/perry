import Link from 'next/link';

export default function Navbar() {
  return (
    <div
      className="w-full py-2 text-center text-xs font-medium"
      style={{ background: 'var(--color-primary)', color: '#fff' }}
    >
      🎉 Free shipping on orders over $75 &nbsp;·&nbsp;{' '}
      <Link href="/shop" className="underline underline-offset-2 opacity-90 hover:opacity-100">
        Shop Now
      </Link>
    </div>
  );
}
