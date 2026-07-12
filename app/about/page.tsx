import type { Metadata } from "next";
import { Shield, Target, Heart, Zap } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { CTA } from "@/components/sections/CTA";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About",
  description:
    "PentaCipher is a security-first software consultancy founded by engineers who believe great software must be secure by design, not by afterthought.",
};

const values = [
  {
    icon: Shield,
    title: "Security First, Always",
    description:
      "We don't bolt on security at the end. Threat modeling, secure defaults, and vulnerability scanning are part of every sprint from day one.",
  },
  {
    icon: Target,
    title: "Precision Over Speed",
    description:
      "We'd rather set a realistic timeline and hit it than overpromise. Rework is expensive; getting it right the first time isn't.",
  },
  {
    icon: Heart,
    title: "Partner Mentality",
    description:
      "Your success is our metric. We push back on bad ideas, flag risks early, and celebrate your wins as our own.",
  },
  {
    icon: Zap,
    title: "Relentless Iteration",
    description:
      "Working software over comprehensive documentation. Every two weeks you see new functionality — not slide decks.",
  },
];

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & Lead Architect",
    bio: "10 years shipping distributed systems at Series A–C startups. Previously staff engineer at two YC companies.",
    initial: "A",
    expertise: ["System Design", "Go", "AWS"],
  },
  {
    name: "Nadia Okonkwo",
    role: "Head of Security",
    bio: "OSCP-certified, former red-team consultant. Believes that the best security is the kind developers don't notice.",
    initial: "N",
    expertise: ["Pen Testing", "OWASP", "SOC 2"],
  },
  {
    name: "Tom Vasquez",
    role: "DevOps Lead",
    bio: "Built and managed infra for 50M+ user platforms. Kubernetes fanatic. Speaks fluent Terraform.",
    initial: "T",
    expertise: ["Kubernetes", "Terraform", "SRE"],
  },
  {
    name: "Yuki Tanaka",
    role: "Full-Stack Engineer",
    bio: "Full-stack generalist with a bias toward clean interfaces and boring, reliable backends.",
    initial: "Y",
    expertise: ["React", "Next.js", "PostgreSQL"],
  },
];

const milestones = [
  { year: "2016", event: "PentaCipher founded by two engineers tired of insecure software" },
  { year: "2018", event: "First enterprise client — a Fortune 500 financial firm" },
  { year: "2020", event: "Expanded to 12-person team, launched DevOps practice" },
  { year: "2022", event: "120+ projects delivered, zero client security incidents" },
  { year: "2024", event: "Named a top B2B software consultancy by G2 peer reviews" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-label="About hero">
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-80"
          aria-hidden="true"
        />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" opacity={0.06} />
        <div className="relative z-10 container-max section-padding flex flex-col items-center text-center gap-6">
          <FadeIn>
            <SectionLabel>About PentaCipher</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance max-w-4xl"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              We Build Software the Way{" "}
              <span className="gradient-text">It Should Be Built</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#0A1B2E]/55 text-lg max-w-2xl text-balance">
              Founded by engineers who got tired of shipping software that worked
              but wasn&apos;t secure — PentaCipher exists to prove you don&apos;t have to
              choose between speed and security.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-[#0A1B2E] border-y border-white/5" aria-labelledby="mission-heading">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="space-y-6">
                <h2
                  id="mission-heading"
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  Our Mission
                </h2>
                <p className="text-white/60 text-base leading-relaxed">
                  Most software development shops treat security as a last step —
                  a box to check before launch. We think that&apos;s backwards.
                </p>
                <p className="text-white/60 text-base leading-relaxed">
                  PentaCipher was built around one conviction: that security-first
                  execution isn&apos;t a premium add-on, it&apos;s the only way to build
                  software that survives contact with the real world.
                </p>
                <p className="text-white/60 text-base leading-relaxed">
                  We help digital agencies, growing startups, and enterprises
                  ship with the technical depth of a world-class engineering team
                  — without the overhead of building one.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 120, suffix: "+", label: "Projects" },
                  { value: 98, suffix: "%", label: "Retention Rate" },
                  { value: 8, suffix: "+", label: "Years Active" },
                  { special: "Zero", label: "Breaches" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/8 bg-white/[0.06] p-6 text-center"
                  >
                    <div
                      className="text-3xl font-bold gradient-text-light mb-1"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {stat.special ? (
                        stat.special
                      ) : (
                        <AnimatedCounter end={stat.value!} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className="text-white/45 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32" aria-labelledby="values-heading">
        <div className="container-max section-padding">
          <FadeIn className="flex flex-col items-center text-center gap-5 mb-14">
            <SectionLabel>What Drives Us</SectionLabel>
            <h2
              id="values-heading"
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Our Core Values
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={v.title} delay={i * 0.1}>
                  <div className="flex gap-5 p-6 rounded-xl border border-[#0A1B2E]/8 bg-white/80 hover:border-[#00d4ff]/20 transition-colors">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 shrink-0">
                      <Icon className="w-5 h-5 text-[#00d4ff]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3
                        className="text-[#0A1B2E] font-semibold text-base mb-1.5"
                        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                      >
                        {v.title}
                      </h3>
                      <p className="text-[#0A1B2E]/50 text-sm leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-28 bg-[#D4EEF5] border-y border-[#0A1B2E]/8" aria-labelledby="team-heading">
        <div className="container-max section-padding">
          <FadeIn className="flex flex-col items-center text-center gap-5 mb-14">
            <SectionLabel>The Team</SectionLabel>
            <h2
              id="team-heading"
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Senior Engineers, Not Juniors Learning on Your Dime
            </h2>
            <p className="text-[#0A1B2E]/55 text-base max-w-xl text-balance">
              Every engagement is led by a senior engineer with 7+ years of
              production experience.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="flex flex-col p-6 rounded-xl border border-[#0A1B2E]/8 bg-white/80 hover:border-[#00d4ff]/20 hover:-translate-y-1 transition-all duration-300 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#00d4ff]/12 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] font-bold text-lg" aria-hidden="true">
                      {member.initial}
                    </div>
                    <div>
                      <p className="text-[#0A1B2E] font-semibold text-sm">{member.name}</p>
                      <p className="text-[#00d4ff]/80 text-xs">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-[#0A1B2E]/50 text-sm leading-relaxed flex-1">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.expertise.map((e) => (
                      <span
                        key={e}
                        className="px-2.5 py-0.5 rounded-md text-xs bg-[#0A1B2E]/5 border border-[#0A1B2E]/8 text-[#0A1B2E]/50"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32" aria-labelledby="history-heading">
        <div className="container-max section-padding">
          <FadeIn className="flex flex-col items-center text-center gap-5 mb-14">
            <SectionLabel>Our Journey</SectionLabel>
            <h2
              id="history-heading"
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Eight Years of Shipping with Confidence
            </h2>
          </FadeIn>
          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.08}>
                <div className="flex gap-6 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#00d4ff] border-2 border-[#EBF6F9] mt-1.5 shrink-0 shadow-glow-sm" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-[#00d4ff]/30 to-transparent mt-1 mb-0" style={{ minHeight: "40px" }} />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-[#00d4ff] text-sm font-mono font-semibold">{m.year}</span>
                    <p className="text-[#0A1B2E]/60 text-sm mt-1 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
