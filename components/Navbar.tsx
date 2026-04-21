'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.4rem 3rem',
      background: scrolled ? 'rgba(253,248,242,.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 1px 0 rgba(192,120,88,.15)' : 'none',
      transition: 'background .4s, box-shadow .4s',
    }}>
      <Link href="/" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.6rem', fontWeight: 600, letterSpacing: '.04em',
        color: 'var(--deep)', textDecoration: 'none',
      }}>
        Perry <span style={{ color: 'var(--terracotta)' }}>Collectibles</span>
      </Link>

      <ul style={{ display: 'flex', gap: '2.4rem', listStyle: 'none' }}>
        {[['Shop', '#categories'], ['New In', '#new'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => (
          <li key={label}>
            <a href={href} style={{
              fontSize: '.8rem', letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'var(--deep)', textDecoration: 'none', fontWeight: 400,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--terracotta)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--deep)')}
            >{label}</a>
          </li>
        ))}
      </ul>

      <button
        style={{
          fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase',
          background: 'var(--deep)', color: 'var(--cream)',
          border: 'none', padding: '.65rem 1.6rem',
          fontFamily: "'Jost', sans-serif", fontWeight: 400,
          transition: 'background .3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--deep)')}
      >
        Shop Now
      </button>
    </nav>
  )
}
