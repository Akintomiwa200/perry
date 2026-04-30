import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutStory from "@/components/AboutStory";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main
        style={{ paddingTop: "var(--navbar-height, 60px)", minHeight: "100vh" }}
      >
        <AboutStory />
        <About />
      </main>
      <Footer />
    </>
  );
}
