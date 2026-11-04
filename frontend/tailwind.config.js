/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7047eb',
          'purple-light': '#f0ebff',
          'purple-border': '#dcd1fc',
          cyan: '#00cfe8',
          'cyan-light': '#e0f9fc',
          pink: '#e83e8c',
          'pink-light': '#fdeaf3',
          indigo: '#5c77ff',
          'indigo-light': '#eef2ff',
          teal: '#00b5ad',
          'teal-light': '#e6f7f6',
          bg: '#f4f6fc',
          card: '#ffffff',
          dark: '#1e293b',
          muted: '#8a92a6',
          border: '#edf2f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(0, 0, 0, 0.03)',
        floating: '0 8px 24px rgba(232, 62, 140, 0.35)',
      }
    },
  },
  plugins: [],
}

