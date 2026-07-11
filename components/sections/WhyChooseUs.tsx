"use client";

import {
  Zap,
  ShieldCheck,
  GraduationCap,
  Target,
  Clock,
  Award,
  Lightbulb,
  Handshake,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";

const reasons = [
  {
    icon: Zap,
    title: "Rapid Development",
    description:
      "Sprints start within two weeks of signing. We move fast without cutting corners on security or quality.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Every line of code is written with security in mind — OWASP compliance, secrets management, and zero-trust by default.",
  },
  {
    icon: GraduationCap,
    title: "Expert Team",
    description:
      "Senior engineers with 5–12 years of production experience. No juniors learning on your project.",
  },
  {
    icon: Target,
    title: "Business-Focused",
    description:
      "We align technical decisions with your business outcomes — not just what's technically interesting.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Critical issues get a response at any hour. We maintain on-call coverage for all active engagements.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "100% project completion rate across 50+ clients. Zero security breaches across all client systems.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We bring emerging technology — AI/ML integrations, edge compute, modern data stack — only when it genuinely adds value.",
  },
  {
    icon: Handshake,
    title: "Dedicated Partnership",
    description:
      "You get a named team that knows your codebase, context, and goals — not a ticket queue.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="why-choose-us-heading"
      style={{ background: "transparent" }}
    >
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-60"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-glow-cyan opacity-30" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Why PentaCipher</SectionLabel>
          <h2
            id="why-choose-us-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Eight Reasons Clients{" "}
            <span className="gradient-text">Come Back Every Time</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl text-balance">
            We&apos;ve earned long-term partnerships by combining technical
            depth with a working style that feels like an internal team.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <FadeIn key={reason.title} delay={i * 0.07} direction="up">
                <TiltCard className="h-full rounded-xl" intensity={10}>
                <div className="group flex flex-col gap-4 rounded-xl border border-white/6 bg-[#0d1529]/30 p-6 h-full hover:border-[#00d4ff]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,212,255,0.06)] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#00d4ff]/15 to-[#00d4ff]/5 border border-[#00d4ff]/20 group-hover:border-[#00d4ff]/35 group-hover:shadow-[0_0_16px_rgba(0,212,255,0.15)] transition-all duration-200">
                    <Icon className="w-5 h-5 text-[#00d4ff]" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {reason.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
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
