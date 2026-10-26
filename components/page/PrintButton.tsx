"use client";

// The CV PDF is the resume page itself, printed with the print stylesheet, so the two always match.
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex h-14 items-center rounded-full bg-bone px-7 text-[15px] font-medium text-void hover:bg-signal transition-colors">
      {label}
    </button>
  );
}
