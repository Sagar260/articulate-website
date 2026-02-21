import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Articulate Speech — Build confidence through clarity',
  description: 'Practice speaking with real feedback. Track your progress. Build the confidence to speak clearly in any situation.',
  keywords: 'speech practice, public speaking, presentation skills, communication, feedback, ESL, interview prep',
  openGraph: {
    title: 'Articulate Speech — Build confidence through clarity',
    description: 'Practice speaking with real feedback. Track your progress.',
    url: 'https://articulatespeech.ai',
    siteName: 'Articulate Speech',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articulate Speech — Build confidence through clarity',
    description: 'Practice speaking with real feedback. Track your progress.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Analytics placeholder - replace with your tracking ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics or Plausible script here
              // window.dataLayer = window.dataLayer || [];
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
