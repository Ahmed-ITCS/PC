"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroScene } from "@/components/3d/HeroScene";

const heroStats = [
  { value: "50+",  label: "Clients" },
  { value: "100%", label: "Completion" },
  { value: "5yrs", label: "Avg. Engagement" },
  { value: "24/7", label: "Support" },
];

const headlineLines = ["Your partners in", "enterprise software", "solutions."];

export function Hero() {
  const { scrollY } = useScroll();
  const sceneY       = useTransform(scrollY, [0, 600], [0, 120]);
  const sceneOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
      aria-label="Hero"
    >
      {/* 3D background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: shouldReduceMotion ? 0 : sceneY, opacity: sceneOpacity }}
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      {/* Subtle grid + glow */}
      <div className="absolute inset-0 z-[1] bg-grid-pattern bg-grid-lg opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50_40%,black,transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-hero-gradient" aria-hidden="true" />
      {/* Cipher scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-60 mix-blend-screen"
        style={{ background: "repeating-linear-gradient(to bottom, rgba(70,230,197,0.025) 0px, rgba(70,230,197,0.025) 1px, transparent 1px, transparent 3px)" }}
        aria-hidden="true"
      />
      {/* Coordinate HUD */}
      <span className="pointer-events-none absolute top-[116px] left-6 md:left-12 z-[2] hidden md:block font-mono text-[10px] leading-relaxed tracking-[0.12em] text-[#7C8C92]" aria-hidden="true">
        LAT 40.7128° N<br />LON 74.0060° W<br />SEC-01 / VAULT
      </span>
      <span className="pointer-events-none absolute bottom-[116px] right-6 md:right-12 z-[2] hidden md:block text-right font-mono text-[10px] leading-relaxed tracking-[0.12em] text-[#7C8C92]" aria-hidden="true">
        STATUS: SECURE<br />UPTIME 99.99%<br />NODE 05 / 12
      </span>

      <div className="relative z-10 container-max section-padding py-24 lg:py-32">
        <div className="flex flex-col items-center text-center gap-9 max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span className="kicker">Security-First Execution</span>
            </span>
          </motion.div>

          {/* Headline — editorial serif */}
          <h1
            className="font-display font-semibold text-[#E7EEF0]"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 6rem)",
              lineHeight: "1.02",
              letterSpacing: "-0.025em",
            }}
            aria-label={headlineLines.join(" ")}
          >
            {headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.85,
                    delay: shouldReduceMotion ? 0 : 0.15 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {i === 1 ? <span className="gradient-text">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lede max-w-2xl text-balance"
          >
            We accelerate your digital transformation — delivering full-stack
            development, DevOps, and security-hardened systems without the
            overhead of an in-house technical team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <MagneticButton
              href="/contact"
              className="px-8 py-4 rounded-xl font-semibold text-base bg-accent text-white shadow-accent hover:bg-accent-hover hover:shadow-accent-lg transition-all duration-200"
            >
              Get Started
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              href="/services"
              strength={0.25}
              className="px-7 py-4 rounded-xl font-medium text-sm border border-[#2A3742] text-[#A9B7BD] bg-[#0E141E]/70 backdrop-blur-sm hover:border-[#6B7A81] hover:text-[#E7EEF0] hover:bg-[#0E141E] transition-all duration-200"
            >
              View Our Services
            </MagneticButton>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 w-full max-w-2xl"
            role="list"
            aria-label="Key metrics"
          >
            <div className="rule mb-7" aria-hidden="true" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
              {heroStats.map(({ value, label }) => (
                <div
                  key={label}
                  role="listitem"
                  className="flex flex-col items-center justify-center gap-1.5"
                >
                  <span className="font-display font-semibold text-[#E7EEF0] text-3xl tracking-tight">
                    {value}
                  </span>
                  <span className="text-[#7C8C92] text-xs tracking-wide uppercase">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[#2A3742] flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
