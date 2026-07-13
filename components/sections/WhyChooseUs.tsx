"use client";

import {
  Zap, ShieldCheck, GraduationCap, Target,
  Clock, Award, Lightbulb, Handshake,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { ClipReveal } from "@/components/ui/ClipReveal";

const reasons = [
  { icon: Zap,          color: "#00D4FF", title: "Rapid Development",   description: "Sprints start within two weeks of signing. We move fast without cutting corners on security or quality." },
  { icon: ShieldCheck,  color: "#7C3AED", title: "Enterprise Security",  description: "Every line of code is written with security in mind — OWASP compliance, secrets management, and zero-trust by default." },
  { icon: GraduationCap,color: "#10B981", title: "Expert Team",          description: "Senior engineers with 5–12 years of production experience. No juniors learning on your project." },
  { icon: Target,       color: "#F59E0B", title: "Business-Focused",     description: "We align technical decisions with your business outcomes — not just what's technically interesting." },
  { icon: Clock,        color: "#EC4899", title: "24/7 Support",         description: "Critical issues get a response at any hour. We maintain on-call coverage for all active engagements." },
  { icon: Award,        color: "#06B6D4", title: "Proven Track Record",  description: "100% project completion rate across 50+ clients. Zero security breaches across all client systems." },
  { icon: Lightbulb,    color: "#A78BFA", title: "Innovation First",     description: "We bring emerging technology — AI/ML integrations, edge compute, modern data stack — only when it genuinely adds value." },
  { icon: Handshake,    color: "#34D399", title: "Dedicated Partnership", description: "You get a named team that knows your codebase, context, and goals — not a ticket queue." },
];

export function WhyChooseUs() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-white"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 bg-glow-accent opacity-50" aria-hidden="true" />
      <GlowOrb className="top-1/3 right-0" size="lg" opacity={0.08} />

      <div className="relative z-10 container-max section-padding">
        <SectionNumber number="01" className="top-0 right-0 md:right-8" />
        <ClipReveal className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Why PentaCipher</SectionLabel>
          <h2
            id="why-choose-us-heading"
            className="text-display-lg font-display font-bold leading-tight text-balance max-w-3xl text-[#0F172A]"
          >
            Eight Reasons Clients{" "}
            <span className="gradient-text">Come Back Every Time</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl text-balance">
            We&apos;ve earned long-term partnerships by combining technical
            depth with a working style that feels like an internal team.
          </p>
        </ClipReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <FadeIn key={reason.title} delay={i * 0.07} direction="up">
                <TiltCard className="h-full rounded-xl" intensity={10}>
                  <div className="group relative flex flex-col gap-4 rounded-xl border border-[#E2E8F0] bg-white p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-[#CBD5E1] overflow-hidden">
                    {/* Hover top line */}
                    <div
                      className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
                      aria-hidden="true"
                    />

                    <div className="relative flex items-center justify-center w-11 h-11 rounded-xl border border-[#E2E8F0] bg-[#F1F5F9] text-accent transition-all duration-200 group-hover:scale-110">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <div className="relative space-y-2">
                      <h3
                        className="text-[#0F172A] font-bold text-sm"
                        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                      >
                        {reason.title}
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed">
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
