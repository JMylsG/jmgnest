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
        // Deep green — kept as ink / logo accent (mockup body ink is a dark forest green)
        'forest-green': '#22342C',
        'warm-sage': '#D9C7B8',
        'warm-sage-dark': '#B8A08F', // Darker variant for better text contrast (WCAG AA compliant)
        // Warm cream light ground (mockup --bg). Also reads as light text on espresso.
        'cream': '#ECE3CF',
        'cream-on-dark': '#F3F1EA', // crisp light text on espresso bookends
        // Gold accent (mockup gold). warm-gold* kept for existing usages.
        'warm-gold': '#C49863',
        'warm-gold-dark': '#A87B4A',
        'gold': '#A97A3C',
        'gold-2': '#C49863',
        // Espresso — the dark bookends (hero / CTA / footer)
        'espresso': '#17120c',
        'espresso-2': '#1e1810',
        'panel-dark': '#241d15',
        'panel-dark-2': '#2b2318',
        // Green accent — iconography + selection (forest for light, sage for dark)
        'green-accent': '#2E5D4E',
        'sage-accent': '#7FB89C',
        // Semantic
        'text-primary': '#22342C',
        'text-secondary': '#586A62',
        'text-tertiary': '#8A9A92',
        'border-light': '#E1D6C2',
        'background-section': '#FAF4E9',
        'background-subtle': '#F3EBDB',
        'background-panel': '#EFE6D4',
        'background-dark': '#17120c', // espresso (was forest-green)
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
        'sm': '0 2px 8px rgba(30, 20, 10, 0.07)',
        'md': '0 6px 20px rgba(30, 20, 10, 0.10)',
        'lg': '0 12px 34px rgba(30, 20, 10, 0.14)',
        'xl': '0 20px 55px rgba(30, 20, 10, 0.16)',
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

