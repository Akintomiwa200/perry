import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutStory from '@/components/AboutStory'
import About from '@/components/About'
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-height, 60px)', minHeight: '100vh' }}>
        <AboutStory />
        <About />
      </main>
      <Footer />
    </>
  );
}
