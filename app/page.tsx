'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Waitlist config
  const TOTAL_FOUNDER_SPOTS = 500
  const [currentSignups] = useState(347)
  const spotsRemaining = TOTAL_FOUNDER_SPOTS - currentSignups
  const percentageFilled = (currentSignups / TOTAL_FOUNDER_SPOTS) * 100

  // Recent signup toast
  const [recentSignup, setRecentSignup] = useState<string | null>(null)
  const recentNames = ['Sarah K.', 'Mike T.', 'Priya R.', 'James L.', 'Emma W.']

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  // Recent signup notifications (less frequent on mobile)
  useEffect(() => {
    const showNotification = () => {
      const name = recentNames[Math.floor(Math.random() * recentNames.length)]
      const mins = Math.floor(Math.random() * 5) + 1
      setRecentSignup(`${name} joined ${mins}m ago`)
      setTimeout(() => setRecentSignup(null), 3000)
    }
    const timeout = setTimeout(showNotification, 10000)
    const interval = setInterval(showNotification, 30000)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/thank-you?email=${encodeURIComponent(email)}`)
    }, 1000)
  }

  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  const scrollToTop = () => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // FAQ data
  const faqs = [
    {
      q: 'How does the scoring work?',
      a: 'Every session is analyzed across four dimensions: Clarity (what you say), Filler Words (how many "ums" and "likes"), Pace (words per minute), and an Overall score. You\'ll see exactly where to improve.'
    },
    {
      q: 'Is my audio data stored?',
      a: 'Your privacy matters. Audio is processed for feedback and then deleted. If you create an account, we store transcripts and scores to track your progress—but never share your data with third parties.'
    },
    {
      q: 'What scenarios can I practice?',
      a: 'Choose from interview questions, client pitches, team standups, presentations, or create your own custom prompts. Articulate adapts to whatever speaking challenge you\'re working on.'
    },
    {
      q: 'Is this good for non-native English speakers?',
      a: 'Absolutely. Our Fluency Coach agent is designed specifically for ESL speakers, helping with pacing, pronunciation, and natural phrasing in English.'
    },
    {
      q: 'How much does it cost?',
      a: 'Founder pricing is $10/month, locked forever for early supporters. After launch, the price increases to $20/month. Founders also get 3 months free at launch.'
    }
  ]

  return (
    <main className="min-h-screen bg-bg-0 overflow-x-hidden">
      {/* ===== RECENT SIGNUP TOAST ===== */}
      {recentSignup && (
        <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto z-[60] animate-slide-up">
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-2/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-text-2">{recentSignup}</span>
          </div>
        </div>
      )}

      {/* ===== MOBILE MENU DRAWER ===== */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <nav
          className={`absolute top-0 right-0 bottom-0 w-[280px] max-w-[80vw] bg-bg-1 border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="text-lg font-semibold text-text-1">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-bg-2 text-text-2 hover:text-text-1 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
            {[
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'Speech Receipt', id: 'receipt-section' },
              { label: 'AI Agents', id: 'agents-section' },
              { label: 'FAQ', id: 'faq-section' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-4 py-3.5 text-base text-text-2 hover:text-text-1 hover:bg-bg-2 rounded-xl transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Drawer CTA */}
          <div className="px-5 pb-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}>
            <button
              onClick={() => scrollTo('waitlist')}
              className="w-full h-14 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors"
            >
              Claim Your Spot
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* ===== STICKY HEADER ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled
            ? 'bg-bg-1/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/10'
            : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <nav className="h-[72px] flex items-center justify-between px-5 md:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 -ml-1 p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label="Articulate - Go to top"
          >
            <div className="w-9 h-9 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z" fill="url(#logoGrad)" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-text-1 tracking-tight">Articulate</span>
          </button>

          {/* Desktop Nav Links - Centered pill container */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1.5 bg-white/5 border border-white/10 rounded-full">
            {[
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'Features', id: 'receipt-section' },
              { label: 'AI Agents', id: 'agents-section' },
              { label: 'FAQ', id: 'faq-section' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 text-sm font-medium text-text-2 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('waitlist')}
            className="hidden md:flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-accent to-purple-500 hover:from-purple-500 hover:to-accent text-white rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300"
          >
            Claim Your Spot
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-text-1 hover:bg-white/15 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        className="mobile-section-padding pt-[100px] md:pt-[120px] pb-12 md:pb-20"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Copy Column */}
            <div className="space-y-6 md:space-y-7">
              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-warning/10 border border-warning/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
                </span>
                <span className="text-xs font-medium text-warning">{spotsRemaining} founder spots left</span>
              </div>

              {/* H1 - Fluid Typography */}
              <h1
                id="hero-heading"
                className="font-semibold tracking-tight leading-[1.08]"
                style={{ fontSize: 'clamp(2rem, 7vw, 3.75rem)' }}
              >
                <span className="block text-text-1">Know exactly why you</span>
                <span className="block text-text-1">sound unsure.</span>
                <span className="block text-gradient mt-1">Fix it in 60 seconds.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-mobile-body md:text-lg text-text-2 leading-relaxed max-w-lg">
                Record a 60-second answer. Get your Speech Receipt — clarity score, filler words, pace, and your #1 fix. Redo it. Compare. Walk in confident.
              </p>

              {/* Founder's Benefits */}
              <div className="p-4 md:p-5 bg-bg-2/50 rounded-xl border border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg" aria-hidden="true">🌟</span>
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Founder's Access</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                  {['3 months free at launch', '$10/mo locked forever', 'All AI agents included', 'Priority feature requests'].map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-2">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-sm">
                  <span className="text-text-3">After founder spots fill:</span>
                  <span>
                    <span className="text-text-3 line-through mr-1.5">$10</span>
                    <span className="text-text-1 font-semibold">$20/mo</span>
                  </span>
                </div>
              </div>

              {/* Waitlist Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="hero-email" className="sr-only">Email address</label>
                <input
                  id="hero-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-[52px] px-4 bg-bg-2 border border-white/10 rounded-xl text-base text-text-1 placeholder:text-text-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[52px] flex items-center justify-center gap-2 bg-gradient-to-b from-accent to-accent-dark hover:from-accent-dark hover:to-accent-dark text-white font-semibold rounded-xl shadow-btn-primary hover:shadow-btn-primary-hover transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Claiming...
                    </span>
                  ) : (
                    "Claim Founder's Pricing"
                  )}
                </button>

                {/* Progress */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-1.5 bg-bg-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-warning rounded-full transition-all duration-500"
                      style={{ width: `${percentageFilled}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-2">
                    <span>{currentSignups} founders joined</span>
                    <span className="text-warning font-medium">{spotsRemaining} spots left</span>
                  </div>
                </div>
              </form>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-text-2">
                {['No credit card', 'Cancel anytime', 'Summer 2025'].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Speech Receipt Mockup */}
            <div className="relative mt-4 lg:mt-0">
              <div className="absolute -inset-8 bg-accent/10 blur-[60px] rounded-full pointer-events-none" aria-hidden="true" />
              <div className="relative bg-bg-2 rounded-2xl border border-white/10 shadow-elevation-3 overflow-hidden max-w-md mx-auto lg:max-w-none">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-text-1 tracking-wide">SPEECH RECEIPT</span>
                  <span className="text-lg">📋</span>
                </div>
                <div className="p-5 space-y-4 font-mono text-sm">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-text-2">CLARITY SCORE</span>
                      <span className="text-text-1 font-semibold">72/100</span>
                    </div>
                    <div className="h-2 bg-bg-3 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-accent to-cyan rounded-full" />
                    </div>
                  </div>
                  <div className="py-3 border-t border-dashed border-white/10">
                    <div className="flex justify-between mb-1">
                      <span className="text-text-2">FILLER WORDS</span>
                      <span className="text-warning font-semibold">7</span>
                    </div>
                    <p className="text-text-3 text-xs">"um" (3) · "like" (2) · "you know" (2)</p>
                  </div>
                  <div className="py-3 border-t border-dashed border-white/10">
                    <div className="flex justify-between mb-1">
                      <span className="text-text-2">PACE</span>
                      <span className="text-cyan font-semibold">Rushed</span>
                    </div>
                    <p className="text-text-3 text-xs">142 wpm (ideal: 120–140)</p>
                  </div>
                  <div className="py-3 border-t border-dashed border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent">⚡</span>
                      <span className="text-text-1 font-semibold">TOP FIX</span>
                    </div>
                    <p className="text-text-2 text-sm font-sans leading-relaxed">
                      Lead with your answer, then add context.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2 py-3 bg-accent/10 rounded-lg text-accent font-sans font-semibold">
                      ✨ REDO AVAILABLE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="mobile-section-padding py-16 md:py-24 bg-bg-1 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-mobile-h2 md:text-3xl lg:text-4xl font-semibold tracking-tight text-center mb-10 md:mb-14">
            60 seconds to know exactly what to fix
          </h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              { icon: '📋', step: '01', title: 'Pick your scenario', desc: 'Interview, pitch, standup — choose what you\'re preparing for.' },
              { icon: '🎤', step: '02', title: 'Record 60 seconds', desc: 'Speak naturally. No scripts. AI analyzes as you talk.' },
              { icon: '📊', step: '03', title: 'Get your receipt', desc: 'Clarity score, fillers, pace, and your #1 fix.' }
            ].map((item) => (
              <article key={item.step} className="p-5 md:p-6 bg-bg-2 rounded-xl border border-white/10">
                <div className="text-2xl md:text-3xl mb-3">{item.icon}</div>
                <div className="text-xs font-mono text-accent mb-1">{item.step}</div>
                <h3 className="text-base md:text-lg font-semibold text-text-1 mb-2">{item.title}</h3>
                <p className="text-sm text-text-2 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECEIPT DEEP DIVE ===== */}
      <section id="receipt-section" className="mobile-section-padding py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-5">
              <h2 className="text-mobile-h2 md:text-3xl lg:text-4xl font-semibold tracking-tight">
                Not vague advice.<br /><span className="text-gradient">A receipt.</span>
              </h2>
              <p className="text-mobile-body md:text-lg text-text-2 leading-relaxed">
                See exactly what's costing you credibility — and fix it in your next take.
              </p>
              <ul className="space-y-3">
                {[
                  { l: 'Clarity Score', d: 'How clear your message is' },
                  { l: 'Filler Words', d: 'Every "um" and "like" counted' },
                  { l: 'Pace Analysis', d: 'Rushing or dragging?' },
                  { l: 'Top Fix', d: 'One change for instant improvement' },
                  { l: 'Redo & Compare', d: 'See your score jump' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base">
                      <span className="text-text-1 font-medium">{item.l}</span>
                      <span className="text-text-2"> — {item.d}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Before/After */}
            <div className="space-y-4">
              <div className="p-4 md:p-5 bg-bg-2 rounded-xl border-l-4 border-l-warning">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-warning uppercase">First Take</span>
                  <span className="text-xl font-bold text-warning">58</span>
                </div>
                <p className="text-sm text-text-3 italic leading-relaxed">
                  "So basically, um, I think I'm a good fit because, like, I've done similar work..."
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-9 h-9 rounded-full bg-bg-3 border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              <div className="p-4 md:p-5 bg-bg-2 rounded-xl border-l-4 border-l-success relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-success uppercase">After Redo</span>
                  <span className="text-xl font-bold text-success">84</span>
                </div>
                <p className="text-sm text-text-2 leading-relaxed">
                  "I'm a strong fit because I've led three similar projects and increased retention by 40%."
                </p>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-success/20 border border-success/30 rounded-lg px-2 py-1 text-success font-bold text-sm">
                  +26
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI AGENTS ===== */}
      <section id="agents-section" className="mobile-section-padding py-16 md:py-24 bg-bg-1 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-mobile-h2 md:text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
              Practice with AI that challenges you
            </h2>
            <p className="text-mobile-body md:text-lg text-text-2 max-w-2xl mx-auto">
              Real conversations have pressure. Our agents simulate it.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: '🎯', title: 'The Interviewer', ex: '"Tell me about a time you failed."', desc: 'Behavioral questions. Tough follow-ups.', color: 'bg-accent/10' },
              { icon: '💼', title: 'The Exec', ex: '"Walk me through the numbers."', desc: 'Stakeholder pressure. Hard questions.', color: 'bg-cyan/10' },
              { icon: '🌍', title: 'The Fluency Coach', ex: '"Let\'s work on pacing."', desc: 'For non-native speakers. Natural English.', color: 'bg-success/10' },
              { icon: '💪', title: 'The Confidence Coach', ex: '"You\'ve got this."', desc: 'Low-pressure practice. Build reps.', color: 'bg-warning/10' }
            ].map((a) => (
              <article key={a.title} className="p-4 md:p-5 bg-bg-2 rounded-xl border border-white/10">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${a.color}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-text-1 mb-0.5">{a.title}</h3>
                    <p className="text-sm text-accent italic mb-1.5">{a.ex}</p>
                    <p className="text-sm text-text-2">{a.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="mobile-section-padding py-12 md:py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-4xl font-bold text-gradient mb-1">{currentSignups}+</div>
              <div className="text-xs md:text-sm text-text-2">founders joined</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-gradient mb-1">60s</div>
              <div className="text-xs md:text-sm text-text-2">to get feedback</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-gradient mb-1">+26</div>
              <div className="text-xs md:text-sm text-text-2">avg improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="waitlist" className="mobile-section-padding py-16 md:py-24 relative scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-accent/15 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-warning/10 border border-warning/20 rounded-full mb-6">
            <span className="text-warning">⚠</span>
            <span className="text-sm text-warning font-medium">{spotsRemaining} spots left at $10/mo</span>
          </div>
          <h2 className="text-mobile-h2 md:text-3xl lg:text-4xl font-semibold tracking-tight mb-4">
            Stop rehearsing in your head.<br /><span className="text-gradient">Start getting receipts.</span>
          </h2>

          {/* Comparison */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-left">
            <div className="p-4 bg-bg-2/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-xs font-medium text-text-3">Without</span>
              </div>
              <ul className="space-y-1.5 text-xs text-text-3">
                <li>Practice in your head</li>
                <li>No idea how you sound</li>
                <li>Same mistakes on repeat</li>
              </ul>
            </div>
            <div className="p-4 bg-accent/5 rounded-xl border border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium text-accent">With Articulate</span>
              </div>
              <ul className="space-y-1.5 text-xs text-text-2">
                <li>See your exact score</li>
                <li>Know your filler words</li>
                <li>Fix your #1 issue</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="cta-email" className="sr-only">Email address</label>
            <input
              id="cta-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full h-[52px] px-4 bg-bg-2 border border-white/10 rounded-xl text-base text-text-1 placeholder:text-text-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[52px] flex items-center justify-center gap-2 bg-gradient-to-b from-accent to-accent-dark text-white font-semibold rounded-xl shadow-btn-primary transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Claiming...' : "Claim Founder's Pricing"}
            </button>
          </form>
          <p className="text-sm text-text-2 mt-4">
            3 months free + $10/mo forever. No credit card now.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq-section" className="mobile-section-padding py-16 md:py-24 bg-bg-1 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-mobile-h2 md:text-3xl lg:text-4xl font-semibold tracking-tight text-center mb-8 md:mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-bg-2 rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-inset"
                  aria-expanded={openFaqIndex === i}
                >
                  <span className="text-base font-medium text-text-1">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-text-3 flex-shrink-0 transition-transform duration-200 ${openFaqIndex === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${openFaqIndex === i ? 'max-h-96' : 'max-h-0'}`}
                >
                  <p className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-text-2 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="mobile-section-padding py-12 md:py-16 border-t border-white/5 bg-bg-0"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 48px)' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Brand + CTA */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <path d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z" fill="url(#footerLogo)" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-semibold text-text-1">Articulate</span>
                <p className="text-sm text-text-3">Speak with clarity.</p>
              </div>
            </div>
            <button
              onClick={() => scrollTo('waitlist')}
              className="w-full md:w-auto h-12 px-6 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors"
            >
              Claim Your Spot →
            </button>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-sm font-semibold text-text-1 mb-3">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => scrollTo('how-it-works')} className="text-text-3 hover:text-accent transition-colors">How It Works</button></li>
                <li><button onClick={() => scrollTo('receipt-section')} className="text-text-3 hover:text-accent transition-colors">Speech Receipt</button></li>
                <li><button onClick={() => scrollTo('agents-section')} className="text-text-3 hover:text-accent transition-colors">AI Agents</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-1 mb-3">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="mailto:hello@articulatespeech.ai" className="text-text-3 hover:text-accent transition-colors">Contact</a></li>
                <li><a href="mailto:support@articulatespeech.ai" className="text-text-3 hover:text-accent transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-1 mb-3">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/privacy" className="text-text-3 hover:text-accent transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-text-3 hover:text-accent transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-1 mb-3">Connect</h4>
              <div className="flex gap-4">
                <a href="https://twitter.com/ArticulateSpeech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-bg-2 text-text-3 hover:text-accent transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://linkedin.com/company/articulate-speech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-bg-2 text-text-3 hover:text-accent transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-text-3">© {new Date().getFullYear()} Articulate Speech, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
