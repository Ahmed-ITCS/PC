"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";
import { HeroScene } from "@/components/3d/HeroScene";

const heroStats = [
  { value: "50+", label: "Clients" },
  { value: "100%", label: "Completion" },
  { value: "5yrs", label: "Avg. Engagement" },
  { value: "24/7", label: "Support" },
];

const headlineLines = ["Your Partners in", "Enterprise Software", "Solutions."];

export function Hero() {
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 600], [0, 180]);
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
        style={{ y: sceneY, opacity: sceneOpacity }}
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      <div
        className="absolute inset-0 z-[1] bg-grid-pattern bg-grid-lg opacity-30"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[1] bg-glow-cyan" aria-hidden="true" />
      <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" opacity={0.05} />
      <GlowOrb className="top-1/2 -left-40" size="lg" opacity={0.04} />
      <GlowOrb className="top-1/3 -right-40" size="md" opacity={0.03} />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-max section-padding py-20 lg:py-32">
        <div className="flex justify-center">
          <div className="flex flex-col items-center text-center gap-10 max-w-4xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,212,255,0.12)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d4ff]" aria-hidden="true" />
                <span className="text-[#00d4ff] text-xs font-semibold tracking-widest uppercase">
                  <TextScramble text="Security-First Execution" trigger="always" duration={900} delay={400} />
                </span>
              </div>
            </motion.div>

            {/* Headline — line-by-line reveal */}
            <h1
              className="font-bold text-balance"
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontSize: "clamp(3.2rem, 7vw, 7rem)",
                lineHeight: "1.0",
                letterSpacing: "-0.03em",
              }}
              aria-label={headlineLines.join(" ")}
            >
              {headlineLines.map((line, i) => (
                <div key={i} className="overflow-hidden leading-[1.08]">
                  <motion.div
                    initial={shouldReduceMotion ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.8,
                      delay: shouldReduceMotion ? 0 : 0.15 + i * 0.13,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {i === 1 ? (
                      <span className="gradient-text">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/50 text-lg md:text-xl leading-relaxed max-w-xl text-balance"
            >
              We accelerate your digital transformation — delivering full-stack
              development, DevOps, and security-hardened systems without the
              overhead of an in-house technical team.
            </motion.p>

            {/* Stat bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
              role="list"
              aria-label="Key metrics"
            >
              {heroStats.map(({ value, label }, i) => (
                <div key={label} role="listitem" className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="hidden sm:block text-white/15 text-sm" aria-hidden="true">·</span>
                  )}
                  <span
                    className="text-[#00d4ff] font-bold text-xl"
                    style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                  >
                    <TextScramble text={value} trigger="inview" duration={600} delay={i * 80} />
                  </span>
                  <span className="text-white/40 text-sm">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <MagneticButton
                href="/contact"
                className="px-10 py-5 rounded-xl font-bold text-base bg-[#00d4ff] text-[#04070f] shadow-[0_0_40px_rgba(0,212,255,0.45)] hover:shadow-[0_0_60px_rgba(0,212,255,0.65)] transition-shadow duration-300"
              >
                Get Started
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                href="/services"
                strength={0.25}
                className="px-8 py-4 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                View Our Services
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#00d4ff]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
