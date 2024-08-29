/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulsar: {
          '0%': {
            transform: 'scale(0.5) translateY(-10px)',
            opacity: 1
          },
          '100%': {
            transform: 'scale(2) translateY(-50px)', 
            opacity: 0.5
          }
        }
      },
      animation: {
        pulsar: 'pulsar 1s ease-in-out infinite alternate'
      }
    },
  },
  plugins: [],
};
