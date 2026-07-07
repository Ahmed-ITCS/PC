"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Cloud, ShieldCheck } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";

const capabilityPills = [
  { icon: Code2, label: "Custom Development" },
  { icon: Cloud, label: "DevOps Solutions" },
  { icon: ShieldCheck, label: "Enterprise Security" },
];

function HeroVisual() {
  const nodes = [
    { cx: 230, cy: 95, delay: 0 },
    { cx: 355, cy: 130, delay: 0.1 },
    { cx: 390, cy: 255, delay: 0.2 },
    { cx: 290, cy: 335, delay: 0.3 },
    { cx: 155, cy: 320, delay: 0.4 },
    { cx: 90, cy: 200, delay: 0.5 },
    { cx: 240, cy: 210, delay: 0.6 },
  ];
  const connections = [
    [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[420px] mx-auto hidden lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#00d4ff]/4 to-transparent pointer-events-none" />
      <svg
        viewBox="0 0 480 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
          <filter id="blur4">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].cx}
            y1={nodes[from].cy}
            x2={nodes[to].cx}
            y2={nodes[to].cy}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.12, 0.45, 0.12] }}
            transition={{
              duration: 2.8 + i * 0.25,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outer node glows */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`glow-${i}`}
            cx={node.cx}
            cy={node.cy}
            r={i === 6 ? 28 : 16}
            fill="url(#nodeGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.cx}
            cy={node.cy}
            r={i === 6 ? 9 : 5}
            fill={i === 6 ? "#00d4ff" : "rgba(0,212,255,0.55)"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.6 + node.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Center node pulse ring */}
        <motion.circle
          cx={nodes[6].cx}
          cy={nodes[6].cy}
          r={18}
          stroke="#00d4ff"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ r: [18, 34, 18], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Grid background dots */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={40 + col * 64}
              cy={30 + row * 62}
              r="1.2"
              fill="rgba(0,212,255,0.12)"
            />
          ))
        )}
      </svg>

      {/* Floating code tag */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-6 right-4 px-3 py-1.5 rounded-lg bg-[#0d1529]/90 border border-[#00d4ff]/20 backdrop-blur-sm text-xs font-mono text-[#00d4ff]/70"
      >
        {"<SecurityFirst />"}
      </motion.div>

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-8 left-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d1529]/90 border border-white/8 backdrop-blur-sm"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-white/50 font-medium">All systems operational</span>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-100"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-glow-cyan" aria-hidden="true" />
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

      <div className="relative z-10 container-max section-padding py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col items-start gap-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/8 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d4ff]" aria-hidden="true" />
                <span className="text-[#00d4ff] text-xs font-semibold tracking-widest uppercase">
                  Security-First Execution
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.06] tracking-tight text-balance"
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
              className="text-white/55 text-lg md:text-xl leading-relaxed max-w-lg text-balance"
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
              className="flex flex-wrap gap-3"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d1529]/80 border border-[#00d4ff]/15 backdrop-blur-sm text-sm text-white/70 font-medium"
                >
                  <Icon className="w-4 h-4 text-[#00d4ff]" aria-hidden="true" />
                  {label}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#00d4ff] text-[#04070f] hover:bg-[#00d4ff]/90 transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.3)] hover:shadow-[0_0_36px_rgba(0,212,255,0.5)]"
              >
                Get Started
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                View Our Services
              </Link>
            </motion.div>
          </div>

          {/* Right visual */}
          <HeroVisual />
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
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#00d4ff]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
