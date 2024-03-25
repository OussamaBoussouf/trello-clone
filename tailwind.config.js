/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%": { scale: "0" },
          "100%": { width: "1" },
        },
      },
      height: {
        board: "calc(100vh - 73px)",
      },
      animation: {
        scale: "scale 500ms ease-in-out",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "light-blue": "#8d6bff",
        "dark-blue": "#6c47ff",
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(214px, 1fr))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none":{
          scrollbarWidth: "none",
        },
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) white",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "green",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "50px",
            border: "1px solid white",
          },
        },
      });
    },
  ],
};
