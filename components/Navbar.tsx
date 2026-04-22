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
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.2rem 2rem',
        background: scrolled || menuOpen ? 'rgba(253,248,242,.96)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(192,120,88,.15)' : 'none',
        transition: 'background .4s, box-shadow .4s',
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.5rem', fontWeight: 600, letterSpacing: '.04em',
          color: 'var(--deep)', textDecoration: 'none',
        }}>
          Perry <span style={{ color: 'var(--terracotta)' }}>Collectibles</span>
        </Link>

        {/* Middle nav links — CSS class controls desktop/mobile visibility, untouched */}
        <ul className="nav-links-desktop" style={{ gap: '2.4rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(([label, href]) => (
            <li key={label}>
              <Link href={href} style={{
                fontSize: '.8rem',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--deep)',
                textDecoration: 'none',
                fontWeight: 400,
              }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — CTA on desktop, hamburger on mobile, both in same div */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

          {/* CTA: hidden on mobile, shown on desktop — no inline display so Tailwind wins */}
          <Link
            href={ctaLink}
            className="hidden md:inline-flex items-center"
            style={{
              fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase',
              background: 'var(--deep)', color: 'var(--cream)',
              padding: '.65rem 1.4rem',
              fontFamily: "'Jost', sans-serif", fontWeight: 400,
              transition: 'background .3s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--deep)')}
          >
            {ctaLabel}
          </Link>

          {/* Hamburger: shown on mobile, hidden on desktop — no inline display so Tailwind wins */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', padding: '.4rem',
              display: 'flex', flexDirection: 'column', gap: '5px',
              cursor: 'pointer',
            }}
            aria-label="Menu"
          >
            <span style={{
              display: 'block', width: 24, height: 2,
              background: 'var(--deep)', borderRadius: 2,
              transition: 'transform .3s, opacity .3s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 24, height: 2,
              background: 'var(--deep)', borderRadius: 2,
              transition: 'transform .3s, opacity .3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 24, height: 2,
              background: 'var(--deep)', borderRadius: 2,
              transition: 'transform .3s, opacity .3s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu — original, untouched */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(253,248,242,.98)', backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', padding: '1.5rem 2rem 2rem',
          borderBottom: '1px solid var(--blush)',
          gap: '1.2rem',
        }}>
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '.85rem',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--deep)',
                textDecoration: 'none',
                fontWeight: 400,
                padding: '.5rem 0',
                borderBottom: '1px solid var(--blush)',
              }}
            >
              {label}
            </Link>
          ))}

          {/* Single CTA in mobile menu */}
          <Link
            href={ctaLink}
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '.5rem',
              fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase',
              background: 'var(--terracotta)', color: '#fff',
              border: 'none', padding: '1rem',
              fontFamily: "'Jost', sans-serif",
              textDecoration: 'none', display: 'inline-block',
              textAlign: 'center',
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </>
  )
}