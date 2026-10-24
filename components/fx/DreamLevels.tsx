"use client";

import { useEffect, useState } from "react";
import { BASE_LERP, getLenis } from "@/components/shell/SmoothScroll";
import { deeper } from "./sound";

const LEVELS = [
  { lerp: BASE_LERP, shade: 0 },
  { lerp: 0.11, shade: 0.45 },
  { lerp: 0.075, shade: 0.8 },
];

// A case study is read like a dream within a dream: three levels down the page. Each level is a touch
// darker at the edges and a little slower to scroll, and the corner says how deep you are.
export function DreamLevels() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setLevel(p < 0.34 ? 0 : p < 0.68 ? 1 : 2);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      const lenis = getLenis();
      if (lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) lenis.options.lerp = BASE_LERP;
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) lenis.options.lerp = LEVELS[level].lerp;
    if (level > 0) deeper(level + 1);
  }, [level]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[20] transition-opacity duration-[1.2s] print:hidden"
        style={{ opacity: LEVELS[level].shade, background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)" }}
      />
      <div aria-hidden="true" className="pointer-events-none fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 text-bone mix-blend-difference print:hidden">
        <span className="label tabular-nums">Level {level + 1}</span>
        <span className="flex flex-col gap-1.5">
          {LEVELS.map((_, i) => (
            <span key={i} className={`h-px w-6 transition-colors duration-700 ${i <= level ? "bg-bone" : "bg-bone/25"}`} />
          ))}
        </span>
      </div>
    </>
  );
}
