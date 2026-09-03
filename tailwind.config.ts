import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#1E3D34',
        'warm-sage': '#D9C7B8',
        'warm-sage-dark': '#B8A08F', // Darker variant for better text contrast (WCAG AA compliant)
        'cream': '#FAF9F6',
        'warm-gold': '#C49863',
        'warm-gold-dark': '#A87B4A', // Darker variant for better text contrast on light backgrounds
        'text-primary': '#1E3D34',
        'text-secondary': '#5A6B64',
        'text-tertiary': '#8A9A93',
        'border-light': '#E8E4DF',
        'background-section': '#FFFFFF',
        'background-subtle': '#F5F3F0',
        'background-dark': '#1E3D34',
      },
      fontFamily: {
        serif: ['var(--font-crimson)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Helvetica Neue', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1': 'clamp(2.5rem, 5vw, 4rem)',
        'h2': 'clamp(2rem, 4vw, 3rem)',
        'h3': 'clamp(1.5rem, 3vw, 2rem)',
        'h4': 'clamp(1.25rem, 2.5vw, 1.5rem)',
        'body': 'clamp(0.938rem, 2vw, 1.125rem)',
        'caption': 'clamp(0.813rem, 1.5vw, 0.938rem)',
        'small': 'clamp(0.75rem, 1.25vw, 0.875rem)',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(30, 61, 52, 0.08)',
        'md': '0 4px 16px rgba(30, 61, 52, 0.12)',
        'lg': '0 8px 24px rgba(30, 61, 52, 0.16)',
        'xl': '0 12px 32px rgba(30, 61, 52, 0.2)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

