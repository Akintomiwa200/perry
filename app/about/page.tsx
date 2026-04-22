import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 page-enter">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>About Perry Collectibles</h1>
        <div
          className="w-16 h-1 rounded-full mb-8"
          style={{ background: 'var(--color-primary)' }}
        />
        <div className="prose text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          <p className="text-lg mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Perry Collectibles was born out of a simple belief: every collector deserves access to authentic, high-quality pieces without the guesswork.
          </p>
          <p className="mb-6">
            Founded in 2018, we started as a small operation selling vintage action figures out of a garage. Today, we curate thousands of items across categories — from Marvel and DC figures to graded comics, Pokémon cards, and limited-edition art prints — each vetted for authenticity by our in-house team.
          </p>
          <p className="mb-6">
            We believe collecting is about more than owning things. It's about the stories behind them, the communities they connect, and the joy of finding that one piece you've been hunting for years.
          </p>
          <p>
            Every item on our platform is carefully inspected, accurately described, and shipped with the care your collection deserves.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            { value: '50,000+', label: 'Items Sold' },
            { value: '12,000+', label: 'Happy Collectors' },
            { value: '6 Years', label: 'In Business' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="p-5 rounded-xl text-center"
              style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{value}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
