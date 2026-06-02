/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["'DM Sans'", "sans-serif"],
        display: ["'Instrument Serif'", "serif"],
        mono:    ["'DM Mono'", "monospace"],
      },
      colors: {
        brand: {
          50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",
          300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",
          600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",
        },
        accent: "#0f172a",
      },
      boxShadow: {
        "card":       "0 1px 3px 0 rgb(0 0 0/0.06),0 1px 2px -1px rgb(0 0 0/0.06)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0/0.08),0 2px 4px -2px rgb(0 0 0/0.06)",
        "focus":      "0 0 0 3px rgb(14 165 233/0.15)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp:  { "0%":{ opacity:"0", transform:"translateY(16px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        fadeIn:  { "0%":{ opacity:"0" }, "100%":{ opacity:"1" } },
      },
    },
  },
  plugins: [],
};
