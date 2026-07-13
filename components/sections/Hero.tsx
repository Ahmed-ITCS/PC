"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
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
      <div className="absolute inset-0 z-[1] bg-grid-pattern bg-grid-lg opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-hero-gradient" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding py-20 lg:py-28">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/70 backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span className="text-[#334155] text-xs font-semibold tracking-[0.12em] uppercase font-[family-name:var(--font-mono)]">
                Security-First Execution
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold text-[#0F172A]"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
              lineHeight: "0.98",
              letterSpacing: "-0.045em",
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
                    duration: shouldReduceMotion ? 0 : 0.8,
                    delay: shouldReduceMotion ? 0 : 0.15 + i * 0.11,
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
            transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#475569] text-lg md:text-xl leading-relaxed max-w-2xl text-balance"
          >
            We accelerate your digital transformation — delivering full-stack
            development, DevOps, and security-hardened systems without the
            overhead of an in-house technical team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
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
              className="px-7 py-4 rounded-xl font-medium text-sm border border-[#CBD5E1] text-[#334155] bg-white/70 backdrop-blur-sm hover:border-[#94A3B8] hover:text-[#0F172A] hover:bg-white transition-all duration-200"
            >
              View Our Services
            </MagneticButton>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#E2E8F0] w-full max-w-2xl"
            role="list"
            aria-label="Key metrics"
          >
            {heroStats.map(({ value, label }) => (
              <div
                key={label}
                role="listitem"
                className="flex flex-col items-center justify-center gap-1 bg-white/80 backdrop-blur-sm py-5 px-3"
              >
                <span className="text-[#0F172A] font-display font-bold text-2xl tracking-tight">
                  {value}
                </span>
                <span className="text-[#64748B] text-xs">{label}</span>
              </div>
            ))}
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
          className="w-5 h-8 rounded-full border border-[#CBD5E1] flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
