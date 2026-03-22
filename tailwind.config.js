/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#4f46e5', // Indigo Primary
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          400: '#2dd4bf', // Teal
          500: '#14b8a6',
          600: '#0f766e',
          purple: '#a855f7', // Purple accent
        },
      },
      backgroundImage: {
        'evolve-gradient': 'linear-gradient(135deg, #4f46e5 0%, #a855f7 50%, #2dd4bf 100%)',
        'hero-gradient': 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)',
        'card-gradient': 'linear-gradient(135deg, #a855f7 0%, #2dd4bf 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
