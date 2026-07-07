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
      className="relative py-20 md:py-24 bg-[#080e1e] border-y border-white/5 overflow-hidden"
      aria-label="Company statistics"
    >
      <div
        className="absolute inset-0 bg-glow-cyan opacity-60"
        aria-hidden="true"
      />
      <div className="relative z-10 container-max section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center space-y-1.5">
              <div
                className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                aria-label={`${stat.special ?? (stat.value + (stat.suffix ?? ""))} — ${stat.label}`}
              >
                {stat.special ? (
                  stat.special
                ) : (
                  <AnimatedCounter end={stat.value!} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-white/80 font-semibold text-sm md:text-base">
                {stat.label}
              </div>
              <div className="text-white/35 text-xs md:text-sm">{stat.description}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
