/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paradigm: {
          bg: '#ffffff',
          dark: '#000000',
          text: '#444444',
          muted: '#888888',
          border: 'rgba(144, 144, 144, 0.25)',
          borderStrong: 'rgba(144, 144, 144, 0.5)',
          lightBg: '#f7f7f7',
          cardBg: '#fafafa',
          accent: '#272727',
        }
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', 'Helvetica', 'sans-serif'],
        heading: ['Raleway', 'Helvetica', 'sans-serif'],
      },
      letterSpacing: {
        widestHeader: '0.175em',
        subtle: '0.0375em',
      }
    },
  },
  plugins: [],
}
