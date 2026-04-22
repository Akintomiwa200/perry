import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import About from '@/components/About'
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '60px' }}>
        <About />
      </main>
      <Footer />
    </>
  );
}
