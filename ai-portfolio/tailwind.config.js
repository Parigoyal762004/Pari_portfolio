/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables dark mode using class strategy
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'], // Set DM Sans as the default sans-serif font
        script: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        // Your defined color palette
        ivory: '#fef6e4',
        pink: '#f582ae',
        blue: '#8bd3dd',
        peach: '#fcd5ce',
        dark: '#222222',
        light: '#ffffff',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite', // Keep this here for clarity, though it's in index.css
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0px var(--color-accent-dark, theme(colors.pink))', // Fallback to pink
          },
          '50%': {
            boxShadow: '0 0 20px 5px theme(colors.pink)',
          },
        },
        // 'float' keyframes are already in index.css, no need to duplicate here
      },
    },
  },
  plugins: [],
}