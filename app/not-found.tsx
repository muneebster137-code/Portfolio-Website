import type { Metadata } from "next";
import { NotFoundText } from "@/components/NotFoundText";

export const metadata: Metadata = { title: "Lost in limbo | Muhammad Muneeb Bilal" };

// Pieces of half-finished work drifting in the dark: where you end up when a page was never drawn.
const DRIFT = [
  { left: "8%", top: "22%", w: 120, r: -14, t: 16, dx: 18, dy: -24 },
  { left: "78%", top: "16%", w: 90, r: 11, t: 19, dx: -14, dy: 20 },
  { left: "70%", top: "70%", w: 150, r: -6, t: 22, dx: 10, dy: -16 },
  { left: "14%", top: "74%", w: 70, r: 18, t: 13, dx: -20, dy: -12 },
];

function HalfSheet({ w }: { w: number }) {
  return (
    <svg viewBox="0 0 64 90" width={w} height={w * 1.41} aria-hidden="true">
      <rect width="64" height="90" fill="#F2EFE7" />
      <path d="M32 18 A18 18 0 1 1 15 44" fill="none" stroke="#26282E" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M23 49 L25 32 L32 42" fill="none" stroke="#26282E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 36 H58" stroke="#26282E" strokeOpacity="0.25" strokeWidth="0.5" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section aria-labelledby="nf-h" className="relative min-h-svh overflow-hidden bg-void text-bone grid place-items-center px-5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {DRIFT.map((d, i) => (
          <span
            key={i}
            className="drift absolute opacity-[0.16]"
            style={{ left: d.left, top: d.top, ["--r" as string]: `${d.r}deg`, ["--t" as string]: `${d.t}s`, ["--dx" as string]: `${d.dx}px`, ["--dy" as string]: `${d.dy}px` }}
          >
            <HalfSheet w={d.w} />
          </span>
        ))}
      </div>
      <NotFoundText />
    </section>
  );
}
