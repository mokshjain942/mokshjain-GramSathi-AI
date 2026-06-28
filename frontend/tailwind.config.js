/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        village: {
          50: '#f2fcf5',
          100: '#e1f7e7',
          200: '#c5eed0',
          300: '#99e0ad',
          400: '#64cc82',
          500: '#3eb15e',
          600: '#2f934a',
          700: '#27753d',
          800: '#225d34',
          900: '#1d4d2d',
          950: '#0e2b17',
        },
        accent: {
          gold: '#f59e0b',
          terracotta: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
