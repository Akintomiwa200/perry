'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const navLinks = [
  ['Shop', '/shop'],
  ['New In', '/shop?filter=new'],
  ['About', '/about'],
  ['Contact', '/contact']
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isAuthenticated = useSelector((s: RootState) => !!s.auth.user)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ctaLink = isAuthenticated ? '/cart' : '/login'
  const ctaLabel = isAuthenticated ? 'Cart 🛒' : 'Shop Now'

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-5 transition-all"
        style={{
          background: scrolled || menuOpen ? 'rgba(253,248,242,.96)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 var(--blush)' : 'none',
        }}
      >
        {/* Logo */}
        <Link href="/" className="text-[1.5rem] font-semibold tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--deep)' }}
        >
          Perry <span style={{ color: 'var(--terracotta)' }}>Collectibles</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 list-none">
          {navLinks.map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                className="text-[0.8rem] uppercase tracking-[0.18em]"
                style={{ color: 'var(--deep)' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <Link
            href={ctaLink}
            className="hidden md:inline-block px-6 py-2 text-[0.75rem] uppercase tracking-[0.16em] transition-colors"
            style={{
              background: 'var(--deep)',
              color: 'var(--cream)',
              fontFamily: "'Jost', sans-serif",
            }}
          >
            {ctaLabel}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="flex md:hidden flex-col gap-[5px]"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span
              className="w-6 h-[2px] transition-all"
              style={{
                background: 'var(--deep)',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="w-6 h-[2px] transition-all"
              style={{
                background: 'var(--deep)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="w-6 h-[2px] transition-all"
              style={{
                background: 'var(--deep)',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 z-[99] flex flex-col px-8 py-6 gap-5"
          style={{
            background: 'rgba(253,248,242,.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--blush)',
          }}
        >
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="uppercase tracking-[0.18em] py-2 border-b"
              style={{
                color: 'var(--deep)',
                borderColor: 'var(--blush)',
              }}
            >
              {label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href={ctaLink}
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center py-4 uppercase tracking-[0.16em]"
            style={{
              background: 'var(--terracotta)',
              color: '#fff',
              fontFamily: "'Jost', sans-serif",
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </>
  )
}