/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: '#4F46E5',
        yellow_light: '#FE9900',
        indigo_dark: '#4A46C5'
      }
    },
  },
  plugins: [],
}

