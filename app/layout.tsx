import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Perry Collectibles — Fashion & Beauty',
  description: 'Your one-stop-shop for premium ladies fashion accessories, footwear, wigs and beauty products. Based in Sango Ota, Nigeria.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
