import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "PentaCipher Terms of Service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          Back
        </Link>
        <h1
          className="text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
        >
          Terms of Service
        </h1>
        <p className="text-white/35 text-sm mb-10">Last updated: July 7, 2026</p>
        <div className="prose prose-invert prose-sm max-w-none text-white/55 space-y-6">
          <p>
            By using this website, you agree to these Terms of Service. This
            website is operated by PentaCipher for informational and lead
            generation purposes.
          </p>
          <h2 className="text-white/80 font-semibold text-lg">Use of Site</h2>
          <p>
            You may browse this site for personal or commercial purposes. You may
            not scrape, reproduce, or republish content without written
            permission.
          </p>
          <h2 className="text-white/80 font-semibold text-lg">Intellectual Property</h2>
          <p>
            All content on this site — text, design, code, and branding — is the
            property of PentaCipher and protected by applicable copyright laws.
          </p>
          <h2 className="text-white/80 font-semibold text-lg">Limitation of Liability</h2>
          <p>
            PentaCipher is not liable for any indirect or consequential damages
            arising from your use of this website. The site is provided &ldquo;as is&rdquo;
            without warranties of any kind.
          </p>
          <h2 className="text-white/80 font-semibold text-lg">Contact</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:legal@pentacipher.com" className="text-[#00d4ff] hover:underline">
              legal@pentacipher.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
