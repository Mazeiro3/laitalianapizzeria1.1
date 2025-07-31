/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'italian-red': '#DC2626',
        'italian-green': '#16A34A',
        'italian-white': '#FFFFFF',
        'dark-bg': '#000000',
        'dark-card': '#1a1a1a',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(220, 38, 38, 0.3), 0 2px 4px -1px rgba(220, 38, 38, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.4)',
        'premium-lg': '0 10px 15px -3px rgba(220, 38, 38, 0.4), 0 4px 6px -2px rgba(220, 38, 38, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
};