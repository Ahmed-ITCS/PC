interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(3,105,161,0.2)] bg-[rgba(3,105,161,0.06)] ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1]" aria-hidden="true" />
      <span className="text-[#0369A1] text-[10px] font-bold tracking-[0.18em] uppercase font-[family-name:var(--font-mono)]">
        {children}
      </span>
    </div>
  );
}
