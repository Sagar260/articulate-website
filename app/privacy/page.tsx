import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Articulate Speech',
  description: 'How Articulate Speech collects, uses, and protects your data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-bg-0">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-bg-0/95 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-7 h-7 relative flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="privacyLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#A78BFA' }} />
                    <stop offset="100%" style={{ stopColor: '#8B5CF6' }} />
                  </linearGradient>
                </defs>
                <path d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z" fill="url(#privacyLogoGrad)" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-text-1 tracking-tight">Articulate</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-text-3 mb-12">Last updated: February 2025</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">1. Information We Collect</h2>
            <p className="text-text-2 leading-relaxed mb-4">
              Articulate Speech ("we", "our", or "us") collects information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-text-2 space-y-2 ml-4">
              <li>Email address when you join our waitlist</li>
              <li>Voice recordings when you use our speech practice features</li>
              <li>Account information if you create an account</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">2. How We Use Your Information</h2>
            <p className="text-text-2 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-text-2 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and analyze your speech for feedback</li>
              <li>Send you updates about our product launch</li>
              <li>Respond to your comments and questions</li>
              <li>Understand usage patterns to improve the product</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">3. Voice Recording Privacy</h2>
            <p className="text-text-2 leading-relaxed mb-4">
              Your privacy is important to us. Here's how we handle voice recordings:
            </p>
            <ul className="list-disc list-inside text-text-2 space-y-2 ml-4">
              <li><strong className="text-text-1">Processing:</strong> Audio is processed to generate your Speech Receipt</li>
              <li><strong className="text-text-1">Deletion:</strong> Raw audio is deleted after analysis unless you opt to save it</li>
              <li><strong className="text-text-1">Transcripts:</strong> Text transcripts may be stored to track your progress</li>
              <li><strong className="text-text-1">No Sharing:</strong> We never share your recordings with third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">4. Data Sharing</h2>
            <p className="text-text-2 leading-relaxed">
              We do not sell your personal information. We may share information with service providers who help us operate our business (e.g., hosting, analytics), but only as necessary to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">5. Data Security</h2>
            <p className="text-text-2 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">6. Your Rights</h2>
            <p className="text-text-2 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-text-2 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">7. Contact Us</h2>
            <p className="text-text-2 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@articulatespeech.ai" className="text-accent hover:underline">
                privacy@articulatespeech.ai
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <Link href="/" className="text-accent hover:underline">
            ← Back to home
          </Link>
        </div>
      </article>
    </main>
  )
}
