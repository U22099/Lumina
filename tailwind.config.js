/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulsar: {
          '0%': {scale: 0.5, opacity: 1},
          '100%': {scale: 2, opacity: 0.5}
        }
      },
      animation: {
        pulsar: 'pulsar 1s ease-in-out infinite alternate'
      }
    },
  },
  plugins: [],
};
