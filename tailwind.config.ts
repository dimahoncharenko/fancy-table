import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    screens: {
      sm: '390px',
      md: '834px',
      xl: '1440px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        md: '60px',
        lg: '80px'
      }
    },
    colors: {
      black: '#001114',
      white: '#FFFFFF',
      light: '#FBFBFB',
      blue: {
        DEFAULT: '#26264F',
        dark: '#1D1E42',
        darker: '#141432'
      },
      gray: {
        light: '#E0E0E0',
        DEFAULT: '#9E9E9E'
      },
      accent: {
        DEFAULT: '#F7F6FE',
        dark: '#624DE3'
      },
      success: {
        light: '#EBF9F1',
        DEFAULT: '#1F9254'
      },
      warning: {
        light: '#FEF2E5',
        DEFAULT: '#CD6200'
      },
      danger: {
        light: '#FBE7E8',
        DEFAULT: '#A30D11'
      }
    },
    extend: {
      borderRadius: {
        '2.5xl': '1.375rem',
        '4xl': '1.875rem'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      fontFamily: {
        alegreya: ['var(--font-alegreya)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif']
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
