'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F2]">
      
      <Navbar />

      {/* CONTENT */}
      <div className="flex-1 flex justify-center items-center px-4 sm:px-6">
        <div className="w-full max-w-md my-8 sm:my-12 md:my-16 lg:my-20">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}