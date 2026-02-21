# Articulate Speech — Marketing Website

A premium, high-converting landing page for Articulate Speech.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Adding Screenshots

Replace placeholder mockups with real app screenshots:

### Hero Section
Location: `app/page.tsx` line ~85-100

Replace the placeholder `<div>` with:
```tsx
<Image
  src="/images/hero-mockup.png"
  alt="Articulate Speech App"
  width={1200}
  height={900}
  className="rounded-2xl border border-white/10"
/>
```

Add your screenshot to `/public/images/hero-mockup.png`

### Recommended screenshots:
- **Hero**: App dashboard showing scores
- **Score section**: Close-up of 4-pillar scoring
- **Coaching section**: Feedback panel example
- **Progress section**: Chart/streak visualization

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  background: '#0A0F1A',
  accent: '#8B5CF6',
  // Add more...
}
```

### Copy
All text is in `app/page.tsx` — search and replace sections as needed.

### Logo
The logo is currently an SVG placeholder. Replace with your asset:
- Line ~28 and ~500 in `app/page.tsx`
- Or add PNG to `/public/logo.png` and use `<Image>`

## 📧 Email Capture Setup

Connect the email form to your service:

In `app/page.tsx`, line ~18, replace the `handleEmailSubmit` function:

```tsx
const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  // Example: ConvertKit
  const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: 'YOUR_API_KEY',
      email: email,
    }),
  })

  if (response.ok) {
    setSubmitMessage('Thanks! We\'ll keep you updated.')
    setEmail('')
  }

  setIsSubmitting(false)
}
```

Alternatives: Mailchimp, Buttondown, custom API.

## 📊 Analytics Setup

Add your tracking script in `app/layout.tsx` line ~35:

```tsx
{/* Google Analytics */}
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

Or use Plausible, Fathom, etc.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/
  layout.tsx    # Root layout, metadata, analytics
  page.tsx      # Main landing page
  globals.css   # Global styles + Tailwind
tailwind.config.ts  # Color palette, fonts
public/
  images/       # Add screenshots here
```

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Responsive design (320px → desktop)

## 📝 Notes

- All links to the app point to: `https://articulatespeech.vercel.app/`
- Domain referenced: `articulatespeech.ai`
- Footer email: `support@articulatespeech.ai` (update if needed)
- Social links are placeholders — add real URLs

---

Built with clarity. 🎤
