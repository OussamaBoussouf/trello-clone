/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'poppins': ['Poppins', "sans-serif"]
      },
      colors:{
        'light-blue': "#8d6bff",
        'dark-blue': "#6c47ff",
      },
      gridTemplateColumns: {
        'auto-fill' : 'repeat(auto-fit, 214px)'
      }
    },
  },
  plugins: [],
};
