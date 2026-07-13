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
        background: "var(--bg-base)",
        surface: "var(--bg-surface)",
        foreground: "var(--text-primary)",
        ink: {
          DEFAULT: "#0F172A",
          strong: "#020617",
        },
        accent: {
          DEFAULT: "#0369A1",
          hover: "#075985",
          bright: "#0284C7",
          soft: "#E0F2FE",
        },
        electric: "#0369A1",
        "electric-dim": "#075985",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
        "dot-pattern":
          "radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)",
        "glow-accent":
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(3,105,161,0.08) 0%, transparent 70%)",
        "hero-gradient":
          "radial-gradient(ellipse 100% 80% at 50% -10%, rgba(3,105,161,0.10) 0%, rgba(2,132,199,0.04) 40%, transparent 70%)",
        "surface-gradient":
          "linear-gradient(180deg, rgba(15,23,42,0.02) 0%, transparent 100%)",
      },
      backgroundSize: {
        "grid-lg": "72px 72px",
        "dot-sm": "24px 24px",
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "border-flow": "borderFlow 4s linear infinite",
        counter: "counter 2s ease-out forwards",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marqueeReverse var(--marquee-duration, 40s) linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        borderFlow: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        marqueeReverse: { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
      },
      boxShadow: {
        xs: "0 1px 2px rgba(15,23,42,0.04)",
        card: "0 1px 2px rgba(15,23,42,0.04), 0 6px 20px rgba(15,23,42,0.05)",
        "card-hover": "0 12px 40px rgba(15,23,42,0.10), 0 2px 8px rgba(15,23,42,0.05)",
        accent: "0 8px 24px rgba(3,105,161,0.22)",
        "accent-lg": "0 14px 40px rgba(3,105,161,0.28)",
      },
    },
  },
  plugins: [],
};
export default config;
