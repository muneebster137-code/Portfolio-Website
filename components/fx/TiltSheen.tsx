"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Drop inside a card: the card tilts a few degrees toward the mouse, like a printed sheet picked up
// to the light, and a soft sheen follows the mouse across it. Mouse only.
export function TiltSheen({ max = 6, className = "rounded-[22px]" }: { max?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sheen = ref.current;
    const host = sheen?.parentElement;
    if (!sheen || !host || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(host, { transformPerspective: 1000 });
    const rx = gsap.quickTo(host, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(host, "rotationY", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      rx((0.5 - y) * max);
      ry((x - 0.5) * max);
      sheen.style.setProperty("--x", `${x * 100}%`);
      sheen.style.setProperty("--y", `${y * 100}%`);
      sheen.style.opacity = "1";
    };
    const leave = () => {
      rx(0);
      ry(0);
      sheen.style.opacity = "0";
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 mix-blend-soft-light ${className}`}
      style={{ background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,250,240,0.55), rgba(255,250,240,0) 55%)" }}
    />
  );
}
