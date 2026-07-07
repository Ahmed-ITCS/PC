"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Code2, Zap } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";

const floatingBadges = [
  { icon: Shield, label: "SOC 2 Ready", delay: 0 },
  { icon: Code2, label: "Full-Stack", delay: 0.15 },
  { icon: Zap, label: "CI/CD Pipelines", delay: 0.3 },
];

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-100"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-glow-cyan"
        aria-hidden="true"
      />
      <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" opacity={0.05} />
      <GlowOrb className="top-1/2 -left-40" size="lg" opacity={0.04} />
      <GlowOrb className="top-1/3 -right-40" size="md" opacity={0.03} />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-max section-padding text-center flex flex-col items-center gap-8 py-24">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/8 backdrop-blur-sm">
            <Shield className="w-3.5 h-3.5 text-[#00d4ff]" aria-hidden="true" />
            <span className="text-[#00d4ff] text-xs font-semibold tracking-widest uppercase">
              Security-First Execution
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-balance max-w-5xl"
          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
        >
          Ship Secure Software{" "}
          <span className="gradient-text">Without an In-House</span>{" "}
          Technical Team
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/55 text-lg md:text-xl leading-relaxed max-w-2xl text-balance"
        >
          PentaCipher delivers full-stack development, DevOps infrastructure, and
          security-hardened systems for digital agencies, growing startups, and
          enterprises — built right from day one.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#00d4ff] text-[#04070f] hover:bg-[#00d4ff]/90 transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.3)] hover:shadow-[0_0_32px_rgba(0,212,255,0.45)]"
          >
            Start a Project
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            View Case Studies
          </Link>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-4"
        >
          {floatingBadges.map(({ icon: Icon, label, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + delay, duration: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d1529]/80 border border-white/8 backdrop-blur-sm text-xs text-white/50 font-medium"
            >
              <Icon className="w-3.5 h-3.5 text-[#00d4ff]/70" aria-hidden="true" />
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
      </div>
    </section>
  );
}
