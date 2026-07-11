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
          950: "#04070f",
          900: "#080e1e",
          800: "#0d1529",
          700: "#111c36",
          600: "#162244",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        electric: "#00d4ff",
        "electric-dim": "#0099bb",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
        "dot-pattern":
          "radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)",
        "glow-cyan":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 70%)",
        "glow-bottom":
          "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,212,255,0.08) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid-lg": "80px 80px",
        "dot-sm": "24px 24px",
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 8vw, 7.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
        counter: "counter 2s ease-out forwards",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marqueeReverse var(--marquee-duration, 40s) linear infinite",
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
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 12px rgba(0,212,255,0.2)",
        "glow-md": "0 0 24px rgba(0,212,255,0.25)",
        "glow-lg": "0 0 48px rgba(0,212,255,0.2)",
        card: "0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
