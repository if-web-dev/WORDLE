/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safeList: [
    'delay-[400ms]',
    'delay-[800ms]',
    'delay-[1200ms]',
    'delay-[1600ms]',
    'delay-[2000ms]',
    'delay-[2400ms]',
    'delay-[2800ms]',
],
  plugins: [],
}

