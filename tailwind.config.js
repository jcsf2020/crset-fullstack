/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crset-blue': '#1e40af',
        'crset-purple': '#7c3aed',
        'crset-indigo': '#4338ca',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}

