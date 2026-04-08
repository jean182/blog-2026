import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0e0f12",
        surface: "#14161c",
        text: "#e8e8ea",
        muted: "#9aa0a6",
        accent: "#7fa38d",
        link: "#3b82f6",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        reading: "680px",
      },
    },
  },
  plugins: [],
};

export default config;
