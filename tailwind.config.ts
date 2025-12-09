import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        mist: "#EDEAE5",
      },
      letterSpacing: {
        wideish: "0.12em",
      },
    },
  },
  plugins: [],
} satisfies Config;
