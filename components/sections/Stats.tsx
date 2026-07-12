"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { TextScramble } from "@/components/ui/TextScramble";
import { StatsScene } from "@/components/3d/StatsScene";

const stats = [
  {
    value: "100%",
    label: "Project Completion Rate",
    description: "Every engagement delivered",
  },
  {
    value: "50+",
    label: "Happy Clients",
    description: "Agencies, startups & enterprises",
  },
  {
    value: "24/7",
    label: "Support Available",
    description: "On-call for all active engagements",
  },
];

export function Stats() {
  return (
    <section
      className="relative py-20 md:py-24 bg-[#0A1B2E] border-y border-white/5 overflow-hidden"
      aria-label="Company statistics"
    >
      <SectionNumber number="04" className="top-2 right-0 md:right-8" />
      <div
        className="absolute inset-0 bg-glow-cyan opacity-50"
        aria-hidden="true"
      />
      <div className="relative z-10 container-max section-padding">
        <StatsScene />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center space-y-2">
              <div
                className="font-bold gradient-text-light"
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
              <div className="text-white/90 font-bold text-sm md:text-base tracking-wide">
                {stat.label}
              </div>
              <div className="text-white/45 text-xs md:text-sm">{stat.description}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
