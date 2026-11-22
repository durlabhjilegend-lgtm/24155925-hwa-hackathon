import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#EEF5EC",
          100: "#D9E9D4",
          200: "#B5D4AB",
          300: "#8AB97B",
          400: "#619A52",
          500: "#427C36",
          600: "#2C6E49",
          700: "#1E4D35",
          800: "#163D2A",
          900: "#0E2A1D",
          950: "#081D14",
        },
        moss: {
          100: "#EDF3DD",
          200: "#DCE9BC",
          300: "#C7DD93",
          400: "#AECB69",
          500: "#95B84B",
          600: "#7A9A3A",
        },
        cream: {
          50: "#FDFBF4",
          100: "#FAF6E9",
          200: "#F4EDDA",
          300: "#EADFC4",
          400: "#DCCBAA",
        },
        clay: {
          300: "#EDAE8C",
          400: "#E08A5F",
          500: "#C96F4A",
          600: "#AD5636",
          700: "#8C4229",
        },
        bark: {
          600: "#5A4632",
          700: "#463628",
          800: "#33281E",
          900: "#221A13",
        },
        ink: "#142319",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        15: "0.15",
        18: "0.18",
        22: "0.22",
        28: "0.28",
        32: "0.32",
        35: "0.35",
        38: "0.38",
        42: "0.42",
        45: "0.45",
        48: "0.48",
        52: "0.52",
        55: "0.55",
        58: "0.58",
        62: "0.62",
        65: "0.65",
        68: "0.68",
        72: "0.72",
        78: "0.78",
        82: "0.82",
        85: "0.85",
        88: "0.88",
      },
      borderRadius: {
        blob: "42% 58% 61% 39% / 45% 43% 57% 55%",
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 24px 60px -28px rgba(14, 42, 29, 0.35)",
        lift: "0 40px 90px -40px rgba(8, 29, 20, 0.5)",
        inset: "inset 0 2px 10px rgba(8, 29, 20, 0.16)",
      },
      keyframes: {
        sway: {
          "0%, 100%": { transform: "rotate(-2.5deg)" },
          "50%": { transform: "rotate(2.5deg)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "floaty-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-22px) rotate(2deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pop: {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "blade-left": {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(-1deg)" },
        },
        "blade-right": {
          "0%, 100%": { transform: "rotate(8deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        sway: "sway 5s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
        "floaty-slow": "floaty-slow 9s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        pop: "pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        wiggle: "wiggle 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
