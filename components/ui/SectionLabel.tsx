interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0891B2]/15 bg-[#0891B2]/6 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] animate-pulse" aria-hidden="true" />
      <span className="text-[#0891B2] text-xs font-semibold tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}
