import { type Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette colors
        "p-black": "#222222",
        "p-blue": "#639FAB",
        "p-lblue": "#BBCDE5", // Light blue
        "p-dblue": "#1C5D99", // Dark blue
        "p-hdblue": "#14416A", // Navy blue
        "p-rblue": "#1D4ED8", // Royal blue
        "p-red": "#D22B2B",
        "p-yellow": "#F5BB00",
        "p-gray": "#D9D9D9",
        "p-dgray": "#bfbfbf",
        "p-ngray": "#f6f9ff",
        "p-dviolet": "#292076", // Dark purple
        "p-dbviolet": "#420eb3", // Dark Bright purple
        "p-bviolet": "#6600cc", // Bright purple
        "p-pviolet": "#9900cc", // Pinkish purple
        "p-lviolet": "#d6d1ff", // Pinkish purple
      },
      fontSize: {
        xs: ["12px", "12px"],
        xxs: ["10px", "10px"],
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
        fullscreen: "85vh",
      },
      shadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  safelist: ["google", "discord"],
  plugins: [],
} satisfies Config;
