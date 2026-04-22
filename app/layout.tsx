import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Perry Collectibles — Fashion & Beauty',
  description: 'Your one-stop-shop for premium ladies fashion accessories, footwear, wigs and beauty products. Based in Sango Ota, Nigeria.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
       <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
