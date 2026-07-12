interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/10 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" aria-hidden="true" />
      <span className="text-[#00d4ff] text-xs font-semibold tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}
