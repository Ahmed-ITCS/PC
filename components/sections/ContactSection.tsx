"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  AlertCircle,
  Send,
  Check,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowOrb } from "@/components/ui/GlowOrb";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

const trustPoints = [
  "Free consultation call — no commitment",
  "Transparent, milestone-based pricing",
  "Agile process with weekly demos",
  "Ongoing support after launch",
];

const contactDetails = [
  { icon: Mail, label: "Email us", value: "hello@pentacipher.com", href: "mailto:hello@pentacipher.com" },
  { icon: Phone, label: "Call us", value: "+1 (800) PENTACIP", href: "tel:+18007368224" },
  { icon: Globe, label: "Location", value: "Global Remote Team", href: null },
];

function InputField({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-white/60 text-sm font-medium">
        {label}
        {required && <span className="text-white/30 font-normal"> *</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl bg-[#080e1e]/80 border border-white/8 text-white/80 placeholder:text-white/25 text-sm px-4 py-3 focus:outline-none focus:border-[#00d4ff]/40 focus:ring-1 focus:ring-[#00d4ff]/20 transition-colors aria-[invalid=true]:border-red-500/40";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-50" aria-hidden="true" />
      <GlowOrb className="-top-40 left-1/4" size="lg" opacity={0.04} />
      <GlowOrb className="top-1/2 -right-40" size="md" opacity={0.03} />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Get In Touch</SectionLabel>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Ready to Start Your{" "}
            <span className="gradient-text">Next Project?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl text-balance">
            Tell us about your project and we&apos;ll respond within one
            business day with a scoping plan and honest timeline.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Form */}
          <FadeIn direction="right">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-5 py-20 text-center rounded-2xl border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/25">
                  <CheckCircle2 className="w-8 h-8 text-[#00d4ff]" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                  >
                    Message Received
                  </h3>
                  <p className="text-white/55">
                    We&apos;ll be in touch within one business day with a
                    scoping plan.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-[#00d4ff]/70 hover:text-[#00d4ff] text-sm underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 rounded-2xl border border-white/10 bg-[#0d1529]/50 backdrop-blur-md p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
                aria-label="Contact form"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField id="firstName" label="First name" error={errors.firstName?.message} required>
                    <input
                      {...register("firstName")}
                      id="firstName"
                      type="text"
                      placeholder="Alex"
                      autoComplete="given-name"
                      aria-invalid={!!errors.firstName}
                      className={inputCls}
                    />
                  </InputField>
                  <InputField id="lastName" label="Last name" error={errors.lastName?.message} required>
                    <input
                      {...register("lastName")}
                      id="lastName"
                      type="text"
                      placeholder="Smith"
                      autoComplete="family-name"
                      aria-invalid={!!errors.lastName}
                      className={inputCls}
                    />
                  </InputField>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField id="email" label="Email address" error={errors.email?.message} required>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="alex@company.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      className={inputCls}
                    />
                  </InputField>
                  <InputField id="phone" label="Phone" error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </InputField>
                </div>

                <InputField id="company" label="Company" error={errors.company?.message}>
                  <input
                    {...register("company")}
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    autoComplete="organization"
                    className={inputCls}
                  />
                </InputField>

                <InputField id="subject" label="Subject" error={errors.subject?.message} required>
                  <input
                    {...register("subject")}
                    id="subject"
                    type="text"
                    placeholder="e.g. MVP development for SaaS product"
                    aria-invalid={!!errors.subject}
                    className={inputCls}
                  />
                </InputField>

                <InputField id="message" label="Message" error={errors.message?.message} required>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    placeholder="Describe your project, timeline, and what success looks like..."
                    aria-invalid={!!errors.message}
                    className={`${inputCls} resize-none`}
                  />
                </InputField>

                {status === "error" && (
                  <div
                    className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    Something went wrong. Please try again or email us directly at hello@pentacipher.com
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm bg-[#00d4ff] text-[#04070f] hover:bg-[#00d4ff]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_32px_rgba(0,212,255,0.3)] hover:shadow-[0_0_48px_rgba(0,212,255,0.5)] hover:scale-[1.01]"
                >
                  {status === "loading" ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-[#04070f]/30 border-t-[#04070f] rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeIn>

          {/* Sidebar */}
          <div className="space-y-8">
            <FadeIn direction="left" delay={0.1}>
              <div className="space-y-5">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#00d4ff]/8 border border-[#00d4ff]/15 shrink-0">
                      <Icon className="w-4 h-4 text-[#00d4ff]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs font-medium uppercase tracking-wide">{label}</p>
                      {href ? (
                        <a href={href} className="text-white/80 text-sm hover:text-[#00d4ff] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div className="rounded-xl border border-white/6 bg-[#0d1529]/50 p-6 space-y-4">
                <h3
                  className="text-white/80 text-sm font-semibold"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  What to expect
                </h3>
                <ul className="space-y-3" role="list">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-white/55">
                      <div
                        className="flex items-center justify-center w-4 h-4 rounded-full bg-[#00d4ff]/15 border border-[#00d4ff]/25 shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <Check className="w-2.5 h-2.5 text-[#00d4ff]" />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
