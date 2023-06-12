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
        "p-vdviolet": "#200444", // Very dark violet
        "p-dviolet": "#292076", // Dark violet
        "p-dbviolet": "#420eb3", // Dark Bright violet
        "p-bviolet": "#6600cc", // Bright violet
        "p-pviolet": "#9900cc", // Pinkish violet
        "p-lviolet": "#d6d1ff", // Pinkish violet
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
      transitionProperty: {
        maxWidth: "max-width",
        maxHeight: "max-height",
        maxHW: "max-width, max-height",
      },
    },
  },
  safelist: ["google", "discord"],
  plugins: [],
} satisfies Config;
