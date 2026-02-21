'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Waitlist config - replace with real data from your backend
  const TOTAL_FOUNDER_SPOTS = 500
  const [currentSignups] = useState(347)
  const spotsRemaining = TOTAL_FOUNDER_SPOTS - currentSignups
  const percentageFilled = (currentSignups / TOTAL_FOUNDER_SPOTS) * 100

  // Recent signup animation
  const [recentSignup, setRecentSignup] = useState<string | null>(null)
  const recentNames = ['Sarah K.', 'Mike T.', 'Priya R.', 'James L.', 'Emma W.', 'David C.', 'Lisa M.']

  // Handle scroll for banner collapse
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Recent signup notifications
  useEffect(() => {
    const showNotification = () => {
      const randomName = recentNames[Math.floor(Math.random() * recentNames.length)]
      const randomMinutes = Math.floor(Math.random() * 5) + 1
      setRecentSignup(`${randomName} joined ${randomMinutes}m ago`)
      setTimeout(() => setRecentSignup(null), 4000)
    }
    const initialTimeout = setTimeout(showNotification, 8000)
    const interval = setInterval(showNotification, 25000)
    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/thank-you?email=${encodeURIComponent(email)}`)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Calculate header height for scroll offset
  const headerHeight = bannerDismissed || hasScrolled ? 64 : 108

  return (
    <main className="min-h-screen bg-bg-0 noise-overlay">
      {/* Recent Signup Toast */}
      {recentSignup && (
        <div className="fixed bottom-6 left-6 z-[60] animate-slide-up">
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-2 border border-white/[0.08] rounded-xl shadow-elevation-2 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-text-2">{recentSignup}</span>
          </div>
        </div>
      )}

      {/* ===== STICKY HEADER STACK ===== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement Banner - Collapses on scroll */}
        <div
          className={`bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border-b border-accent/20 transition-all duration-300 overflow-hidden ${
            bannerDismissed || hasScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
          }`}
          role="banner"
          aria-label="Promotional announcement"
        >
          <div className="max-w-7xl mx-auto px-6 py-2.5">
            <div className="flex items-center justify-center gap-4">
              <p className="text-sm text-center">
                <span className="font-medium text-accent">
                  🔥 Only {spotsRemaining} founder spots left
                </span>
                <span className="hidden sm:inline text-text-3 mx-3">·</span>
                <span className="hidden sm:inline text-text-2">
                  Lock in <strong className="text-text-1">$10/mo forever</strong> — price doubles after launch
                </span>
              </p>
              <button
                onClick={() => setBannerDismissed(true)}
                className="p-1 text-text-3 hover:text-text-1 transition-colors flex-shrink-0"
                aria-label="Dismiss announcement"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className="bg-bg-0/95 backdrop-blur-xl border-b border-white/[0.06]"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo - Clickable, scrolls to top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg p-1 -ml-1"
                aria-label="Articulate Speech - Go to top"
              >
                <div className="w-8 h-8 relative flex-shrink-0">
                  {/* Inline SVG logo - replace with <Image src="/logo.svg" /> when you have the file */}
                  <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#A78BFA' }} />
                        <stop offset="100%" style={{ stopColor: '#8B5CF6' }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z"
                      fill="url(#navLogoGradient)"
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-text-1 tracking-tight">Articulate</span>
              </button>

              {/* CTA Button */}
              <button
                onClick={scrollToWaitlist}
                className="px-5 py-2.5 text-sm font-medium bg-accent hover:bg-accent-dark text-white rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
              >
                Claim Your Spot
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 glow-hero overflow-hidden scroll-mt-28"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Copy */}
            <div className="space-y-7">
              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-warning/10 border border-warning/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
                </span>
                <span className="text-xs font-medium text-warning">
                  {spotsRemaining} founder spots remaining
                </span>
              </div>

              {/* H1 Headline - ONLY H1 on page */}
              <h1
                id="hero-heading"
                className="text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] font-semibold tracking-[-0.035em] leading-[1.1]"
              >
                <span className="block text-text-1">Know exactly why you</span>
                <span className="block text-text-1">sound unsure.</span>
                <span className="block text-gradient mt-1">Fix it in 60 seconds.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-text-2 leading-relaxed max-w-lg">
                Record a 60-second answer. Get your Speech Receipt — clarity score, filler words, pace,
                and your #1 fix. Redo it. Compare. Walk in confident.
              </p>

              {/* Founder's Benefits Box */}
              <div className="p-5 bg-bg-2/50 rounded-xl border border-accent/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg" aria-hidden="true">🌟</span>
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Founder's Access</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    '3 months free at launch',
                    '$10/mo locked forever',
                    'All AI agents included',
                    'Priority feature requests'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-2">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-text-3">After founder spots fill:</span>
                  <span className="text-sm">
                    <span className="text-text-3 line-through mr-2">$10/mo</span>
                    <span className="text-text-1 font-semibold">$20/mo</span>
                  </span>
                </div>
              </div>

              {/* Waitlist Form */}
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="hero-email" className="sr-only">Email address</label>
                  <input
                    id="hero-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="flex-1 px-5 py-4 bg-bg-2 border border-white/10 rounded-xl text-text-1 placeholder:text-text-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-8 py-4 text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Claiming...' : "Claim Founder's Pricing"}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-2 bg-bg-3 rounded-full overflow-hidden" role="progressbar" aria-valuenow={percentageFilled} aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className="h-full bg-gradient-to-r from-accent to-warning rounded-full transition-all duration-1000"
                      style={{ width: `${percentageFilled}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-3">
                    <span>{currentSignups} founders have joined</span>
                    <span className="text-warning font-medium">{spotsRemaining} spots left</span>
                  </div>
                </div>
              </form>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-3">
                {[
                  'No credit card required',
                  'Cancel anytime',
                  'Launching Summer 2025'
                ].map((text, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Speech Receipt Mockup */}
            <div className="relative lg:pl-8">
              <div className="absolute -inset-12 bg-accent/10 blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />

              <div className="relative bg-bg-2 rounded-2xl border border-white/[0.08] shadow-elevation-3 overflow-hidden">
                {/* Receipt Header */}
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-text-1 tracking-wide">SPEECH RECEIPT</span>
                  <span className="text-lg" aria-hidden="true">📋</span>
                </div>

                {/* Receipt Content */}
                <div className="p-6 space-y-5 font-mono text-sm">
                  {/* Clarity Score */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-text-2">CLARITY SCORE</span>
                      <span className="text-text-1 font-semibold">72/100</span>
                    </div>
                    <div className="h-2 bg-bg-3 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-accent to-cyan rounded-full" />
                    </div>
                  </div>

                  {/* Filler Words */}
                  <div className="py-4 border-t border-dashed border-white/[0.06]">
                    <div className="flex justify-between mb-2">
                      <span className="text-text-2">FILLER WORDS</span>
                      <span className="text-warning font-semibold">7</span>
                    </div>
                    <p className="text-text-3 text-xs">"um" (3) · "like" (2) · "you know" (2)</p>
                  </div>

                  {/* Pace */}
                  <div className="py-4 border-t border-dashed border-white/[0.06]">
                    <div className="flex justify-between mb-2">
                      <span className="text-text-2">PACE</span>
                      <span className="text-cyan font-semibold">Slightly rushed</span>
                    </div>
                    <p className="text-text-3 text-xs">142 wpm (ideal: 120–140)</p>
                  </div>

                  {/* Top Fix */}
                  <div className="py-4 border-t border-dashed border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-accent" aria-hidden="true">⚡</span>
                      <span className="text-text-1 font-semibold">TOP FIX</span>
                    </div>
                    <p className="text-text-2 leading-relaxed font-sans">
                      Your opening took 18 seconds before reaching your point. Lead with your answer, then add context.
                    </p>
                  </div>

                  {/* Redo CTA */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-center gap-2 py-3 bg-accent/10 rounded-lg text-accent">
                      <span aria-hidden="true">✨</span>
                      <span className="font-semibold font-sans">REDO AVAILABLE</span>
                    </div>
                    <p className="text-center text-text-3 text-xs mt-2 font-sans">Apply the fix. Record again. Compare.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="section-base section-elevated glow-divider scroll-mt-20" aria-labelledby="how-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 id="how-heading" className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              60 seconds to know exactly what to fix
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: '📋',
                step: '01',
                title: 'Pick your scenario',
                desc: 'Interview question, client pitch, team standup — choose what you\'re preparing for.'
              },
              {
                icon: '🎤',
                step: '02',
                title: 'Record for 60 seconds',
                desc: 'Speak naturally. No scripts. The AI analyzes as you talk.'
              },
              {
                icon: '📊',
                step: '03',
                title: 'Get your Speech Receipt',
                desc: 'Clarity score, filler words, pace, and your single biggest fix. Redo and watch your score climb.'
              }
            ].map((item) => (
              <article key={item.step} className="card p-7 h-full">
                <div className="text-3xl mb-5" aria-hidden="true">{item.icon}</div>
                <div className="text-xs font-mono text-accent mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold mb-3 text-text-1">{item.title}</h3>
                <p className="text-text-2 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPEECH RECEIPT DEEP DIVE ===== */}
      <section className="section-base scroll-mt-20" aria-labelledby="receipt-heading">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 id="receipt-heading" className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Not vague advice.<br />
                <span className="text-gradient">A receipt.</span>
              </h2>
              <p className="text-lg text-text-2 leading-relaxed">
                See exactly what's costing you credibility — and fix it in your next take.
              </p>

              <ul className="space-y-4 pt-2">
                {[
                  { label: 'Clarity Score', desc: 'How clear and coherent your message is' },
                  { label: 'Filler Words', desc: 'Every "um", "like", and "you know" counted' },
                  { label: 'Pace Analysis', desc: 'Are you rushing or dragging?' },
                  { label: 'Top Fix', desc: 'The one change for instant improvement' },
                  { label: 'Redo & Compare', desc: 'Apply the fix and see your score jump' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>
                      <span className="text-text-1 font-medium">{item.label}</span>
                      <span className="text-text-3"> — {item.desc}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Before/After Visual */}
            <div className="relative">
              <div className="absolute -inset-8 bg-cyan/5 blur-[60px] rounded-full pointer-events-none" aria-hidden="true" />

              <div className="relative space-y-4">
                {/* Before */}
                <div className="card p-6 border-l-4 border-l-warning">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-warning uppercase tracking-wider">First Take</span>
                    <span className="text-2xl font-bold text-warning">58</span>
                  </div>
                  <p className="text-sm text-text-3 italic">
                    "So basically, um, I think the reason I'm a good fit is, like, you know, I've done similar work before and, um..."
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center" aria-hidden="true">
                  <div className="w-10 h-10 rounded-full bg-bg-3 border border-white/[0.08] flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* After */}
                <div className="card p-6 border-l-4 border-l-success">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-success uppercase tracking-wider">After Redo</span>
                    <span className="text-2xl font-bold text-success">84</span>
                  </div>
                  <p className="text-sm text-text-2">
                    "I'm a strong fit because I've led three similar projects. At my current role, I increased retention by 40%. I built the exact system you're describing."
                  </p>
                </div>

                {/* Improvement Badge */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-success/20 border border-success/30 rounded-xl px-3 py-2">
                  <span className="text-success font-bold">+26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI PRACTICE AGENTS ===== */}
      <section className="section-base section-elevated glow-divider scroll-mt-20" aria-labelledby="agents-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-14">
            <h2 id="agents-heading" className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Practice with AI that challenges you
            </h2>
            <p className="text-lg text-text-2 max-w-2xl mx-auto">
              Real conversations have pressure. Our agents simulate it so nothing catches you off guard.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: '🎯',
                title: 'The Interviewer',
                example: '"Tell me about a time you failed."',
                desc: 'Behavioral questions. Tough follow-ups. Interview pressure without the stakes.',
                colorClass: 'bg-accent/10'
              },
              {
                icon: '💼',
                title: 'The Exec',
                example: '"Walk me through your numbers."',
                desc: 'Stakeholder energy. Hard questions. Learn to hold your ground.',
                colorClass: 'bg-cyan/10'
              },
              {
                icon: '🌍',
                title: 'The Fluency Coach',
                example: '"Let\'s work on your pacing."',
                desc: 'For non-native speakers. Pronunciation, rhythm, natural English.',
                colorClass: 'bg-success/10'
              },
              {
                icon: '💪',
                title: 'The Confidence Coach',
                example: '"You\'ve got this. One more try."',
                desc: 'Low-pressure practice. Build reps. Overcome speaking anxiety.',
                colorClass: 'bg-warning/10'
              }
            ].map((agent) => (
              <article key={agent.title} className="card card-hover p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${agent.colorClass}`}>
                    <span aria-hidden="true">{agent.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 text-text-1">{agent.title}</h3>
                    <p className="text-sm text-accent italic mb-2">{agent.example}</p>
                    <p className="text-sm text-text-2">{agent.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF STATS ===== */}
      <section className="py-16 px-6 border-y border-white/[0.05]" aria-label="Statistics">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">{currentSignups}+</div>
              <div className="text-sm text-text-3">founders on the waitlist</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">60 sec</div>
              <div className="text-sm text-text-3">to get actionable feedback</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">+26 pts</div>
              <div className="text-sm text-text-3">average score improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="waitlist" className="section-base relative overflow-hidden scroll-mt-20" aria-labelledby="cta-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/15 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full mb-8">
            <span className="text-warning" aria-hidden="true">⚠</span>
            <span className="text-sm text-warning font-medium">
              Only {spotsRemaining} founder spots left at $10/mo
            </span>
          </div>

          <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            Stop rehearsing in your head.<br />
            <span className="text-gradient">Start getting receipts.</span>
          </h2>

          {/* Without vs With */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-xl mx-auto">
            <div className="p-5 bg-bg-2/30 rounded-xl border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm font-medium text-text-3">Without Articulate</span>
              </div>
              <ul className="space-y-2 text-sm text-text-3">
                <li>Practice in your head</li>
                <li>No idea how you sound</li>
                <li>Same mistakes on repeat</li>
                <li>Walk in hoping for the best</li>
              </ul>
            </div>

            <div className="p-5 bg-accent/5 rounded-xl border border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-accent">With Articulate</span>
              </div>
              <ul className="space-y-2 text-sm text-text-2">
                <li>See your exact score</li>
                <li>Know your filler words</li>
                <li>Fix your #1 issue each time</li>
                <li>Walk in confident</li>
              </ul>
            </div>
          </div>

          {/* Final Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="cta-email" className="sr-only">Email address</label>
                <input
                  id="cta-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="flex-1 px-5 py-4 bg-bg-2 border border-white/10 rounded-xl text-text-1 placeholder:text-text-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-8 py-4 text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Claiming...' : "Claim Founder's Pricing"}
                </button>
              </div>
            </form>

            <p className="text-sm text-text-3 mt-4">
              Join {currentSignups} founders. <span className="text-text-2">3 months free</span> + <span className="text-text-2">$10/mo forever</span>. No credit card now.
            </p>

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="text-xs text-text-3">
                🔒 After founder spots fill: <span className="line-through">$10/mo</span> → <span className="text-text-2">$20/mo</span> with no free trial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 px-6 border-t border-border-subtle bg-bg-1" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 relative flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#A78BFA' }} />
                        <stop offset="100%" style={{ stopColor: '#8B5CF6' }} />
                      </linearGradient>
                    </defs>
                    <path d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z" fill="url(#footerLogoGradient)" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-text-1">Articulate</span>
              </div>
              <p className="text-sm text-text-3 mb-6">
                Speak with clarity.<br />Lead with confidence.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a href="https://twitter.com/ArticulateSpeech" target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-accent transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/articulate-speech" target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-accent transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-sm font-semibold text-text-1 mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-text-3 hover:text-accent transition-colors">How It Works</button></li>
                <li><button onClick={() => document.getElementById('receipt-heading')?.scrollIntoView({ behavior: 'smooth' })} className="text-text-3 hover:text-accent transition-colors">Speech Receipt</button></li>
                <li><button onClick={() => document.getElementById('agents-heading')?.scrollIntoView({ behavior: 'smooth' })} className="text-text-3 hover:text-accent transition-colors">AI Agents</button></li>
                <li><button onClick={scrollToWaitlist} className="text-text-3 hover:text-accent transition-colors">Pricing</button></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-semibold text-text-1 mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="mailto:hello@articulatespeech.ai" className="text-text-3 hover:text-accent transition-colors">Contact</a></li>
                <li><a href="mailto:support@articulatespeech.ai" className="text-text-3 hover:text-accent transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-semibold text-text-1 mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="text-text-3 hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-text-3 hover:text-accent transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Mini Waitlist CTA */}
          <div className="py-8 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-2">
                Ready to speak with confidence? Join the waitlist.
              </p>
              <button
                onClick={scrollToWaitlist}
                className="px-6 py-2.5 text-sm font-medium bg-accent hover:bg-accent-dark text-white rounded-xl transition-all"
              >
                Claim Your Spot →
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/[0.06] text-center">
            <p className="text-xs text-text-3">
              © {new Date().getFullYear()} Articulate Speech, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
