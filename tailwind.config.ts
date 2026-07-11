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
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
      },
      spacing: {
        "section": "clamp(6rem, 12vw, 10rem)",
        "section-sm": "clamp(4rem, 8vw, 6rem)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        marquee: "marquee 30s linear infinite",
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(15,42,68,0.04), 0 4px 16px rgba(15,42,68,0.03)",
        card: "0 1px 3px rgba(15,42,68,0.04), 0 8px 32px rgba(15,42,68,0.03)",
        "card-hover": "0 2px 8px rgba(15,42,68,0.06), 0 16px 48px rgba(15,42,68,0.05), 0 0 0 1px rgba(8,145,178,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
