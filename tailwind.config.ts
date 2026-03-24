import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /** Kurşun grisi — yüzeyler */
        lead: {
          DEFAULT: '#374151',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0b0f14',
        },
        /** Marka — `globals.css` :root + layout inline (logo rengi) */
        brand: {
          DEFAULT: 'var(--brand)',
          light: 'var(--brand-light)',
          muted: 'var(--brand-muted)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-brand':
          'radial-gradient(ellipse 80% 50% at 50% -20%, var(--brand-radial), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;
