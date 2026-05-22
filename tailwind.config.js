/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['"Cormorant Garant"', 'serif'],
        jost: ['Jost', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#f0c875',
          400: '#e8b84a',
          500: '#d4a853',
          600: '#b8902e',
          700: '#9a7520',
        },
        navy: {
          800: '#0d1628',
          900: '#080c14',
          950: '#040710',
        },
        cream: {
          50: '#fdfaf5',
          100: '#f8f4ed',
          200: '#f0e8d8',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4a853 0%, #f0c875 50%, #d4a853 100%)',
        'dark-gradient': 'linear-gradient(135deg, #080c14 0%, #0d1628 100%)',
      }
    },
  },
  plugins: [],
}
