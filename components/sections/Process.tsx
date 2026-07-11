"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Search, Pencil, Rocket, ShieldCheck } from "lucide-react";

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
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>How We Work</SectionLabel>
          <h2
            id="process-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            A Process Built for{" "}
            <span className="gradient-text">Predictable Outcomes</span>
          </h2>
          <p className="text-[#4A6580] text-lg max-w-xl text-balance">
            No surprises, no scope creep. Just a proven framework for shipping
            secure software on time.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#0891B2]/15 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={i * 0.1} direction="up">
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#0891B2]/8 border border-[#0891B2]/15">
                      <Icon
                        className="w-5 h-5 text-[#0891B2]"
                        aria-hidden="true"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#F0F7FA] border border-[#0891B2]/25 text-[#0891B2] text-[10px] font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8BA3B8] text-xs font-mono font-medium">
                        {step.number}
                      </span>
                      <h3
                        className="text-[#0F2A44] font-semibold text-lg mt-0.5 mb-2"
                        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[#4A6580] text-sm leading-relaxed">
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
