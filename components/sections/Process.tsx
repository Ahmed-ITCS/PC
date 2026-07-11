"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { Search, Pencil, Rocket, ShieldCheck } from "lucide-react";
import { ProcessScene } from "@/components/3d/ProcessScene";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Scoping",
    description:
      "We audit your current state, define precise requirements, and build a technical roadmap with risk assessment — before writing a single line of code.",
  },
  {
    icon: Pencil,
    number: "02",
    title: "Architecture & Design",
    description:
      "System design, data models, API contracts, and security architecture reviewed and approved before implementation begins.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Iterative Delivery",
    description:
      "Two-week sprints, daily standups, continuous deployment to staging. You see progress every week, not after six months.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Security & Handoff",
    description:
      "Pen testing, vulnerability scans, full documentation, runbooks, and a smooth knowledge transfer — so your team owns it completely.",
  },
];

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 bg-dot-pattern bg-dot-sm opacity-40"
        aria-hidden="true"
        style={{ backgroundSize: "24px 24px" }}
      />

      <div className="relative z-10 container-max section-padding">
        <SectionNumber number="02" className="top-0 left-0 md:left-8" />
        <ProcessScene />
        <ClipReveal className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>How We Work</SectionLabel>
          <h2
            id="process-heading"
            className="text-display-lg font-bold text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            A Process Built for{" "}
            <span className="gradient-text">Predictable Outcomes</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl text-balance">
            No surprises, no scope creep. Just a proven framework for shipping
            secure software on time.
          </p>
        </ClipReveal>

        <div className="relative">
          {/* Animated connector line */}
          <motion.div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent"
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { scaleX: 0, transformOrigin: "left center" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={i * 0.1} direction="up">
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#00d4ff]/8 border border-[#00d4ff]/20">
                      <Icon
                        className="w-5 h-5 text-[#00d4ff]"
                        aria-hidden="true"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#080e1e] border border-[#00d4ff]/30 text-[#00d4ff] text-[10px] font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#00d4ff]/40 text-xs font-mono font-medium">
                        {step.number}
                      </span>
                      <h3
                        className="text-white font-semibold text-lg mt-0.5 mb-2"
                        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
