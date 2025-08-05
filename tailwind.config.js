// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'], // Sets Nunito as the default font
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        tutorverse: {
          "primary": "#661AE6",    // A vibrant purple
          "secondary": "#D926AA", // A punchy pink
          "accent": "#1FB2A5",     // A cool teal
          "neutral": "#191D24",    // A soft black
          "base-100": "#f3f4f6",     // A light grey background
          "info": "#3ABFF8",       // A sky blue
          "success": "#36D399",   // A fresh green
          "warning": "#FBBD23",   // A sunny yellow
          "error": "#F87272",      // A soft red
        },
      },
      // You can add other themes like "dark", "cupcake", etc. if you want a theme switcher later
    ],
  },
}
