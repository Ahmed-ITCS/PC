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
          DEFAULT: "#E7EEF0",
          strong: "#F2F7F8",
        },
        accent: {
          DEFAULT: "#46E6C5",
          hover: "#2BB89C",
          bright: "#7DF9FF",
          deep: "#0E2A2A",
          soft: "#0E1A1C",
        },
        electric: "#46E6C5",
        "electric-dim": "#2BB89C",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(120,200,180,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,200,180,0.06) 1px, transparent 1px)",
        "dot-pattern":
          "radial-gradient(circle, rgba(120,200,180,0.10) 1px, transparent 1px)",
        "glow-accent":
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(70,230,197,0.10) 0%, transparent 70%)",
        "hero-gradient":
          "radial-gradient(ellipse 100% 80% at 50% -10%, rgba(70,230,197,0.12) 0%, rgba(125,249,255,0.05) 40%, transparent 70%)",
        "surface-gradient":
          "linear-gradient(180deg, rgba(120,200,180,0.03) 0%, transparent 100%)",
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
        xs: "0 1px 2px rgba(0,0,0,0.4)",
        card: "0 1px 2px rgba(0,0,0,0.4), 0 6px 20px rgba(0,0,0,0.5)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)",
        accent: "0 8px 24px rgba(70,230,197,0.22)",
        "accent-lg": "0 14px 40px rgba(70,230,197,0.30)",
      },
    },
  },
  plugins: [],
};
export default config;
