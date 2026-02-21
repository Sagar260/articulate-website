import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Articulate Speech — Know exactly why you sound unsure. Fix it in 60 seconds.',
  description: 'Record a 60-second answer. Get your Speech Receipt with clarity score, filler count, and your #1 fix. Redo it. Compare. Walk in confident.',
  keywords: 'speech practice, public speaking, presentation skills, interview prep, communication, feedback, ESL, speech coach, filler words',
  authors: [{ name: 'Articulate Speech' }],
  creator: 'Articulate Speech',
  publisher: 'Articulate Speech',
  openGraph: {
    title: 'Articulate Speech — Know exactly why you sound unsure',
    description: 'Record 60 seconds. Get your Speech Receipt. Fix your #1 issue. Redo it. Walk in confident.',
    url: 'https://articulatespeech.ai',
    siteName: 'Articulate Speech',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articulate Speech — Know exactly why you sound unsure',
    description: 'Record 60 seconds. Get your Speech Receipt. Fix your #1 issue. Walk in confident.',
    creator: '@ArticulateSpeech',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#050809',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
