import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PentaCipherIcon } from "@/components/ui/PentaCipherLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6 bg-[#F8FAFC]">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0]">
        <PentaCipherIcon size={36} />
      </div>
      <div className="space-y-3">
        <p className="text-accent text-sm font-mono font-semibold tracking-widest uppercase">404</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-[#0F172A]"
          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-[#475569] text-base max-w-sm">
          This page doesn&apos;t exist — or was moved. Let&apos;s get you back on track.
        </p>
      </div>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[#CBD5E1] text-[#334155] hover:border-[#94A3B8] hover:text-[#0F172A] hover:bg-white transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to Home
      </Link>
    </div>
  );
}
