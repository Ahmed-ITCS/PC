import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PentaCipher collects and uses your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[#4A6580] hover:text-[#0F2A44] text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          Back
        </Link>
        <h1
          className="text-4xl font-bold text-[#0F2A44] mb-3"
          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-[#4A6580] text-sm mb-10">Last updated: July 7, 2026</p>
        <div className="prose prose-invert prose-sm max-w-none text-[#4A6580] space-y-6">
          <p>
            PentaCipher (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy
            describes how we collect, use, and protect information you share with
            us through this website.
          </p>
          <h2 className="text-[#0F2A44] font-semibold text-lg">Information We Collect</h2>
          <p>
            We collect information you voluntarily provide via our contact form:
            name, email address, company name, and project details. We do not
            collect payment information on this site.
          </p>
          <h2 className="text-[#0F2A44] font-semibold text-lg">How We Use It</h2>
          <p>
            We use your information solely to respond to your inquiry and scope a
            potential engagement. We do not sell or share your data with third
            parties for marketing purposes.
          </p>
          <h2 className="text-[#0F2A44] font-semibold text-lg">Data Retention</h2>
          <p>
            Contact form submissions are retained for 24 months. You may request
            deletion at any time by emailing{" "}
            <a href="mailto:privacy@pentacipher.com" className="text-[#0891B2] hover:underline">
              privacy@pentacipher.com
            </a>
            .
          </p>
          <h2 className="text-[#0F2A44] font-semibold text-lg">Contact</h2>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:privacy@pentacipher.com" className="text-[#0891B2] hover:underline">
              privacy@pentacipher.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
