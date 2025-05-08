/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightblue: "var(--color-lightblue)",
        Darkblue: "var(--color-Darkblue)",
        LightTeal: "var(--color-LightTeal)",
        PrimaryBlack: "var(--color-PrimaryBlack)",
        borderColor: "var(--color-border-color)",
      },
    },
  },
  plugins: [require('daisyui')],
}
