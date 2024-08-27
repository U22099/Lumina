/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulsar: {
          '0%': {scale: 0.5, opacity: 1},
          '100%': {scale: 1, opacity: 0}
        }
      },
      animation: {
        pulsar: 'pulsar 3s cubic-bezier(0,0,0.2,1) infinite'
      }
    },
  },
  plugins: [],
};
