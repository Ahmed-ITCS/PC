"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
  "w-full rounded-xl bg-[#F0F7FA] border border-[#0F2A44]/10 text-[#0F2A44] placeholder:text-[#8BA3B8] text-sm px-4 py-3 focus:outline-none focus:border-[#0891B2]/40 focus:ring-1 focus:ring-[#0891B2]/20 hover:border-[#0891B2]/25 transition-colors duration-300";

const inputErrorCls = `${inputCls} border-red-500/40 focus:border-red-500/50`;

const fieldVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function Field({
  id,
  label,
  error,
  required,
  index,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="space-y-1.5"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fieldVariants}
    >
      <label htmlFor={id} className="block text-[#4A6580] text-sm font-medium">
        {label}
        {required && <span className="text-[#8BA3B8] font-normal ml-1">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="flex items-center gap-1.5 text-red-400 text-xs"
            role="alert"
          >
            <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
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

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-5 py-20 text-center rounded-2xl border border-[#0891B2]/15 bg-[#0891B2]/5 px-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0891B2]/10 border border-[#0891B2]/20"
          >
            <CheckCircle2 className="w-8 h-8 text-[#0891B2]" aria-hidden="true" />
          </motion.div>
          <div>
            <h2
              className="text-2xl font-bold text-[#0F2A44] mb-2"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Message Received
            </h2>
            <p className="text-[#4A6580] text-base">
              We&apos;ll be in touch within one business day with a scoping plan.
            </p>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="text-[#0891B2] hover:text-[#0E7490] text-sm underline underline-offset-2 transition-colors"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-[#0F2A44]/8 bg-white/70 p-8 md:p-10"
          aria-label="Contact form"
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-bold text-[#0F2A44] mb-2"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Tell Us About Your Project
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="firstName" label="First Name" error={errors.firstName?.message} required index={0}>
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
            <Field id="lastName" label="Last Name" error={errors.lastName?.message} required index={1}>
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
            <Field id="email" label="Email" error={errors.email?.message} required index={2}>
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
            <Field id="phone" label="Phone" error={errors.phone?.message} index={3}>
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

          <Field id="company" label="Company" error={errors.company?.message} index={4}>
            <input
              {...register("company")}
              id="company"
              type="text"
              placeholder="Your company name (optional)"
              autoComplete="organization"
              className={inputCls}
            />
          </Field>

          <Field id="subject" label="Subject" error={errors.subject?.message} required index={5}>
            <input
              {...register("subject")}
              id="subject"
              type="text"
              placeholder="e.g. MVP development for SaaS product"
              aria-invalid={!!errors.subject}
              className={errors.subject ? inputErrorCls : inputCls}
            />
          </Field>

          <Field id="message" label="Message" error={errors.message?.message} required index={6}>
            <textarea
              {...register("message")}
              id="message"
              rows={5}
              placeholder="Describe your project, current pain points, timeline, and anything else relevant..."
              aria-invalid={!!errors.message}
              className={`${errors.message ? inputErrorCls : inputCls} resize-none`}
            />
          </Field>

          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                Something went wrong. Please try again or email us at hello@pentacipher.com
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <MagneticButton
              as="button"
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="group w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#0891B2] text-white hover:bg-[#0E7490] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              strength={0.15}
            >
              {status === "loading" ? (
                <>
                  <span
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
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
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[#8BA3B8] text-xs text-center"
          >
            By submitting this form you agree to our{" "}
            <a
              href="/privacy"
              className="hover:text-[#4A6580] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </motion.p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
