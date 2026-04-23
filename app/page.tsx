import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Categories from '@/components/Categories'
import AboutStory from '@/components/AboutStory'
import Products from '@/components/Products'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <AboutStory />
        <Products />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
