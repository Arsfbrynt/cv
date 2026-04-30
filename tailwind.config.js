/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          magenta: "#ff00aa",
          "magenta-dim": "#cc0088",
          "magenta-glow": "#ff00aa33",
          teal: "#00f5d4",
          "teal-dim": "#00c4aa",
          "teal-glow": "#00f5d433",
        },
        dark: {
          950: "#050508",
          900: "#0a0a12",
          800: "#0f0f1a",
          700: "#141424",
          600: "#1a1a2e",
          500: "#22223a",
          400: "#2a2a4a",
        },
      },
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%": { "box-shadow": "0 0 5px #ff00aa44, 0 0 20px #ff00aa22" },
          "100%": { "box-shadow": "0 0 15px #ff00aaaa, 0 0 40px #ff00aa55" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "neon-magenta": "0 0 20px #ff00aa44, 0 0 60px #ff00aa22",
        "neon-teal": "0 0 20px #00f5d444, 0 0 60px #00f5d422",
        "neon-magenta-intense": "0 0 10px #ff00aa, 0 0 30px #ff00aa88",
        card: "0 0 0 1px rgba(255,0,170,0.08), 0 4px 32px rgba(0,0,0,0.4)",
        "card-hover":
          "0 0 0 1px rgba(255,0,170,0.25), 0 8px 40px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
