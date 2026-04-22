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
      <nav className={`
        fixed top-0 left-0 right-0 z-[100]
        flex items-center justify-between
        px-8 py-5
        transition-all duration-400
        ${scrolled || menuOpen
          ? 'bg-[rgba(253,248,242,0.96)] backdrop-blur-md shadow-[0_1px_0_rgba(192,120,88,0.15)]'
          : 'bg-transparent'}
      `}>
        {/* Logo */}
        <Link
          href="/"
          className="font-['Cormorant_Garamond',serif] text-2xl font-semibold tracking-wide text-[var(--deep)] no-underline"
        >
          Perry <span className="text-[var(--terracotta)]">Collectibles</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          {navLinks.map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                className="text-[0.8rem] tracking-[0.18em] uppercase text-[var(--deep)] no-underline font-light hover:text-[var(--terracotta)] transition-colors duration-300"
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
            className="hidden md:inline-flex items-center text-[0.75rem] tracking-[0.16em] uppercase bg-[var(--deep)] text-[var(--cream)] px-5 py-[0.65rem] font-['Jost',sans-serif] font-normal no-underline transition-colors duration-300 hover:bg-[var(--terracotta)]"
          >
            {ctaLabel}
          </Link>

          {/* Hamburger */}
          <button
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none p-[0.4rem] cursor-pointer"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-[2px] bg-[var(--deep)] rounded-sm transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-[2px] bg-[var(--deep)] rounded-sm transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-[2px] bg-[var(--deep)] rounded-sm transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 right-0 z-[99] flex flex-col gap-5 px-8 pt-6 pb-8 bg-[rgba(253,248,242,0.98)] backdrop-blur-md border-b border-[var(--blush)]">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[0.85rem] tracking-[0.18em] uppercase text-[var(--deep)] no-underline font-light py-2 border-b border-[var(--blush)]"
            >
              {label}
            </Link>
          ))}

          <Link
            href={ctaLink}
            onClick={() => setMenuOpen(false)}
            className="mt-2 block text-center text-[0.78rem] tracking-[0.16em] uppercase bg-[var(--terracotta)] text-white font-['Jost',sans-serif] no-underline py-4"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </>
  )
}