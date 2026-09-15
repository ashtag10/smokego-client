import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5ECD7',
          main: '#C9A94E',
          dark: '#B8943E',
          deep: '#8B7332',
          shimmer: '#E8D5A3',
        },
        black: {
          deep: '#0A0A0A',
          main: '#1A1A1A',
          soft: '#2D2D2D',
        },
        grey: {
          50: '#F9F9F9',
          100: '#F0F0F0',
          200: '#E0E0E0',
          300: '#D1D1D1',
          400: '#B0B0B0',
          500: '#8A8A8A',
          600: '#6B6B6B',
          700: '#5A5A5A',
          800: '#3D3D3D',
          900: '#2D2D2D',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config