import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: "#F0F7FA",
          100: "#E8F1F5",
          200: "#D1E3EC",
          300: "#B4CFE0",
          400: "#8BA3B8",
          500: "#6B8AA3",
          600: "#4A6580",
          700: "#2D4A63",
          800: "#1A365D",
          900: "#0F2A44",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
        },
        accent: "#0891B2",
        "accent-dim": "#0E7490",
        "accent-2": "#6366F1",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)",
        "dot-pattern":
          "radial-gradient(circle, rgba(8,145,178,0.06) 1px, transparent 1px)",
        "glow-cyan":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(8,145,178,0.06) 0%, transparent 70%)",
        "glow-bottom":
          "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(8,145,178,0.04) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid-lg": "80px 80px",
        "dot-sm": "24px 24px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        counter: "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "subtle-sm": "0 1px 3px rgba(15,42,68,0.06), 0 4px 12px rgba(15,42,68,0.04)",
        "subtle-md": "0 2px 6px rgba(15,42,68,0.06), 0 8px 24px rgba(15,42,68,0.06)",
        "subtle-lg": "0 4px 12px rgba(15,42,68,0.06), 0 16px 48px rgba(15,42,68,0.08)",
        card: "0 1px 3px rgba(15,42,68,0.06), 0 8px 32px rgba(15,42,68,0.04)",
        "card-hover": "0 2px 8px rgba(15,42,68,0.08), 0 16px 48px rgba(15,42,68,0.06), 0 0 0 1px rgba(8,145,178,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
