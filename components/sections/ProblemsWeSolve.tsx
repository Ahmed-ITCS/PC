"use client";

import {
  HeartHandshake, UserMinus, Timer,
  ShieldAlert,   TrendingUp,  Trophy,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const problems = [
  {
    icon: HeartHandshake,
    title: "Keep Clients Happy",
    color: "#00D4FF",
    bullets: [
      "On-time delivery with weekly visibility",
      "Clean, handoff-ready codebases clients love",
      "Proactive communication — no nasty surprises",
    ],
  },
  {
    icon: UserMinus,
    title: "Avoid Hiring Overhead",
    color: "#7C3AED",
    bullets: [
      "Skip recruitment, onboarding, and benefits costs",
      "Scale your technical capacity up or down instantly",
      "Senior talent without permanent head-count",
    ],
  },
  {
    icon: Timer,
    title: "Deliver On Time",
    color: "#10B981",
    bullets: [
      "Detailed scope and timeline agreed before work begins",
      "Agile two-week sprints with live staging demos",
      "Risk flagged early — never as a deadline excuse",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Reduce Technical Risk",
    color: "#F59E0B",
    bullets: [
      "Security-first architecture eliminates costly retrofits",
      "Automated testing catches regressions before production",
      "Architecture reviews prevent decisions you'll regret",
    ],
  },
  {
    icon: TrendingUp,
    title: "Scale Rapidly",
    color: "#EC4899",
    bullets: [
      "Cloud infrastructure designed for 10× traffic from day one",
      "Feature-flag driven releases enable zero-downtime scaling",
      "Observability stack built in so you can act before users notice",
    ],
  },
  {
    icon: Trophy,
    title: "Ensure Success",
    color: "#06B6D4",
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
      className="relative py-24 md:py-32 overflow-hidden bg-[#F8FAFC]"
      aria-labelledby="problems-heading"
    >
      <div
        className="absolute inset-0 bg-dot-pattern opacity-[0.5]"
        aria-hidden="true"
        style={{ backgroundSize: "24px 24px" }}
      />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Problems We Solve</SectionLabel>
          <h2
            id="problems-heading"
            className="text-display-lg font-bold text-balance max-w-3xl text-[#0F172A] font-display tracking-[-0.03em]"
          >
            The Challenges We&apos;re{" "}
            <span className="gradient-text">Built to Solve</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl text-balance">
            Every engagement starts with understanding your pain points.
            Here&apos;s what we hear most — and how we fix them.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <FadeIn key={problem.title} delay={i * 0.08} direction="up">
                <div className="group relative flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-card-hover overflow-hidden">
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(ellipse 70% 50% at 30% 0%, rgba(3,105,161,0.05) 0%, transparent 70%)" }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center gap-3.5">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#F1F5F9] text-accent border border-[#E2E8F0] transition-all duration-200 group-hover:scale-110"
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3
                      className="text-[#0F172A] font-bold text-base font-display tracking-[-0.02em]"
                    >
                      {problem.title}
                    </h3>
                  </div>

                  <ul className="relative space-y-2.5" role="list">
                    {problem.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[#475569] leading-relaxed">
                        <span
                          className="w-1 h-1 rounded-full shrink-0 mt-2 bg-accent"
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
