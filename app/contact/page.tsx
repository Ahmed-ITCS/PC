import type { Metadata } from "next";
import { Mail, MessageSquare, Calendar, Shield } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { ContactFormFull } from "@/components/ContactFormFull";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with PentaCipher. Tell us about your needs and we'll respond within one business day with a scoping plan.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@pentacipher.com",
    href: "mailto:hello@pentacipher.com",
  },
  {
    icon: MessageSquare,
    label: "Response time",
    value: "Within 1 business day",
    href: null,
  },
  {
    icon: Calendar,
    label: "Free scoping call",
    value: "30 minutes, no commitment",
    href: null,
  },
];

const faqs = [
  {
    q: "How quickly can you start?",
    a: "Typically within 1–2 weeks of signing. We keep a small reserve of capacity for new engagements.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Absolutely. Some of our best work is MVPs. We scope engagements to match your runway.",
  },
  {
    q: "What's your billing model?",
    a: "Fixed-scope projects with milestone billing, or monthly retainers for ongoing work. We don't do hourly.",
  },
  {
    q: "Can you work with our existing dev team?",
    a: "Yes — team augmentation is one of our most common engagement types. We fit into your workflow.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" aria-label="Contact hero">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-80" aria-hidden="true" />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" opacity={0.06} />
        <div className="relative z-10 container-max section-padding flex flex-col items-center text-center gap-6">
          <FadeIn>
            <SectionLabel>Get in Touch</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance max-w-3xl text-[#0F172A]"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Let&apos;s Build{" "}
              <span className="gradient-text">Something Secure</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#475569] text-lg max-w-xl text-balance">
              Tell us about your project and we&apos;ll respond within one business
              day with a scoping plan and honest timeline estimate.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16 pb-24 md:pb-32 bg-[#F8FAFC]" aria-label="Contact form and info">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16 items-start">
            {/* Form */}
            <FadeIn direction="right">
              <ContactFormFull />
            </FadeIn>

            {/* Sidebar */}
            <div className="space-y-8">
              <FadeIn direction="left" delay={0.1}>
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] shrink-0">
                        <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[#64748B] text-xs font-medium uppercase tracking-wide">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-[#0F172A] text-sm hover:text-accent transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-[#0F172A] text-sm">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.15}>
                <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Shield className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span className="text-accent text-sm font-semibold">NDA Available</span>
                  </div>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    We&apos;re happy to sign an NDA before our first call. All project
                    details are treated with strict confidentiality.
                  </p>
                </div>
              </FadeIn>

              {/* FAQ */}
              <FadeIn direction="left" delay={0.2}>
                <div className="space-y-4">
                  <h2 className="text-[#94A3B8] text-sm font-semibold uppercase tracking-widest">
                    Quick Answers
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.q} className="space-y-1.5">
                        <p className="text-[#0F172A] text-sm font-medium">{faq.q}</p>
                        <p className="text-[#475569] text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
