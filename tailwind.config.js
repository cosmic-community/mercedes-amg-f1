/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'f1-teal': {
          DEFAULT: '#00A19C',
          dark: '#007F7B',
        },
        'f1-green': '#C6FF00',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Titillium Web"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
