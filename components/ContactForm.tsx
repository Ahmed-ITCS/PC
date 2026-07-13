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
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center rounded-2xl border border-accent/30 bg-white px-8">
        <CheckCircle2 className="w-12 h-12 text-accent" aria-hidden="true" />
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
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-10 shadow-card"
      aria-label="Contact form"
      noValidate
    >
      <h2
        className="text-xl font-bold text-[#0F172A] mb-6"
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
          className="text-sm font-medium text-[#334155]"
        >
          Project details{" "}
          <span className="text-[#94A3B8] font-normal">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your project, current pain points, timeline, and anything else relevant..."
          className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition resize-none"
          aria-required="true"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center"
        aria-busy={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <span
              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
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

      <p className="text-[#94A3B8] text-xs text-center">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">
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
      <label htmlFor={name} className="text-sm font-medium text-[#334155]">
        {label}
        {required && <span className="text-[#94A3B8] font-normal"> (required)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
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
      <label htmlFor={name} className="text-sm font-medium text-[#334155]">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition appearance-none cursor-pointer"
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
