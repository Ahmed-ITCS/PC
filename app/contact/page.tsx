import type { Metadata } from "next";
import { Mail, MessageSquare, Calendar, Shield } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
        <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-100" aria-hidden="true" />
        <div className="relative z-10 container-max section-padding flex flex-col items-center text-center gap-6">
          <FadeIn>
            <SectionLabel>Get in Touch</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance max-w-3xl"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Let&apos;s Build{" "}
              <span className="gradient-text">Something Secure</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#4A6580] text-lg max-w-xl text-balance">
              Tell us about your project and we&apos;ll respond within one business
              day with a scoping plan and honest timeline estimate.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16 pb-24 md:pb-32" aria-label="Contact form and info">
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
                    <div key={label} className="flex items-start gap-4 hover:bg-[#0891B2]/[0.03] rounded-xl p-3 -m-3 transition-all duration-200">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0891B2]/8 border border-[#0891B2]/15 shrink-0">
                        <Icon className="w-4 h-4 text-[#0891B2]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[#4A6580] text-xs font-medium uppercase tracking-wide">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-[#0F2A44] text-sm hover:text-[#0891B2] transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-[#0F2A44] text-sm">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.15}>
                <div className="p-5 rounded-xl border border-[#0891B2]/15 bg-[#0891B2]/5 hover:-translate-y-0.5 hover:shadow-subtle hover:border-[#0891B2]/25 active:scale-[0.98] transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Shield className="w-4 h-4 text-[#0891B2]" aria-hidden="true" />
                    <span className="text-[#0891B2] text-sm font-semibold">NDA Available</span>
                  </div>
                  <p className="text-[#4A6580] text-sm leading-relaxed">
                    We&apos;re happy to sign an NDA before our first call. All project
                    details are treated with strict confidentiality.
                  </p>
                </div>
              </FadeIn>

              {/* FAQ */}
              <FadeIn direction="left" delay={0.2}>
                <div className="space-y-4">
                  <h2 className="text-[#4A6580] text-sm font-semibold uppercase tracking-widest">
                    Quick Answers
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.q} className="space-y-1.5 hover:border-l-2 hover:border-[#0891B2] hover:bg-[#0891B2]/[0.02] hover:pl-3 hover:py-1 transition-all duration-200 border-l-2 border-transparent">
                        <p className="text-[#0F2A44] text-sm font-medium">{faq.q}</p>
                        <p className="text-[#4A6580] text-sm leading-relaxed">{faq.a}</p>
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
