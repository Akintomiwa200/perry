import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthCard from '@/components/auth/AuthCard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-height, 60px)', minHeight: '100vh' }}>
        <AuthCard
          headerText="Welcome"
          subText="Manage your account conveniently"
          className=""
        >
          {children}
        </AuthCard>
      </main>
      <Footer />
    </>
  );
}
