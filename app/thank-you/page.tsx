'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'
  const [copied, setCopied] = useState(false)
  const [position] = useState(1848) // Replace with actual position from your backend
  const [referralLink, setReferralLink] = useState('')

  useEffect(() => {
    // Generate a unique referral link based on email hash
    // In production, this should come from your backend
    const hash = btoa(email).slice(0, 8)
    setReferralLink(`https://articulatespeech.ai/r/${hash}`)
  }, [email])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent("I just joined the waitlist for @ArticulateSpeech — an AI that gives you a \"Speech Receipt\" after every practice session. Finally, real feedback on how I sound. Join me:")
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralLink)}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`, '_blank')
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Check out Articulate Speech")
    const body = encodeURIComponent(`I just joined the waitlist for Articulate — it's a speech improvement app that gives you a "Speech Receipt" showing your clarity score, filler words, and exactly what to fix.\n\nJoin the waitlist: ${referralLink}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <main className="min-h-screen bg-bg-0 noise-overlay flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-success/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-h1 tracking-tight mb-4">
          You're on the list.
        </h1>

        {/* Position */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-2 rounded-full border border-white/[0.08] mb-6">
          <span className="text-text-2">Position</span>
          <span className="text-2xl font-bold text-gradient">#{position.toLocaleString()}</span>
        </div>

        {/* Confirmation */}
        <p className="text-body-lg text-text-2 mb-12">
          We'll email you at <span className="text-text-1 font-medium">{email}</span> when it's your turn.
        </p>

        {/* Referral Section */}
        <div className="card p-8 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">&#128640;</span>
            <h2 className="text-h3 text-text-1">Skip the line</h2>
          </div>
          <p className="text-body text-text-2 mb-6">
            Share Articulate and move up <span className="text-success font-semibold">100 spots</span> per referral.
          </p>

          {/* Referral Link */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-bg-3 border border-white/[0.06] rounded-xl text-sm text-text-2 font-mono"
            />
            <button
              onClick={copyToClipboard}
              className="px-5 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-sm font-medium transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-3">
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bg-3 hover:bg-bg-3/80 border border-white/[0.06] rounded-xl text-sm text-text-2 hover:text-text-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bg-3 hover:bg-bg-3/80 border border-white/[0.06] rounded-xl text-sm text-text-2 hover:text-text-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
            <button
              onClick={shareViaEmail}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bg-3 hover:bg-bg-3/80 border border-white/[0.06] rounded-xl text-sm text-text-2 hover:text-text-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </button>
          </div>
        </div>

        {/* While You Wait */}
        <div className="space-y-4 text-left">
          <h3 className="text-h4 text-text-1 text-center mb-6">While you wait</h3>

          <div className="flex items-start gap-4 p-4 bg-bg-2/50 rounded-xl border border-white/[0.05]">
            <span className="text-xl">&#128231;</span>
            <div>
              <p className="text-text-1 font-medium">Check your inbox</p>
              <p className="text-sm text-text-3">We sent a confirmation to {email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-bg-2/50 rounded-xl border border-white/[0.05]">
            <span className="text-xl">&#128038;</span>
            <div>
              <p className="text-text-1 font-medium">Follow @ArticulateSpeech</p>
              <p className="text-sm text-text-3">Get launch updates and speaking tips</p>
            </div>
          </div>

          <a
            href="https://forms.gle/YOUR_FORM_ID" // Replace with actual form
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 bg-bg-2/50 rounded-xl border border-white/[0.05] hover:border-accent/30 transition-colors"
          >
            <span className="text-xl">&#128172;</span>
            <div>
              <p className="text-text-1 font-medium">Tell us what you're preparing for</p>
              <p className="text-sm text-text-3">Your feedback shapes what we build first</p>
            </div>
          </a>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-12 text-sm text-text-3 hover:text-text-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to homepage
        </Link>
      </div>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-bg-0 noise-overlay flex items-center justify-center">
        <div className="text-text-2">Loading...</div>
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
