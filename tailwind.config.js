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
        content: "calc(100vh - 57px)",
      },
      maxHeight:{
        content: "calc(100vh - 216px)",
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
        "light-gray": "#f1f2f4",
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
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: "50px",
            border: "1px solid white",
          },
        },
      });
    },
  ],
};
