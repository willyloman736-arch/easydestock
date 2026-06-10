import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette migrated from the original Flatsome theme, refined into scales.
        brand: {
          50: '#eef2f7',
          100: '#d6e0ec',
          200: '#aec1d8',
          300: '#7e9bbd',
          400: '#5a7da6',
          500: '#446084', // original --primary
          600: '#3a5273',
          700: '#30435e',
          800: '#28384d',
          900: '#1f2b3a',
          950: '#131a24',
        },
        accent: {
          50: '#fdf3ef',
          100: '#fbe3d8',
          200: '#f6c4b0',
          300: '#ef9d7e',
          400: '#e57e57',
          500: '#d26e4b', // original --secondary
          600: '#bd5836',
          700: '#9d452c',
          800: '#7f3a28',
          900: '#683224',
        },
        sale: '#b20000',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)',
        'card-hover': '0 8px 30px rgba(16,24,40,0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
