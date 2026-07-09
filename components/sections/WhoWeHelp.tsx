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
    border: "border-[#00d4ff]/15",
    challenges: [
      "Clients demand technical deliverables you don't have in-house",
      "Tight margins make hiring full-time engineers impractical",
      "Delivery delays threaten client relationships and renewals",
    ],
  },
  {
    icon: Rocket,
    title: "Growing Startups",
    color: "text-violet-400",
    bg: "bg-violet-500/8",
    border: "border-violet-400/15",
    challenges: [
      "Moving fast creates security and technical debt you'll pay later",
      "Hiring senior engineers at early-stage budgets is nearly impossible",
      "Scaling infrastructure beyond the MVP without dedicated DevOps expertise",
    ],
  },
  {
    icon: Briefcase,
    title: "Enterprise Businesses",
    color: "text-emerald-400",
    bg: "bg-emerald-500/8",
    border: "border-emerald-400/15",
    challenges: [
      "Legacy systems blocking adoption of modern cloud-native architecture",
      "Compliance requirements (SOC 2, ISO 27001) slow development velocity",
      "Internal teams lack specialised DevOps and security expertise",
    ],
  },
  {
    icon: Users,
    title: "Consulting Firms",
    color: "text-amber-400",
    bg: "bg-amber-500/8",
    border: "border-amber-400/15",
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
      className="relative py-24 md:py-32 bg-[#080e1e] overflow-hidden"
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
          <p className="text-white/50 text-lg max-w-2xl text-balance">
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
                <div className="flex flex-col gap-5 rounded-2xl border border-white/6 bg-[#0d1529]/50 p-7 h-full hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-11 h-11 rounded-xl border ${seg.bg} ${seg.border}`}
                    >
                      <Icon className={`w-5 h-5 ${seg.color}`} aria-hidden="true" />
                    </div>
                    <h3
                      className="text-white font-semibold text-lg"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {seg.title}
                    </h3>
                  </div>

                  <ul className="space-y-3" role="list">
                    {seg.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
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
