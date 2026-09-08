/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f3',
          100: '#e1f2e5',
          200: '#c4e5ce',
          300: '#97d1a8',
          400: '#64b67d',
          500: '#3e9a59',
          600: '#2f7d45',
          700: '#276339',
          800: '#234f2f',
          900: '#1e4128',
          950: '#0c2314',
        },
        harvest: {
          50: '#fef9ee',
          100: '#fdf0d5',
          200: '#fadeaa',
          300: '#f6c474',
          400: '#f1a43e',
          500: '#eb871a',
          600: '#cd6811',
          700: '#aa4d11',
          800: '#893d14',
          900: '#713414',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
