"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { Search, Pencil, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    color: "#00D4FF",
    title: "Discovery & Scoping",
    description:
      "We audit your current state, define precise requirements, and build a technical roadmap with risk assessment — before writing a single line of code.",
  },
  {
    icon: Pencil,
    number: "02",
    color: "#7C3AED",
    title: "Architecture & Design",
    description:
      "System design, data models, API contracts, and security architecture reviewed and approved before implementation begins.",
  },
  {
    icon: Rocket,
    number: "03",
    color: "#10B981",
    title: "Iterative Delivery",
    description:
      "Two-week sprints, daily standups, continuous deployment to staging. You see progress every week, not after six months.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    color: "#F59E0B",
    title: "Security & Handoff",
    description:
      "Pen testing, vulnerability scans, full documentation, runbooks, and a smooth knowledge transfer — so your team owns it completely.",
  },
];

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-white"
      aria-labelledby="process-heading"
    >
      <div
        className="absolute inset-0 bg-dot-pattern opacity-[0.4]"
        aria-hidden="true"
        style={{ backgroundSize: "24px 24px" }}
      />

      <div className="relative z-10 container-max section-padding">
        <SectionNumber number="02" className="top-0 left-0 md:left-8" />

        <ClipReveal className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>How We Work</SectionLabel>
          <h2
            id="process-heading"
            className="text-display-lg font-bold text-balance max-w-3xl text-[#0F172A]"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            A Process Built for{" "}
            <span className="gradient-text">Predictable Outcomes</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-xl text-balance">
            No surprises, no scope creep. Just a proven framework for shipping
            secure software on time.
          </p>
        </ClipReveal>

        <div className="relative">
          {/* Animated connector line */}
          <motion.div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[#E2E8F0]"
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { scaleX: 0, transformOrigin: "left center" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={i * 0.1} direction="up">
                  <div className="group flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                    <div
                      className="relative flex items-center justify-center w-12 h-12 rounded-xl border border-[#E2E8F0] bg-[#F1F5F9] text-accent transition-all duration-300 group-hover:scale-110"
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      <span
                        className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full border border-accent/30 bg-white text-accent text-[10px] font-bold"
                      >
                        {i + 1}
                      </span>
                    </div>

                    <div>
                      <span
                        className="font-mono font-medium text-xs text-accent/60"
                      >
                        {step.number}
                      </span>
                      <h3
                        className="text-[#0F172A] font-semibold text-lg mt-0.5 mb-2"
                        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed">
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
