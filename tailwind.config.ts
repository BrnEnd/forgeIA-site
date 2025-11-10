import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0A0F1F',
          800: '#1A2B4C',
          500: '#00C2FF',
          100: '#F5F7FA',
          300: '#8EA2C6'
        }
      },
      fontFamily: {
        display: ['var(--font-poppins)'],
        accent: ['var(--font-space-grotesk)'],
        sans: ['var(--font-inter)']
      },
      borderRadius: {
        '2xl': '1.5rem'
      },
      boxShadow: {
        glow: '0 20px 45px -20px rgba(0, 194, 255, 0.5)'
      }
    }
  },
  plugins: []
};

export default config;
