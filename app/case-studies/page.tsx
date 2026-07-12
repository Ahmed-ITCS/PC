import type { Metadata } from "next";
import { Clock, Users, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from real engagements. See how PentaCipher helped agencies, startups, and enterprises ship secure, scalable software.",
};

const cases = [
  {
    slug: "fintech-platform",
    label: "FinTech",
    title: "SOC 2 Type II–Ready Payment Platform in 14 Weeks",
    client: "Meridian Financial",
    overview:
      "Meridian needed to rebuild their payment processing infrastructure from a legacy Rails monolith to a modern microservices architecture — with SOC 2 compliance as a hard requirement.",
    challenge:
      "The existing codebase had critical OWASP vulnerabilities, no CI/CD pipeline, and deployments required manual SSH access to production servers.",
    outcome:
      "We delivered a fully containerized platform with automated security scanning in every PR, zero-downtime deployments, and passed their SOC 2 audit with zero findings in the security section.",
    metrics: [
      { label: "Deployment time", before: "4 hours", after: "8 minutes" },
      { label: "Security findings", before: "23 critical", after: "0" },
      { label: "Uptime", before: "97.2%", after: "99.95%" },
    ],
    tech: ["Go", "Kubernetes", "PostgreSQL", "Vault", "GitHub Actions"],
    duration: "14 weeks",
    teamSize: "4 engineers",
  },
  {
    slug: "agency-platform",
    label: "Digital Agency",
    title: "Headless CMS Platform Serving 40+ Agency Clients",
    client: "Cascadia Creative",
    overview:
      "A 25-person digital agency needed to stop rebuilding the same CMS infrastructure for every client and build a shared platform their developers could customize quickly.",
    challenge:
      "Each client had unique auth, content modeling, and deployment requirements. The previous approach of copying boilerplate was leading to version drift and security incidents.",
    outcome:
      "A white-label Next.js + Sanity.io platform with tenant isolation, shared CDN configuration, and a one-command deployment flow. New client onboarding went from 3 days to 4 hours.",
    metrics: [
      { label: "Client onboarding", before: "3 days", after: "4 hours" },
      { label: "Infra cost per client", before: "$340/mo", after: "$85/mo" },
      { label: "Security incidents", before: "3/year", after: "0" },
    ],
    tech: ["Next.js", "Sanity.io", "Vercel", "Cloudflare", "TypeScript"],
    duration: "10 weeks",
    teamSize: "3 engineers",
  },
  {
    slug: "saas-mvp",
    label: "Startup",
    title: "B2B SaaS MVP: Zero to Production in 12 Weeks",
    client: "NovaTech Solutions",
    overview:
      "A first-time founder with a validated business idea needed to go from Figma mockups to a production SaaS product — without hiring a full engineering team.",
    challenge:
      "Limited runway, no technical co-founder, and investors expecting an MVP demo in 90 days.",
    outcome:
      "Full product: auth, billing (Stripe), dashboard, API, admin panel, automated tests, and CI/CD. Launched on time. Raised a $2.4M seed round with the live product.",
    metrics: [
      { label: "Time to production", before: "—", after: "12 weeks" },
      { label: "Test coverage", before: "0%", after: "78%" },
      { label: "Seed raise post-launch", before: "—", after: "$2.4M" },
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    duration: "12 weeks",
    teamSize: "3 engineers",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-label="Case studies hero">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-100" aria-hidden="true" />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" opacity={0.05} />
        <div className="relative z-10 container-max section-padding flex flex-col items-center text-center gap-6">
          <FadeIn>
            <SectionLabel>Case Studies</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance max-w-4xl"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Results, Not Promises
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#0A1B2E]/55 text-lg max-w-2xl text-balance">
              Three representative engagements that show how we work and what we
              deliver.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-12 md:py-16" aria-label="Case study list">
        <div className="container-max section-padding space-y-10">
          {cases.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 0.08}>
              <article
                className="rounded-2xl border border-[#0A1B2E]/8 bg-white/80 hover:border-[#00d4ff]/15 hover:shadow-[0_8px_32px_rgba(10,27,46,0.08)] transition-all duration-300 overflow-hidden"
                aria-labelledby={`case-${c.slug}-title`}
              >
                <div className="p-8 md:p-10 space-y-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="tag">{c.label}</span>
                      <h2
                        id={`case-${c.slug}-title`}
                        className="text-xl md:text-2xl font-bold text-[#0A1B2E] mt-2"
                        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                      >
                        {c.title}
                      </h2>
                      <p className="text-[#0A1B2E]/40 text-sm">{c.client}</p>
                    </div>
                    <div className="flex items-center gap-4 text-[#0A1B2E]/35 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {c.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" aria-hidden="true" />
                        {c.teamSize}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <h3 className="text-[#0A1B2E]/60 text-xs font-semibold uppercase tracking-widest">Overview</h3>
                      <p className="text-[#0A1B2E]/50 text-sm leading-relaxed">{c.overview}</p>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-[#0A1B2E]/60 text-xs font-semibold uppercase tracking-widest">Challenge</h3>
                      <p className="text-[#0A1B2E]/50 text-sm leading-relaxed">{c.challenge}</p>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-[#00d4ff]/70 text-xs font-semibold uppercase tracking-widest">Outcome</h3>
                      <p className="text-[#0A1B2E]/60 text-sm leading-relaxed">{c.outcome}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[#EBF6F9]/60 border border-[#0A1B2E]/8">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-[#00d4ff]/60 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-[#0A1B2E]/40 text-xs">{m.label}</p>
                          <div className="flex items-center gap-2 text-sm">
                            {m.before !== "—" && (
                              <>
                                <span className="text-[#0A1B2E]/35 line-through text-xs">{m.before}</span>
                                <span className="text-[#0A1B2E]/25 text-xs">→</span>
                              </>
                            )}
                            <span className="text-[#0A1B2E] font-semibold">{m.after}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[#0A1B2E]/35 text-xs mr-1">Stack:</span>
                    {c.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#0A1B2E]/5 border border-[#0A1B2E]/8 text-[#0A1B2E]/45 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
