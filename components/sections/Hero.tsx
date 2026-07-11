"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Cloud, ShieldCheck } from "lucide-react";

const capabilityPills = [
  { icon: Code2, label: "Custom Development" },
  { icon: Cloud, label: "DevOps Solutions" },
  { icon: ShieldCheck, label: "Enterprise Security" },
];

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      aria-label="Hero"
      style={{ minHeight: "100vh" }}
    >
      {/* Background overlays — subtle, so 3D shows through */}
      <div
        className="absolute inset-0 z-[1] bg-grid-pattern bg-grid-lg opacity-15 pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[1] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(8,145,178,0.05) 0%, transparent 70%)"
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-max section-padding py-20 lg:py-32">
        <div className="flex justify-center">
          <div className="flex flex-col items-center text-center gap-8 max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/10 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0891B2]" aria-hidden="true" />
                <span className="text-[#0891B2] text-xs font-semibold tracking-widest uppercase">
                  Security-First Execution
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold leading-[1.04] tracking-tight text-balance"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Your Partners in{" "}
              <span className="gradient-text">Enterprise Software</span>{" "}
              Solutions
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#4A6580] text-lg md:text-xl leading-relaxed max-w-xl text-balance"
            >
              We accelerate your digital transformation — delivering full-stack
              development, DevOps, and security-hardened systems without the
              overhead of an in-house technical team.
            </motion.p>

            {/* Capability pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 justify-center"
              role="list"
              aria-label="Core capabilities"
            >
              {capabilityPills.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  role="listitem"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.35 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#0F2A44]/10 backdrop-blur-sm text-sm text-[#4A6580] font-medium shadow-sm"
                >
                  <Icon className="w-4 h-4 text-[#0891B2]" aria-hidden="true" />
                  {label}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-[#0891B2] text-white hover:bg-[#0891B2]/90 transition-all duration-200 shadow-[0_4px_24px_rgba(8,145,178,0.25)] hover:shadow-[0_4px_32px_rgba(8,145,178,0.35)] hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-[#0F2A44]/10 text-[#4A6580] hover:border-[#0F2A44]/15 hover:text-[#0F2A44] hover:bg-[#0F2A44]/4 transition-all duration-200"
              >
                View Our Services
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[#0F2A44]/15 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#0891B2]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
