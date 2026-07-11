import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0891B2]/8 border border-[#0891B2]/20">
        <Shield className="w-8 h-8 text-[#0891B2]" aria-hidden="true" />
      </div>
      <div className="space-y-3">
        <p className="text-[#0891B2] text-sm font-mono font-semibold tracking-widest uppercase">404</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-[#0F2A44]"
          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-[#4A6580] text-base max-w-sm">
          This page doesn&apos;t exist — or was moved. Let&apos;s get you back on track.
        </p>
      </div>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[#0F2A44]/10 text-[#4A6580] hover:border-[#0F2A44]/20 hover:text-[#0F2A44] hover:bg-[#0F2A44]/5 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to Home
      </Link>
    </div>
  );
}
