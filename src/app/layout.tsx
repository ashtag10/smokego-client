import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'
import { LayoutClient } from '@/components/layout/LayoutClient'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'
  ),

  title: {
    template: '%s | SmokeGo',
    default: 'SmokeGo - Lounge & Chicha',
  },

  description:
    'Application de vente, livraison et réservation de lounge autour de la chicha',

  keywords: [
    'chicha',
    'lounge',
    'livraison',
    'réservation',
    'SmokeGo',
    'shisha',
  ],

  authors: [{ name: 'SmokeGo' }],
  creator: 'SmokeGo',
  publisher: 'SmokeGo',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://smokego.com',
    siteName: 'SmokeGo',
    title: 'SmokeGo - Lounge & Chicha',
    description:
      'Application de vente, livraison et réservation de lounge autour de la chicha',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SmokeGo',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SmokeGo - Lounge & Chicha',
    description:
      'Application de vente, livraison et réservation de lounge autour de la chicha',
    images: ['/images/og-image.jpg'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },

  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body>
        <Providers>
          <LayoutClient>
            {children}
          </LayoutClient>
        </Providers>
      </body>
    </html>
  )
}