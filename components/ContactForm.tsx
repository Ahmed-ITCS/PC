"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const budgets = [
  "Under $10k",
  "$10k – $30k",
  "$30k – $75k",
  "$75k – $150k",
  "$150k+",
  "Let's discuss",
];

const services = [
  "Full-Stack Development",
  "DevOps & Infrastructure",
  "Security Audit",
  "Technical Consulting",
  "Team Augmentation",
  "Observability / SRE",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate submission — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center rounded-2xl border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-8">
        <CheckCircle2 className="w-12 h-12 text-[#00d4ff]" aria-hidden="true" />
        <div>
          <h2
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Message Received
          </h2>
          <p className="text-white/55 text-base">
            We&apos;ll be in touch within one business day with a scoping plan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-white/6 bg-[#0d1529]/60 p-8 md:p-10"
      aria-label="Contact form"
      noValidate
    >
      <h2
        className="text-xl font-bold text-white mb-6"
        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
      >
        Tell Us About Your Project
      </h2>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Full name"
          name="name"
          type="text"
          placeholder="Alex Smith"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          placeholder="alex@company.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <Field
        label="Company"
        name="company"
        type="text"
        placeholder="Your company name"
        value={formData.company}
        onChange={handleChange}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField
          label="Service needed"
          name="service"
          options={services}
          value={formData.service}
          onChange={handleChange}
          placeholder="Select service"
        />
        <SelectField
          label="Budget range"
          name="budget"
          options={budgets}
          value={formData.budget}
          onChange={handleChange}
          placeholder="Select budget"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-white/60 text-sm font-medium"
        >
          Project details{" "}
          <span className="text-white/30 font-normal">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your project, current pain points, timeline, and anything else relevant..."
          className="w-full rounded-xl bg-[#080e1e]/80 border border-white/8 text-white/80 placeholder:text-white/25 text-sm px-4 py-3 resize-none focus:outline-none focus:border-[#00d4ff]/40 focus:ring-1 focus:ring-[#00d4ff]/20 transition-colors"
          aria-required="true"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#00d4ff] text-[#04070f] hover:bg-[#00d4ff]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.25)] hover:shadow-[0_0_32px_rgba(0,212,255,0.4)]"
        aria-busy={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <span
              className="w-4 h-4 border-2 border-[#04070f]/30 border-t-[#04070f] rounded-full animate-spin"
              aria-hidden="true"
            />
            Sending...
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

      <p className="text-white/25 text-xs text-center">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="hover:text-white/50 underline underline-offset-2 transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function Field({ label, name, type, placeholder, value, onChange, required }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-white/60 text-sm font-medium">
        {label}
        {required && <span className="text-white/30 font-normal"> (required)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[#080e1e]/80 border border-white/8 text-white/80 placeholder:text-white/25 text-sm px-4 py-3 focus:outline-none focus:border-[#00d4ff]/40 focus:ring-1 focus:ring-[#00d4ff]/20 transition-colors"
        aria-required={required}
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
}

function SelectField({ label, name, options, value, onChange, placeholder }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-white/60 text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl bg-[#080e1e]/80 border border-white/8 text-white/80 text-sm px-4 py-3 focus:outline-none focus:border-[#00d4ff]/40 focus:ring-1 focus:ring-[#00d4ff]/20 transition-colors appearance-none cursor-pointer"
        style={{ colorScheme: "dark" }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
