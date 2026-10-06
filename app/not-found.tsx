import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PentaCipherIcon } from "@/components/ui/PentaCipherLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6 bg-[#0A0E14]">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0E141E] border border-[#1B2530]">
        <PentaCipherIcon size={36} />
      </div>
      <div className="space-y-3">
        <p className="text-accent text-sm font-mono font-semibold tracking-widest uppercase">404</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-[#E7EEF0]"
          style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-[#8A9AA0] text-base max-w-sm">
          This page doesn&apos;t exist — or was moved. Let&apos;s get you back on track.
        </p>
      </div>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[#2A3742] text-[#A9B7BD] hover:border-[#6B7A81] hover:text-[#E7EEF0] hover:bg-[#0E141E] transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to Home
      </Link>
    </div>
  );
}
