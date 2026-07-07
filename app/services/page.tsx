import type { Metadata } from "next";
import { Code2, Cloud, Shield, Layers, Workflow, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack development, DevOps infrastructure, security audits, and technical consulting — everything you need to ship secure software without an in-house team.",
};

const services = [
  {
    id: "fullstack",
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "We build production-ready web applications, APIs, and data pipelines — architected for scale, maintainability, and security from the ground up.",
    bullets: [
      "React, Next.js, Vue — modern frontend frameworks",
      "Node.js, Python, Go, Rust backends",
      "REST, GraphQL, and gRPC API design",
      "PostgreSQL, MongoDB, Redis, Elasticsearch",
      "Authentication, authorization, and RBAC",
      "E2E testing, unit tests, integration suites",
    ],
  },
  {
    id: "devops",
    icon: Cloud,
    title: "DevOps & Cloud Infrastructure",
    description:
      "We design and operate cloud infrastructure that scales with your product — CI/CD, container orchestration, and zero-downtime deployments.",
    bullets: [
      "AWS, GCP, Azure architecture and migration",
      "Kubernetes (EKS, GKE, AKS) and Helm charts",
      "Terraform, Pulumi infrastructure-as-code",
      "GitHub Actions, GitLab CI, CircleCI pipelines",
      "Docker containerization and image hardening",
      "Database backups, DR strategy, and failover",
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "Security-First Architecture",
    description:
      "Security isn't a checkbox — it's the foundation. We build it in from day one and audit it continuously.",
    bullets: [
      "OWASP Top 10 vulnerability assessment",
      "Static and dynamic application security testing (SAST/DAST)",
      "Secrets management (Vault, AWS Secrets Manager)",
      "Zero-trust network architecture design",
      "SOC 2 Type II readiness preparation",
      "Dependency audit and supply chain security",
    ],
    featured: true,
  },
  {
    id: "consulting",
    icon: Layers,
    title: "Technical Consulting",
    description:
      "Strategic technical guidance for CTOs, founders, and engineering leaders — make the right architectural decisions before they're expensive to change.",
    bullets: [
      "Architecture reviews and RFCs",
      "Technology selection and vendor evaluation",
      "Legacy system modernization roadmaps",
      "Technical due diligence for M&A",
      "Engineering team process and tooling audits",
      "Fractional CTO services",
    ],
  },
  {
    id: "augmentation",
    icon: Workflow,
    title: "Team Augmentation",
    description:
      "Embed battle-tested engineers and DevOps specialists directly into your team — as few as one sprint, as long as you need.",
    bullets: [
      "Senior full-stack engineers (React + Node/Python)",
      "DevOps and infrastructure specialists",
      "Security engineers",
      "Engineering managers and technical leads",
      "Seamless integration with your existing workflow",
      "Weekly progress reports and transparent billing",
    ],
  },
  {
    id: "observability",
    icon: BarChart3,
    title: "Observability & SRE",
    description:
      "You can't fix what you can't see. We instrument your systems so you always know what's happening — before your users do.",
    bullets: [
      "Distributed tracing with OpenTelemetry/Jaeger",
      "Metrics, dashboards, and alerting (Datadog, Grafana)",
      "Log aggregation and structured logging",
      "SLO/SLA definition and error budget tracking",
      "Chaos engineering and game days",
      "Incident response runbooks and on-call setup",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-label="Services hero">
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-100"
          aria-hidden="true"
        />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" opacity={0.05} />
        <div className="relative z-10 container-max section-padding text-center flex flex-col items-center gap-6">
          <FadeIn>
            <SectionLabel>Our Services</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance max-w-4xl"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Technical Excellence,{" "}
              <span className="gradient-text">Delivered End-to-End</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl text-balance">
              We cover every layer of the stack — from architecture through
              deployment, security, and operations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20" aria-label="Service details">
        <div className="container-max section-padding space-y-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={i * 0.05}>
                <div
                  id={service.id}
                  className={`relative rounded-2xl border p-8 md:p-10 transition-all duration-300 scroll-mt-24 ${
                    service.featured
                      ? "border-[#00d4ff]/25 bg-gradient-to-br from-[#00d4ff]/5 to-[#0d1529]/80"
                      : "border-white/6 bg-[#0d1529]/50 hover:border-white/10"
                  }`}
                >
                  {service.featured && (
                    <div className="absolute top-6 right-6">
                      <span className="tag">Core Differentiator</span>
                    </div>
                  )}
                  <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-start">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
                          <Icon className="w-6 h-6 text-[#00d4ff]" aria-hidden="true" />
                        </div>
                        <h2
                          className="text-xl md:text-2xl font-bold text-white"
                          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                        >
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-white/50 text-base leading-relaxed">
                        {service.description}
                      </p>
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-sm text-[#00d4ff] font-medium hover:text-[#00d4ff]/80 transition-colors"
                      >
                        Discuss this service
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-white/60">
                          <CheckCircle2
                            className="w-4 h-4 text-[#00d4ff]/60 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <CTA />
    </>
  );
}
