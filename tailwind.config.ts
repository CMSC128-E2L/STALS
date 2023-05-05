import { type Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette colors
        "p-black": "#222222",
        "p-dblue": "#1C5D99", // Dark blue
        "p-hdblue": "#14416A",
        "p-blue": "#639FAB",
        "p-lblue": "#BBCDE5", // Light blue
        "p-red": "#D22B2B",
        "p-yellow": "#F5BB00",
        "p-gray": "#D9D9D9",
      },
      fontSize: {
        xs: ["12px", "12px"],
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "50%": "50%",
        "16": "4rem",
      },
      height: {
        halfscreen: "50vh",
      },
    },
  },
  plugins: [],
} satisfies Config;
