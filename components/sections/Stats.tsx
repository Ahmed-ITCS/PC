"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  {
    value: 100,
    suffix: "%",
    label: "Project Completion Rate",
    description: "Every engagement delivered",
  },
  {
    value: 50,
    suffix: "+",
    label: "Happy Clients",
    description: "Agencies, startups & enterprises",
  },
  {
    special: "24/7",
    label: "Support Available",
    description: "On-call for all active engagements",
  },
];

export function Stats() {
  return (
    <section
      className="relative py-20 md:py-24 border-y border-[#0F2A44]/6 overflow-hidden"
      aria-label="Company statistics"
      style={{ background: "transparent" }}
    >
      <div
        className="absolute inset-0 bg-[#0891B2]/[0.04]"
        aria-hidden="true"
      />
      <div className="relative z-10 container-max section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center space-y-1.5">
              <div
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                aria-label={`${stat.special ?? (stat.value + (stat.suffix ?? ""))} — ${stat.label}`}
              >
                {stat.special ? (
                  stat.special
                ) : (
                  <AnimatedCounter end={stat.value!} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-[#0F2A44] font-bold text-sm md:text-base tracking-wide">
                {stat.label}
              </div>
              <div className="text-[#8BA3B8] text-xs md:text-sm">{stat.description}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
