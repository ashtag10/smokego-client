export const themeConfig = {
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
    white: '#FFFFFF',
    whiteSmoke: '#F8F7F4',
    whiteLinen: '#FDFBF7',
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif',
    accent: 'Cormorant Garamond, serif',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    gold: '0 4px 14px 0 rgba(201, 169, 78, 0.4)',
  },
} as const

export type ThemeConfig = typeof themeConfig