"use client";

import Link from "next/link";
import {
  Code2,
  Cloud,
  Shield,
  Layers,
  Workflow,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "React, Next.js, Node, Python, Go — we build scalable web and API systems using the right stack for your use case, not just what's trending.",
    tags: ["React", "Next.js", "Node", "PostgreSQL"],
    href: "/services#fullstack",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud Infrastructure",
    description:
      "CI/CD pipelines, Kubernetes orchestration, AWS/GCP/Azure — we automate everything so your team ships faster with zero operational friction.",
    tags: ["AWS", "Kubernetes", "Terraform", "GitHub Actions"],
    href: "/services#devops",
  },
  {
    icon: Shield,
    title: "Security-First Architecture",
    description:
      "Threat modeling, OWASP compliance, pen testing, secret scanning, and vulnerability audits baked into every deliverable.",
    tags: ["OWASP", "SAST/DAST", "SOC 2", "Zero Trust"],
    href: "/services#security",
    featured: true,
  },
  {
    icon: Layers,
    title: "Technical Consulting",
    description:
      "Architecture reviews, technology roadmaps, legacy modernization, and make-vs-buy analysis — strategic clarity before you build.",
    tags: ["Architecture", "Roadmap", "Modernization"],
    href: "/services#consulting",
  },
  {
    icon: Workflow,
    title: "Team Augmentation",
    description:
      "Embed senior engineers and DevOps specialists directly into your agency or product team to close skill gaps fast.",
    tags: ["Senior Engineers", "Staff Aug", "Fractional CTO"],
    href: "/services#augmentation",
  },
  {
    icon: BarChart3,
    title: "Observability & SRE",
    description:
      "Distributed tracing, alerting, SLOs, incident response runbooks — we make sure you see problems before your users do.",
    tags: ["Datadog", "OpenTelemetry", "SLOs", "On-call"],
    href: "/services#observability",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="container-max section-padding">
        {/* Header */}
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>What We Do</SectionLabel>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl text-[#0F2A44]"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Everything Your Project Needs —{" "}
            <span className="gradient-text">None of the Overhead</span>
          </h2>
          <p className="text-[#4A6580] text-lg max-w-2xl text-balance">
            From first commit to production, we handle the full technical stack
            so you can focus on your business.
          </p>
        </FadeIn>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={i * 0.08} direction="up">
                <Link
                  href={service.href}
                  className={`group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#0891B2] outline-none h-full ${
                    service.featured
                      ? "border-[#0891B2]/25 bg-gradient-to-b from-[#0891B2]/[0.06] to-[#E8F1F5]/80 shadow-[0_0_0_1px_rgba(8,145,178,0.15),0_8px_32px_rgba(15,42,68,0.06)]"
                      : "border-[#0F2A44]/8 bg-white/70 hover:border-[#0891B2]/20 hover:bg-white hover:shadow-[0_0_0_1px_rgba(8,145,178,0.1),0_16px_48px_rgba(15,42,68,0.06)]"
                  }`}
                  aria-label={`${service.title} — Learn more`}
                >
                  {service.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="tag text-[10px]">Core Differentiator</span>
                    </div>
                  )}
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-colors duration-200 ${
                      service.featured
                        ? "bg-[#0891B2]/10 border-[#0891B2]/25 group-hover:bg-[#0891B2]/15"
                        : "bg-[#0891B2]/[0.06] border-[#0891B2]/15 group-hover:bg-[#0891B2]/10"
                    }`}
                  >
                    <Icon
                      className="w-5 h-5 text-[#0891B2]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3
                      className="text-[#0F2A44] font-semibold text-base group-hover:text-[#0F2A44] transition-colors"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-[#4A6580] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#E8F1F5]/70 border border-[#0F2A44]/8 text-[#4A6580] text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[#0891B2]/60 group-hover:text-[#0891B2] text-xs font-medium transition-colors duration-200 mt-1">
                    Learn more
                    <ArrowRight
                      className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.4} className="flex justify-center mt-14">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-[#0F2A44]/10 text-[#4A6580] hover:border-[#0891B2]/30 hover:text-[#0F2A44] hover:bg-[#0891B2]/5 transition-all duration-200"
          >
            View all services
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
