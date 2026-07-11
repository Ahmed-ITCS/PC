"use client";

import {
  HeartHandshake,
  UserMinus,
  Timer,
  ShieldAlert,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const problems = [
  {
    icon: HeartHandshake,
    title: "Keep Clients Happy",
    bullets: [
      "On-time delivery with weekly visibility",
      "Clean, handoff-ready codebases clients love",
      "Proactive communication — no nasty surprises",
    ],
  },
  {
    icon: UserMinus,
    title: "Avoid Hiring Overhead",
    bullets: [
      "Skip recruitment, onboarding, and benefits costs",
      "Scale your technical capacity up or down instantly",
      "Senior talent without permanent head-count",
    ],
  },
  {
    icon: Timer,
    title: "Deliver On Time",
    bullets: [
      "Detailed scope and timeline agreed before work begins",
      "Agile two-week sprints with live staging demos",
      "Risk flagged early — never as a deadline excuse",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Reduce Technical Risk",
    bullets: [
      "Security-first architecture eliminates costly retrofits",
      "Automated testing catches regressions before production",
      "Architecture reviews prevent decisions you'll regret",
    ],
  },
  {
    icon: TrendingUp,
    title: "Scale Rapidly",
    bullets: [
      "Cloud infrastructure designed for 10× traffic from day one",
      "Feature-flag driven releases enable zero-downtime scaling",
      "Observability stack built in so you can act before users notice",
    ],
  },
  {
    icon: Trophy,
    title: "Ensure Success",
    bullets: [
      "100% project completion rate across all engagements",
      "Full documentation and runbooks handed over at close",
      "Optional ongoing retainer for SRE and support",
    ],
  },
];

export function ProblemsWeSolve() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="problems-heading"
      style={{ background: "transparent" }}
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 bg-dot-pattern opacity-35"
        aria-hidden="true"
        style={{ backgroundSize: "24px 24px" }}
      />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Problems We Solve</SectionLabel>
          <h2
            id="problems-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            The Challenges We&apos;re{" "}
            <span className="gradient-text">Built to Solve</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl text-balance">
            Every engagement starts with understanding your pain points.
            Here&apos;s what we hear most — and how we fix them.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <FadeIn key={problem.title} delay={i * 0.08} direction="up">
                <div className="group flex flex-col gap-4 rounded-xl border border-white/6 bg-[#0d1529]/30 p-6 h-full hover:border-[#00d4ff]/20 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,212,255,0.05)] transition-all duration-300 backdrop-blur-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 group-hover:bg-[#00d4ff]/15 group-hover:border-[#00d4ff]/30 transition-all duration-200 shadow-[0_0_12px_rgba(0,212,255,0.08)]">
                      <Icon className="w-5 h-5 text-[#00d4ff]" aria-hidden="true" />
                    </div>
                    <h3
                      className="text-white font-bold text-base"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {problem.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5" role="list">
                    {problem.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-white/45 leading-relaxed">
                        <span
                          className="w-1 h-1 rounded-full bg-[#00d4ff]/50 shrink-0 mt-2"
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
