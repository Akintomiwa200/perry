import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-height, 60px)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
