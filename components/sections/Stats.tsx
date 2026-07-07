"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  {
    value: 120,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across 6 industries",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    description: "Year-over-year",
  },
  {
    value: 0,
    suffix: "",
    prefix: "",
    label: "Security Breaches",
    description: "Across all client systems",
    special: "Zero",
  },
  {
    value: 8,
    suffix: "+",
    label: "Years of Experience",
    description: "In B2B software delivery",
  },
];

export function Stats() {
  return (
    <section
      className="relative py-20 md:py-24 bg-[#080e1e] border-y border-white/5 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 bg-glow-cyan opacity-60"
        aria-hidden="true"
      />
      <div className="relative z-10 container-max section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center space-y-1.5">
              <div
                className="text-4xl md:text-5xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                aria-label={`${stat.special ?? (stat.value + stat.suffix)} ${stat.label}`}
              >
                {stat.special ? (
                  stat.special
                ) : (
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                )}
              </div>
              <div className="text-white/80 font-semibold text-sm md:text-base">
                {stat.label}
              </div>
              <div className="text-white/35 text-xs md:text-sm">
                {stat.description}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
