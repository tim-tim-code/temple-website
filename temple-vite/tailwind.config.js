/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#002E19',
        soil: '#4A2F1E', 
        amber: '#CC7722',
        sun: '#EE9800',
        paper: '#F2EACE',
        sage: '#B5E288',
        leaf: '#538F00',
      },
      fontFamily: {
        'serif': ['Fraunces', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      lineHeight: {
        'generous': '1.8',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
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

