import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // === COLOR TOKENS ===
      colors: {
        // Backgrounds (layered surfaces)
        'bg-0': '#050809',      // deepest - main background
        'bg-1': '#0B1015',      // raised surface - sections
        'bg-2': '#141B21',      // cards
        'bg-3': '#1A2330',      // highest elevation

        // Text hierarchy
        'text-1': '#E8EAED',    // primary - cool white
        'text-2': '#8892A0',    // secondary
        'text-3': '#4A5568',    // tertiary/disabled

        // Borders
        'border-subtle': 'rgba(255, 255, 255, 0.05)',
        'border-default': 'rgba(255, 255, 255, 0.08)',

        // Primary accent (muted purple)
        'accent': '#9382E6',
        'accent-dark': '#6D5DD3',
        'accent-muted': 'rgba(147, 130, 230, 0.12)',

        // Secondary accent (soft cyan)
        'cyan': '#67E8F9',
        'cyan-bright': '#22D3EE',
        'cyan-muted': 'rgba(103, 232, 249, 0.10)',

        // Semantic colors (soft, encouraging)
        'success': '#6EE7B7',
        'success-muted': 'rgba(110, 231, 183, 0.12)',
        'warning': '#FDE68A',
        'warning-muted': 'rgba(253, 230, 138, 0.12)',
        'error': '#FCA5A5',

        // Legacy support
        'background': '#050809',
        'text-primary': '#E8EAED',
        'text-secondary': '#8892A0',
      },

      // === TYPOGRAPHY ===
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Geist Mono', 'SF Mono', 'Monaco', 'monospace'],
      },
      fontSize: {
        // Type scale with tight line-heights for headings
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },

      // === SPACING (8pt grid) ===
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },

      // === BORDER RADIUS ===
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },

      // === BOX SHADOWS ===
      boxShadow: {
        // Elevation system
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.15)',

        // Glow effects
        'glow-accent': '0 0 30px rgba(147, 130, 230, 0.25), 0 0 60px rgba(147, 130, 230, 0.1)',
        'glow-accent-sm': '0 0 20px rgba(147, 130, 230, 0.2)',
        'glow-cyan': '0 0 30px rgba(103, 232, 249, 0.2), 0 0 60px rgba(103, 232, 249, 0.08)',
        'glow-cyan-sm': '0 0 20px rgba(103, 232, 249, 0.15)',

        // Button shadows
        'btn-primary': '0 1px 2px rgba(0, 0, 0, 0.3), 0 0 20px rgba(147, 130, 230, 0.2)',
        'btn-primary-hover': '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 30px rgba(147, 130, 230, 0.3)',
      },

      // === BACKDROP BLUR ===
      backdropBlur: {
        'xs': '2px',
      },

      // === TRANSITIONS ===
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },

      // === ANIMATIONS ===
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
export default config
