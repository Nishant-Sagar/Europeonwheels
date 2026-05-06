/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef4ff',
          100: '#dde9ff',
          200: '#b3ccff',
          300: '#76a5ff',
          400: '#3375ff',
          500: '#1a56db',
          600: '#1540b0',
          700: '#0f308a',
          800: '#0d2468',
          900: '#0c1d52',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({ '.scrollbar-hide': { '-ms-overflow-style': 'none', 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' } } })
    },
  ],
}
