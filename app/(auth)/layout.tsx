// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import AuthCard from '@/components/auth/AuthCard';

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <Navbar />
//       <main style={{ paddingTop: 'var(--navbar-height, 60px)', minHeight: '100vh' }}>
//         <AuthCard
//           className=""
//         >
//           {children}
//         </AuthCard>
//       </main>
//       <Footer />
//     </>
//   );
// }






import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthCard from '@/components/auth/AuthCard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main
        style={{
          paddingTop: 'var(--navbar-height, 60px)',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // optional (vertical centering)
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <AuthCard>
            {children}
          </AuthCard>
        </div>
      </main>

      <Footer />
    </>
  );
}