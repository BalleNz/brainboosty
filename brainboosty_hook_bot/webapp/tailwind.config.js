/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#FF1493",
          pinkHot: "#FF00AA",
          cyan: "#00F0FF",
          gold: "#FFD700",
        },
        void: {
          DEFAULT: "#0A0A0A",
          purple: "#120818",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Satoshi"', "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 24px rgba(255, 20, 147, 0.55), 0 0 64px rgba(255, 0, 170, 0.25)",
        "neon-cyan": "0 0 20px rgba(0, 240, 255, 0.45)",
        glass: "0 8px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        cosmic:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 20, 147, 0.22), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(120, 40, 200, 0.18), transparent 50%), radial-gradient(ellipse 50% 35% at 10% 70%, rgba(0, 240, 255, 0.08), transparent 45%)",
      },
      animation: {
        "pulse-neon": "pulseNeon 3.2s ease-in-out infinite",
        float: "floatY 6s ease-in-out infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 28px rgba(255,20,147,0.65))" },
          "50%": { filter: "brightness(1.12) drop-shadow(0 0 48px rgba(255,0,170,0.85))" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
