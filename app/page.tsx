'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Waitlist config - replace with real data from your backend
  const TOTAL_FOUNDER_SPOTS = 500
  const [currentSignups] = useState(347) // Replace with real count
  const spotsRemaining = TOTAL_FOUNDER_SPOTS - currentSignups
  const percentageFilled = (currentSignups / TOTAL_FOUNDER_SPOTS) * 100

  // Recent signup animation
  const [recentSignup, setRecentSignup] = useState<string | null>(null)
  const recentNames = ['Sarah K.', 'Mike T.', 'Priya R.', 'James L.', 'Emma W.', 'David C.', 'Lisa M.']

  useEffect(() => {
    // Show a "recent signup" notification every 15-30 seconds
    const showNotification = () => {
      const randomName = recentNames[Math.floor(Math.random() * recentNames.length)]
      const randomMinutes = Math.floor(Math.random() * 5) + 1
      setRecentSignup(`${randomName} joined ${randomMinutes}m ago`)
      setTimeout(() => setRecentSignup(null), 4000)
    }

    // Initial delay
    const initialTimeout = setTimeout(showNotification, 5000)

    // Recurring
    const interval = setInterval(() => {
      showNotification()
    }, Math.random() * 15000 + 15000) // 15-30 seconds

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Replace with actual API call to your waitlist service
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/thank-you?email=${encodeURIComponent(email)}`)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-bg-0 noise-overlay">
      {/* Recent Signup Notification */}
      {recentSignup && (
        <div className="fixed bottom-6 left-6 z-50 animate-slide-up">
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-2 border border-white/[0.08] rounded-xl shadow-elevation-2">
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-success text-sm">&#10003;</span>
            </div>
            <span className="text-sm text-text-2">{recentSignup}</span>
          </div>
        </div>
      )}

      {/* Sticky Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Founder's Pricing Banner */}
        <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border-b border-accent/20">
          <div className="max-w-7xl mx-auto px-6 py-2.5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
              <span className="text-sm font-medium text-accent">
                &#128293; Founder's Pricing: Only {spotsRemaining} of {TOTAL_FOUNDER_SPOTS} spots left
              </span>
              <span className="hidden sm:inline text-text-3">|</span>
              <span className="text-sm text-text-2">
                Lock in <span className="text-text-1 font-semibold">$10/mo forever</span> — price doubles at launch
              </span>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="bg-bg-0/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#E8EAED', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#8892A0', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z"
                    fill="url(#logoGradient)"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold text-text-1 tracking-tight">Articulate</span>
            </div>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 text-sm font-medium bg-accent hover:bg-accent-dark text-white rounded-xl transition-all duration-200"
            >
              Claim Your Spot
            </button>
          </div>
        </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-32 px-6 glow-hero overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
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

              {/* Headline */}
              <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-semibold tracking-[-0.035em] leading-[1.08]">
                <span className="block text-text-1">Stop fumbling through</span>
                <span className="block text-text-1">interviews.</span>
                <span className="block text-gradient mt-2">Get your Speech Receipt.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-text-2 leading-relaxed max-w-lg">
                Record a 60-second answer. Get scored on clarity, pace, and filler words.
                Fix your #1 issue. Redo it. Walk in confident.
              </p>

              {/* What You Get - Founder's Edition */}
              <div className="p-5 bg-bg-2/50 rounded-xl border border-accent/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">&#127775;</span>
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Founder's Access Includes</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-success">&#10003;</span>
                    <span className="text-text-2">3 months free at launch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">&#10003;</span>
                    <span className="text-text-2">$10/mo locked forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">&#10003;</span>
                    <span className="text-text-2">All AI agents included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">&#10003;</span>
                    <span className="text-text-2">Priority feature requests</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-text-3">After founder's pricing ends:</span>
                  <span className="text-sm">
                    <span className="text-text-3 line-through">$10/mo</span>
                    <span className="text-text-1 font-semibold ml-2">$20/mo</span>
                  </span>
                </div>
              </div>

              {/* Waitlist Form */}
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-4 bg-bg-2 border border-white/10 rounded-xl text-text-1 placeholder:text-text-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-8 py-4 text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Claiming...' : 'Claim Founder\'s Pricing'}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="h-2 bg-bg-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-warning rounded-full transition-all duration-1000"
                      style={{ width: `${percentageFilled}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-3">
                    <span>{currentSignups} founders joined</span>
                    <span className="text-warning font-medium">{spotsRemaining} spots left</span>
                  </div>
                </div>
              </form>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-3">
                <span className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span>
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span>
                  Cancel anytime
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span>
                  Launch: March 2025
                </span>
              </div>
            </div>

            {/* Right: Speech Receipt Mockup */}
            <div className="relative">
              {/* Ambient glow */}
              <div className="absolute -inset-12 bg-accent/10 blur-[80px] rounded-full pointer-events-none"></div>

              {/* Speech Receipt Card */}
              <div className="relative bg-bg-2 rounded-2xl border border-white/[0.08] shadow-elevation-3 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-text-1 tracking-wide">SPEECH RECEIPT</span>
                  <span className="text-lg">&#128203;</span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5 font-mono text-sm">
                  {/* Clarity Score */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-text-2">CLARITY SCORE</span>
                      <span className="text-text-1 font-semibold">72/100</span>
                    </div>
                    <div className="h-2 bg-bg-3 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-accent to-cyan rounded-full"></div>
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
                    <p className="text-text-3 text-xs">142 words/min (ideal: 120-140)</p>
                  </div>

                  {/* Top Fix */}
                  <div className="py-4 border-t border-dashed border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-accent">&#9889;</span>
                      <span className="text-text-1 font-semibold">TOP FIX</span>
                    </div>
                    <p className="text-text-2 leading-relaxed">
                      Your opening took 18 seconds before reaching your main point. Lead with your answer, then add context.
                    </p>
                  </div>

                  {/* Redo CTA */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-center gap-2 py-3 bg-accent/10 rounded-lg text-accent">
                      <span>&#10024;</span>
                      <span className="font-semibold">REDO AVAILABLE</span>
                    </div>
                    <p className="text-center text-text-3 text-xs mt-2">Apply the fix. Record again. Compare.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-base section-elevated glow-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 lg:text-h1 tracking-tight">
              Three steps. Sixty seconds. Real improvement.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '&#128203;',
                step: '01',
                title: 'Pick a scenario',
                desc: 'Interview question, client pitch, or team standup—choose what you\'re preparing for.'
              },
              {
                icon: '&#127908;',
                step: '02',
                title: 'Record your answer',
                desc: 'Speak naturally for 60 seconds. No scripts. Just you.'
              },
              {
                icon: '&#128202;',
                step: '03',
                title: 'Get your Speech Receipt',
                desc: 'Clarity score. Filler word count. Pace analysis. Your #1 fix—and a rewritten version to learn from.'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="card p-8 h-full">
                  <div className="text-4xl mb-6" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                  <div className="text-xs font-mono text-accent mb-3">{item.step}</div>
                  <h3 className="text-h4 mb-3 text-text-1">{item.title}</h3>
                  <p className="text-body text-text-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speech Receipt Deep Dive */}
      <section className="section-base">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-6">
              <h2 className="text-h2 lg:text-h1 tracking-tight">
                Not vague advice.<br />
                <span className="text-gradient">A receipt.</span>
              </h2>
              <p className="text-body-lg text-text-2">
                See exactly what's costing you credibility—and fix it in your next take.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { label: 'Clarity Score', desc: 'How clear and coherent your message is' },
                  { label: 'Filler Words', desc: 'Every "um", "like", and "you know" counted' },
                  { label: 'Pace Analysis', desc: 'Are you rushing or dragging?' },
                  { label: 'Top Fix', desc: 'The one thing to change for instant improvement' },
                  { label: 'Redo & Compare', desc: 'Apply the fix, record again, see your score jump' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-sm">&#10003;</span>
                    </div>
                    <div>
                      <span className="text-text-1 font-medium">{item.label}</span>
                      <span className="text-text-3"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-body text-text-2 pt-4 border-t border-white/[0.06]">
                One redo per session. See your score jump in real-time.
              </p>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="absolute -inset-8 bg-cyan/5 blur-[60px] rounded-full pointer-events-none"></div>

              {/* Before/After comparison */}
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
                <div className="flex justify-center">
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
                    "I'm a strong fit because I've led three similar projects. First, at my current role, I increased retention by 40%. Second, I built the exact system you're describing."
                  </p>
                </div>

                {/* Improvement badge */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-success/20 border border-success/30 rounded-xl px-3 py-2">
                  <span className="text-success font-bold">+26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Practice Partners Section */}
      <section className="section-base section-elevated glow-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-h2 lg:text-h1 tracking-tight">
              Practice with AI that pushes back.
            </h2>
            <p className="text-body-lg text-text-2 max-w-2xl mx-auto">
              Real interviews have curveballs. Our AI agents simulate pressure so you're ready for it.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: '&#127919;',
                title: 'The Interviewer',
                example: '"Tell me about a time you failed."',
                desc: 'Behavioral questions. Follow-ups. The pressure of being evaluated.',
                color: 'accent'
              },
              {
                icon: '&#128188;',
                title: 'The Exec',
                example: '"Walk me through the numbers."',
                desc: 'Stakeholder meetings. Tough questions. Learning to hold your ground.',
                color: 'cyan'
              },
              {
                icon: '&#127759;',
                title: 'The Native Speaker',
                example: '"Let\'s slow down your pacing."',
                desc: 'For ESL speakers. Pronunciation. Natural phrasing. Confidence in English.',
                color: 'success'
              },
              {
                icon: '&#128170;',
                title: 'The Confidence Coach',
                example: '"You\'ve got this. Let\'s try again."',
                desc: 'Supportive practice for social anxiety. Low stakes. High reps.',
                color: 'warning'
              }
            ].map((agent) => (
              <div key={agent.title} className="card card-hover p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `var(--${agent.color})`, opacity: 0.15 }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: agent.icon }}></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-h4 mb-2 text-text-1">{agent.title}</h3>
                    <p className="text-sm text-accent italic mb-3">{agent.example}</p>
                    <p className="text-body-sm text-text-2">{agent.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-6 border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">{currentSignups}+</div>
              <div className="text-sm text-text-3">people on the waitlist</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">60 sec</div>
              <div className="text-sm text-text-3">to get actionable feedback</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">+26 pts</div>
              <div className="text-sm text-text-3">average improvement after redo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="section-base relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/15 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Urgency */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full mb-8">
            <span className="text-warning">&#9888;</span>
            <span className="text-sm text-warning font-medium">
              Only {spotsRemaining} founder spots remaining at $10/mo
            </span>
          </div>

          <h2 className="text-h2 lg:text-h1 tracking-tight mb-6">
            Stop rehearsing in your head.<br />
            <span className="text-gradient">Start getting receipts.</span>
          </h2>

          {/* Comparison Table */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-xl mx-auto">
            {/* Without */}
            <div className="p-5 bg-bg-2/30 rounded-xl border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-error">&#10007;</span>
                <span className="text-sm font-medium text-text-3">Without Articulate</span>
              </div>
              <ul className="space-y-2 text-sm text-text-3">
                <li>Practice in your head</li>
                <li>No idea how you actually sound</li>
                <li>Same mistakes on repeat</li>
                <li>Walk in hoping for the best</li>
              </ul>
            </div>

            {/* With */}
            <div className="p-5 bg-accent/5 rounded-xl border border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-success">&#10003;</span>
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
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-4 bg-bg-2 border border-white/10 rounded-xl text-text-1 placeholder:text-text-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-8 py-4 text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Claiming...' : 'Claim Founder\'s Pricing'}
                </button>
              </div>
            </form>

            {/* Final microcopy */}
            <p className="text-sm text-text-3 mt-4">
              Join {currentSignups} others. <span className="text-text-2">3 months free</span> + <span className="text-text-2">$10/mo forever</span>. No credit card now.
            </p>

            {/* What happens after */}
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="text-xs text-text-3">
                &#128274; After founder's spots fill: <span className="line-through">$10/mo</span> → <span className="text-text-2">$20/mo</span> and no free trial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 px-6 border-t border-border-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#E8EAED', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#8892A0', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50 10 L80 85 L65 85 L58 65 L42 65 L35 85 L20 85 Z M50 35 L45 50 L55 50 Z"
                    fill="url(#logoGradientFooter)"
                  />
                </svg>
              </div>
              <span className="text-sm text-text-2">
                Articulate Speech · Built for people who want to be heard.
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-text-3">
              <a href="mailto:support@articulatespeech.ai" className="hover:text-text-1 transition-colors">
                support@articulatespeech.ai
              </a>
              <a href="#" className="hover:text-text-1 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-text-1 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
