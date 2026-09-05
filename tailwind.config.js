/** @type {import('tailwind').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B1120',
          card: '#111827',
          border: '#1E293B',
          text: '#F9FAFB',
          muted: '#9CA3AF',
        },
        cream: {
          bg: '#EDE8D0',      /* Warm Beige Background */
          card: '#F7F4E8',    /* Lighter Cream Card */
          border: '#D8D2B8',  /* Subtle Beige Border */
          text: '#111111',    /* Dark Typography */
          muted: '#4A4A4A',   /* Muted Slate Gray */
        },
        brand: {
          blue: '#2563EB',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          emerald: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
