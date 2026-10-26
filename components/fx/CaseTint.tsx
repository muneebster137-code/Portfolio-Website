"use client";

import { useEffect, useRef } from "react";

// A case study in its client's colour: once you are past the opening, the brand colour rises through
// the dark behind the page, and fades again as you wake up at the end. One fixed layer, opacity only.
export function CaseTint({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const y = window.scrollY;
      const rise = Math.min(1, Math.max(0, (y - vh * 0.35) / (vh * 0.6)));
      const fall = Math.min(1, Math.max(0, (max - y) / (vh * 1.2)));
      el.style.opacity = String(rise * fall);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-0 print:hidden"
      style={{
        background: `radial-gradient(60% 55% at 78% 22%, color-mix(in srgb, ${accent} 26%, transparent), transparent 70%), radial-gradient(50% 50% at 12% 88%, color-mix(in srgb, ${accent} 14%, transparent), transparent 70%)`,
      }}
    />
  );
}
