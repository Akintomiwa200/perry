import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthCard from "@/components/auth/AuthCard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main
        style={{
          paddingTop: "var(--navbar-height, 60px)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom: "3rem",
          background: "var(--cream)",
        }}
      >
        <AuthCard>{children}</AuthCard>
      </main>

      <Footer />
    </>
  );
}
