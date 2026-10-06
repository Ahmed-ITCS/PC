"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { TextScramble } from "@/components/ui/TextScramble";

const stats = [
  {
    value: "100%",
    label: "Project Completion Rate",
    description: "Every engagement delivered",
    color: "#5BC8FF",
  },
  {
    value: "50+",
    label: "Happy Clients",
    description: "Agencies, startups & enterprises",
    color: "#46E6C5",
  },
  {
    value: "24/7",
    label: "Support Available",
    description: "On-call for all active engagements",
    color: "#46E6C5",
  },
];

export function Stats() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden bg-[#0A0E14]"
      aria-label="Company statistics"
    >
      <SectionNumber number="04" className="top-2 right-0 md:right-8" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-25" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-glow-accent opacity-50"
        aria-hidden="true"
      />

      {/* Horizontal accent lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2A3742] to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2A3742] to-transparent" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.12} className="text-center space-y-3">
              {/* Value */}
              <div
                className="font-bold text-[#E7EEF0]"
                style={{
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  lineHeight: "1.0",
                  letterSpacing: "-0.03em",
                }}
                aria-label={`${stat.value} — ${stat.label}`}
              >
                <TextScramble text={stat.value} trigger="inview" duration={700} delay={i * 100} />
              </div>

              {/* Divider */}
              <div
                className="w-10 h-0.5 mx-auto bg-accent"
                aria-hidden="true"
              />

              <div className="text-[#E7EEF0] font-bold text-sm md:text-base tracking-wide">
                {stat.label}
              </div>
              <div className="text-[#7C8C92] text-xs md:text-sm">{stat.description}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
