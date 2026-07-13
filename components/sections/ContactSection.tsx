"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, Phone, Globe, CheckCircle2, AlertCircle, Send, Check,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowOrb } from "@/components/ui/GlowOrb";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName:  z.string().min(1, { message: "Last name is required" }),
  email:     z.string().email({ message: "Enter a valid email address" }),
  phone:     z.string().optional(),
  company:   z.string().optional(),
  subject:   z.string().min(1, { message: "Subject is required" }),
  message:   z.string().min(20, { message: "Message must be at least 20 characters" }),
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
  { icon: Mail,  label: "Email us",  value: "hello@pentacipher.com", href: "mailto:hello@pentacipher.com" },
  { icon: Phone, label: "Call us",   value: "+1 (800) PENTACIP",     href: "tel:+18007368224" },
  { icon: Globe, label: "Location",  value: "Global Remote Team",    href: null },
];

function InputField({ id, label, error, required, children }: {
  id: string; label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#334155]">
        {label}
        {required && <span className="text-red-600 font-normal"> *</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register, handleSubmit, formState: { errors }, reset,
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
      className="relative py-24 md:py-32 overflow-hidden bg-[#F8FAFC]"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-25" aria-hidden="true" />
      <GlowOrb className="-top-40 left-1/4" size="lg" opacity={0.06} />
      <GlowOrb className="top-1/2 -right-40" size="md" opacity={0.05} />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Get In Touch</SectionLabel>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-balance max-w-3xl text-[#0F172A]"
          >
            Ready to Start Your{" "}
            <span className="gradient-text">Next Project?</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-xl text-balance">
            Tell us about your project and we&apos;ll respond within one
            business day with a scoping plan and honest timeline.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Form */}
          <FadeIn direction="right">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-5 py-20 text-center rounded-2xl border border-accent/30 bg-accent/5 px-8">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full border border-accent/30 bg-accent/10"
                >
                  <CheckCircle2 className="w-8 h-8 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold text-[#0F172A] mb-2"
                    style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                  >
                    Message Received
                  </h3>
                  <p className="text-[#475569]">
                    We&apos;ll be in touch within one business day with a scoping plan.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-accent hover:text-accent-hover text-sm underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-10 shadow-card"
                aria-label="Contact form"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField id="firstName" label="First name" error={errors.firstName?.message} required>
                    <input {...register("firstName")} id="firstName" type="text" placeholder="Alex" autoComplete="given-name" aria-invalid={!!errors.firstName} className={inputCls} />
                  </InputField>
                  <InputField id="lastName" label="Last name" error={errors.lastName?.message} required>
                    <input {...register("lastName")} id="lastName" type="text" placeholder="Smith" autoComplete="family-name" aria-invalid={!!errors.lastName} className={inputCls} />
                  </InputField>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField id="email" label="Email address" error={errors.email?.message} required>
                    <input {...register("email")} id="email" type="email" placeholder="alex@company.com" autoComplete="email" aria-invalid={!!errors.email} className={inputCls} />
                  </InputField>
                  <InputField id="phone" label="Phone" error={errors.phone?.message}>
                    <input {...register("phone")} id="phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" className={inputCls} />
                  </InputField>
                </div>

                <InputField id="company" label="Company" error={errors.company?.message}>
                  <input {...register("company")} id="company" type="text" placeholder="Your company name" autoComplete="organization" className={inputCls} />
                </InputField>

                <InputField id="subject" label="Subject" error={errors.subject?.message} required>
                  <input {...register("subject")} id="subject" type="text" placeholder="e.g. MVP development for SaaS product" aria-invalid={!!errors.subject} className={inputCls} />
                </InputField>

                <InputField id="message" label="Message" error={errors.message?.message} required>
                  <textarea {...register("message")} id="message" rows={5} placeholder="Describe your project, timeline, and what success looks like..." aria-invalid={!!errors.message} className={`${inputCls} resize-none`} />
                </InputField>

                {status === "error" && (
                  <div
                    className="flex items-center gap-2.5 p-3.5 rounded-xl text-sm"
                    style={{
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "rgba(185,28,28,0.95)",
                    }}
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
                  className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm bg-accent text-white hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-accent hover:shadow-accent-lg hover:scale-[1.01]"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
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
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#E2E8F0] bg-[#F1F5F9] shrink-0"
                    >
                      <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-accent text-xs font-bold uppercase tracking-widest">{label}</p>
                      {href ? (
                        <a href={href} className="text-[#334155] text-sm hover:text-accent transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-[#334155] text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div
                className="rounded-xl border border-[#E2E8F0] bg-white p-6 space-y-4"
              >
                <h3
                  className="text-[#0F172A] text-sm font-bold"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  What to expect
                </h3>
                <ul className="space-y-3" role="list">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#475569]">
                      <div
                        className="flex items-center justify-center w-4 h-4 rounded-full border border-accent/30 bg-accent/10 shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <Check className="w-2.5 h-2.5 text-accent" />
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
