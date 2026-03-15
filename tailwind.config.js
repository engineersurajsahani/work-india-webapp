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
          50: '#f5f3ff', // Lightest purple
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed', // Base purple (similar to left side of image)
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          400: '#60a5fa', // Blue (similar to right side of image)
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)', // Purple to Blue
        'card-gradient': 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)', // Blue to Purple
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
