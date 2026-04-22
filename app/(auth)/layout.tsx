'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--cream)'
    }}>
      
      <Navbar />

      {/* CONTENT */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '480px',

          /* 🔥 KEY FIX */
          marginTop: 'clamp(2rem, 6vh, 4rem)',
          marginBottom: 'clamp(2rem, 6vh, 4rem)',
        }}>
          {children}
        </div>
      </div>

      <Footer />
    </div>
  )
}