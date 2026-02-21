import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Articulate Speech',
  description: 'Terms and conditions for using Articulate Speech.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-bg-0">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-bg-0/95 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-7 h-7 relative flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="termsLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#A78BFA' }} />
                    <stop offset="100%" style={{ stopColor: '#8B5CF6' }} />
                  </linearGradient>
                </defs>
                <path d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z" fill="url(#termsLogoGrad)" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-text-1 tracking-tight">Articulate</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-text-3 mb-12">Last updated: February 2025</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-2 leading-relaxed">
              By accessing or using Articulate Speech ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">2. Description of Service</h2>
            <p className="text-text-2 leading-relaxed">
              Articulate Speech provides AI-powered speech analysis and coaching tools designed to help users improve their verbal communication skills. The Service includes speech recording, analysis, feedback generation, and practice scenarios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">3. User Accounts</h2>
            <p className="text-text-2 leading-relaxed mb-4">When you create an account, you agree to:</p>
            <ul className="list-disc list-inside text-text-2 space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">4. Subscription and Payments</h2>
            <p className="text-text-2 leading-relaxed mb-4">
              Articulate Speech offers subscription-based pricing. By subscribing, you agree to:
            </p>
            <ul className="list-disc list-inside text-text-2 space-y-2 ml-4">
              <li>Pay the applicable subscription fees</li>
              <li>Provide valid payment information</li>
              <li>Automatic renewal unless canceled before the renewal date</li>
              <li>Founder pricing is locked for the duration of continuous subscription</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">5. Cancellation and Refunds</h2>
            <p className="text-text-2 leading-relaxed">
              You may cancel your subscription at any time. Upon cancellation, you will retain access until the end of your current billing period. We do not provide refunds for partial subscription periods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">6. Acceptable Use</h2>
            <p className="text-text-2 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-text-2 space-y-2 ml-4">
              <li>Use the Service for any illegal purpose</li>
              <li>Upload harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the Service</li>
              <li>Reverse engineer or copy our technology</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">7. Intellectual Property</h2>
            <p className="text-text-2 leading-relaxed">
              The Service and its original content, features, and functionality are owned by Articulate Speech and are protected by international copyright, trademark, and other intellectual property laws. Your content remains yours, but you grant us a license to use it to provide and improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-text-2 leading-relaxed">
              The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free. Speech analysis and feedback are generated by AI and should not be considered professional coaching advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">9. Limitation of Liability</h2>
            <p className="text-text-2 leading-relaxed">
              To the maximum extent permitted by law, Articulate Speech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">10. Changes to Terms</h2>
            <p className="text-text-2 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-1 mb-4">11. Contact Us</h2>
            <p className="text-text-2 leading-relaxed">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@articulatespeech.ai" className="text-accent hover:underline">
                legal@articulatespeech.ai
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
