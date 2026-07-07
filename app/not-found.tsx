import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00d4ff]/8 border border-[#00d4ff]/20">
        <Shield className="w-8 h-8 text-[#00d4ff]" aria-hidden="true" />
      </div>
      <div className="space-y-3">
        <p className="text-[#00d4ff] text-sm font-mono font-semibold tracking-widest uppercase">404</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-white/45 text-base max-w-sm">
          This page doesn&apos;t exist — or was moved. Let&apos;s get you back on track.
        </p>
      </div>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to Home
      </Link>
    </div>
  );
}
