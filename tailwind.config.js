/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kirby: {
          pink: '#FF69B4',
          light: '#FFB6C1',
          dark: '#FF1493',
          bg: '#FFF0F5',
        },
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'card-left': 'cardLeft 0.3s ease-out forwards',
        'card-right': 'cardRight 0.3s ease-out forwards',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        cardLeft: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-150%) rotate(-20deg)', opacity: '0' },
        },
        cardRight: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(150%) rotate(20deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
