# Articulate Speech Website — Setup Guide

## ✅ What's Been Built

A complete, production-ready marketing website with:

- **Hero section** with 5 headline options (select in page.tsx)
- **What is Articulate** — Product explanation + 3-step loop
- **Score System** — 4 scoring pillars with example progress
- **Coaching Examples** — What worked / What to improve / Rewritten sample
- **Progress Tracking** — Streaks + chart visualization
- **Use Cases** — 6 cards (interviews, pitches, students, ESL, etc.)
- **Testimonials** — 3 placeholder testimonials
- **Signup Clarity** — "Try free / Signup to save" messaging
- **Email Capture** — Newsletter signup form (needs service connection)
- **FAQ** — 6 common questions
- **Footer** — Links, branding, social placeholders

## 🎨 Brand Implementation

✅ Colors: #0A0F1A background, #8B5CF6 accent, premium gradients
✅ Logo: Your "A" logo integrated (SVG)
✅ Tone: Calm, premium, confident (no hype)
✅ Responsive: 320px mobile → large desktop
✅ Domain: articulatespeech.ai
✅ CTA: "Try Articulate Free" → https://articulatespeech.vercel.app/

## 🚀 Run the Website

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Content Choices

### Pick Your Headline (line 87 in app/page.tsx)

Current selection:
```tsx
Practice speaking.
Get real feedback.
Build confidence.
```

**Other options:**
1. "Speak with confidence. Practice with purpose."
2. "Stop guessing how you sound. Start improving."
3. "Your feedback loop for better speech."
4. "Clarity starts with feedback."

**To change:** Edit line 87–91 in `app/page.tsx`

### Pick Your Subheadline (line 93 in app/page.tsx)

Current selection:
```
Articulate helps you improve how you speak—with scores, coaching,
and progress tracking. No signup needed to try.
```

**Other options:**
- "Get actionable feedback on your speech. Track your progress. Build the confidence to speak clearly in any situation."
- "Practice any speaking challenge, get scored feedback on content, flow, and delivery—and watch yourself improve over time."

## 📸 Add Real Screenshots

### 1. Hero Section (line 107–125)

Replace the placeholder div with:

```tsx
<div className="relative">
  <Image
    src="/images/hero-mockup.png"
    alt="Articulate Speech Dashboard"
    width={1200}
    height={900}
    className="rounded-2xl border border-white/10"
  />
  <div className="absolute inset-0 bg-accent/10 blur-3xl -z-10 rounded-full"></div>
</div>
```

Add your screenshot to: `/public/images/hero-mockup.png`

**Recommended screenshots:**
- Hero: App dashboard showing scores
- Use actual app screenshots for maximum conversion

### 2. Import Image Component

Add to top of `app/page.tsx`:
```tsx
import Image from 'next/image'
```

## 📧 Connect Email Capture

Currently a placeholder. Connect to your email service:

**In `app/page.tsx` line 18**, replace `handleEmailSubmit`:

### Option 1: ConvertKit
```tsx
const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
        email: email,
      }),
    })

    if (response.ok) {
      setSubmitMessage('Thanks! We\'ll keep you updated.')
      setEmail('')
    } else {
      setSubmitMessage('Something went wrong. Please try again.')
    }
  } catch (error) {
    setSubmitMessage('Error. Please try again.')
  }

  setIsSubmitting(false)
}
```

Add to `.env.local`:
```
NEXT_PUBLIC_CONVERTKIT_API_KEY=your_key_here
```

### Option 2: Mailchimp, Buttondown, or custom API

Follow similar pattern with your service's API.

## 📊 Add Analytics

**Google Analytics:**

In `app/layout.tsx` line 35–42, replace placeholder with:

```tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

**Plausible (privacy-focused):**

```tsx
<script defer data-domain="articulatespeech.ai" src="https://plausible.io/js/script.js"></script>
```

## 🎨 Customize Colors

Edit `tailwind.config.ts`:

```ts
colors: {
  background: '#0A0F1A',  // Dark navy
  accent: '#8B5CF6',      // Purple
  'text-primary': '#FFFFFF',
  'text-secondary': '#E4E4E7',
  success: '#90EE90',
}
```

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow prompts to connect your GitHub repo and deploy.

**Environment variables to add in Vercel:**
- `NEXT_PUBLIC_CONVERTKIT_API_KEY` (if using ConvertKit)
- Any analytics keys

## 📁 File Structure

```
app/
  layout.tsx          # Root layout, SEO metadata, analytics
  page.tsx            # Main landing page (all sections)
  globals.css         # Tailwind + global styles
tailwind.config.ts    # Brand colors, fonts
public/
  images/             # Add screenshots here
    README.md         # Image guidelines
package.json          # Dependencies (Next.js 16, React 18, Tailwind)
```

## 🔧 Next Steps

1. **Choose headline/subheadline** from options above
2. **Add real app screenshots** to `/public/images/`
3. **Connect email service** (ConvertKit, Mailchimp, etc.)
4. **Add analytics** (Google Analytics, Plausible)
5. **Update footer links** (privacy policy, social URLs)
6. **Test responsively** (mobile → desktop)
7. **Deploy to Vercel**

## 📞 Support

Questions? Contact: support@articulatespeech.ai

---

Built with Next.js 16 + Tailwind CSS. Premium, fast, SEO-optimized.
