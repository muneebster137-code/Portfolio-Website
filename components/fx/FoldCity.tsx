"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Paris folding over in Inception: as you read, whatever has scrolled into the top of the screen bends
// up and over toward you, like a street curling into the sky. Wrap blocks in [data-fold] inside it.
export function FoldCity({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...el.querySelectorAll<HTMLElement>("[data-fold]")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      items.forEach((it) => {
        const r = it.getBoundingClientRect();
        const cy = (r.top + r.height / 2) / vh;
        // 0 below the upper third of the screen, rising to 1 as the block reaches the top.
        const f = Math.min(1, Math.max(0, (0.42 - cy) / 0.5));
        const k = f * f;
        it.style.transformOrigin = "50% 100%";
        it.style.transform = k ? `perspective(1100px) translate3d(0, ${-k * 40}px, ${k * 140}px) rotateX(${-k * 62}deg)` : "";
        it.style.opacity = String(1 - k * 0.55);
      });
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
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
