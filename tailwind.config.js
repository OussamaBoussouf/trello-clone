/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes:{
        scale:{
          '0%': {scale: '0'},
          '100%': {width: '1'}
        }
      },
      animation:{
        scale: 'scale 500ms ease-in-out'
      },
      fontFamily:{
        'poppins': ['Poppins', "sans-serif"]
      },
      colors:{
        'light-blue': "#8d6bff",
        'dark-blue': "#6c47ff",
      },
      gridTemplateColumns: {
        'auto-fill' : 'repeat(auto-fill, minmax(214px, 1fr))'
      }
    },
  },
  plugins: [],
};
