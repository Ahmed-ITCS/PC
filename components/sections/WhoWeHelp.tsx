"use client";

import { Building2, Rocket, Briefcase, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";

const segments = [
  {
    icon: Building2,
    title: "Digital Agencies",
    color: "text-[#00d4ff]",
    bg: "bg-[#00d4ff]/8",
    border: "border-[#00d4ff]/20",
    challenges: [
      "Clients demand technical deliverables you don't have in-house",
      "Tight margins make hiring full-time engineers impractical",
      "Delivery delays threaten client relationships and renewals",
    ],
  },
  {
    icon: Rocket,
    title: "Growing Startups",
    color: "text-violet-600",
    bg: "bg-violet-500/8",
    border: "border-violet-400/20",
    challenges: [
      "Moving fast creates security and technical debt you'll pay later",
      "Hiring senior engineers at early-stage budgets is nearly impossible",
      "Scaling infrastructure beyond the MVP without dedicated DevOps expertise",
    ],
  },
  {
    icon: Briefcase,
    title: "Enterprise Businesses",
    color: "text-emerald-700",
    bg: "bg-emerald-500/8",
    border: "border-emerald-400/20",
    challenges: [
      "Legacy systems blocking adoption of modern cloud-native architecture",
      "Compliance requirements (SOC 2, ISO 27001) slow development velocity",
      "Internal teams lack specialised DevOps and security expertise",
    ],
  },
  {
    icon: Users,
    title: "Consulting Firms",
    color: "text-amber-700",
    bg: "bg-amber-500/8",
    border: "border-amber-400/20",
    challenges: [
      "Advising on technical strategy without a trusted delivery partner",
      "Client engagements expand into execution you're not staffed for",
      "Technology recommendations need a vetted team to bring them to life",
    ],
  },
];

export function WhoWeHelp() {
  return (
    <section
      className="relative py-24 md:py-32 bg-[#D4EEF5] overflow-hidden"
      aria-labelledby="who-we-help-heading"
    >
      <div
        className="absolute inset-0 bg-glow-cyan opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Who We Help</SectionLabel>
          <h2
            id="who-we-help-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Built for Teams That Need to{" "}
            <span className="gradient-text">Move Without Friction</span>
          </h2>
          <p className="text-[#0A1B2E]/55 text-lg max-w-2xl text-balance">
            We work with four types of organisations — each with distinct
            challenges we&apos;ve solved dozens of times over.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <FadeIn key={seg.title} delay={i * 0.1} direction="up">
                <TiltCard className="h-full rounded-2xl">
                <div className="flex flex-col gap-5 rounded-2xl border border-[#0A1B2E]/8 bg-white/80 p-7 h-full hover:border-[#00d4ff]/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(10,27,46,0.1)] transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-13 h-13 rounded-xl border ${seg.bg} ${seg.border} shadow-[0_0_14px_rgba(10,27,46,0.06)]`}
                      style={{ width: "3.25rem", height: "3.25rem" }}
                    >
                      <Icon className={`w-6 h-6 ${seg.color}`} aria-hidden="true" />
                    </div>
                    <h3
                      className="text-[#0A1B2E] font-semibold text-lg"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {seg.title}
                    </h3>
                  </div>

                  <ul className="space-y-3" role="list">
                    {seg.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-sm text-[#0A1B2E]/55 leading-relaxed">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${seg.color.replace("text-", "bg-")} shrink-0 mt-2`}
                          aria-hidden="true"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
