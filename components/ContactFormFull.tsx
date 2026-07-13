"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

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

const inputCls =
  "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition";

const inputErrorCls = `${inputCls} border-red-400/60 focus:border-red-400`;

function Field({
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
      <label htmlFor={id} className="text-sm font-medium text-[#334155]">
        {label}
        {required && <span className="text-[#94A3B8] font-normal ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-sm text-red-600" role="alert">
          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactFormFull() {
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
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center rounded-2xl border border-accent/30 bg-white px-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/25">
          <CheckCircle2 className="w-8 h-8 text-accent" aria-hidden="true" />
        </div>
        <div>
          <h2
            className="text-2xl font-bold text-[#0F172A] mb-2"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Message Received
          </h2>
          <p className="text-[#475569] text-base">
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-10 shadow-card"
      aria-label="Contact form"
      noValidate
    >
      <h2
        className="text-xl font-bold text-[#0F172A] mb-2"
        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
      >
        Tell Us About Your Project
      </h2>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="firstName" label="First Name" error={errors.firstName?.message} required>
          <input
            {...register("firstName")}
            id="firstName"
            type="text"
            placeholder="Alex"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            className={errors.firstName ? inputErrorCls : inputCls}
          />
        </Field>
        <Field id="lastName" label="Last Name" error={errors.lastName?.message} required>
          <input
            {...register("lastName")}
            id="lastName"
            type="text"
            placeholder="Smith"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            className={errors.lastName ? inputErrorCls : inputCls}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="email" label="Email" error={errors.email?.message} required>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={errors.email ? inputErrorCls : inputCls}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000 (optional)"
            autoComplete="tel"
            className={inputCls}
          />
        </Field>
      </div>

      <Field id="company" label="Company" error={errors.company?.message}>
        <input
          {...register("company")}
          id="company"
          type="text"
          placeholder="Your company name (optional)"
          autoComplete="organization"
          className={inputCls}
        />
      </Field>

      <Field id="subject" label="Subject" error={errors.subject?.message} required>
        <input
          {...register("subject")}
          id="subject"
          type="text"
          placeholder="e.g. MVP development for SaaS product"
          aria-invalid={!!errors.subject}
          className={errors.subject ? inputErrorCls : inputCls}
        />
      </Field>

      <Field id="message" label="Message" error={errors.message?.message} required>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder="Describe your project, current pain points, timeline, and anything else relevant..."
          aria-invalid={!!errors.message}
          className={`${errors.message ? inputErrorCls : inputCls} resize-none`}
        />
      </Field>

      {status === "error" && (
        <div
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or email us at hello@pentacipher.com
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="btn-primary w-full justify-center"
      >
        {status === "loading" ? (
          <>
            <span
              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
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

      <p className="text-[#94A3B8] text-xs text-center">
        By submitting this form you agree to our{" "}
        <a
          href="/privacy"
          className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
