"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Tilts toward the pointer: a small piece of spatial UI on flat content.
export function TiltCard({ children, className = "", strength = 12 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * strength);
      rx(-((e.clientY - r.top) / r.height - 0.5) * strength);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <div className="[perspective:1200px]">
      <div ref={ref} className={`[transform-style:preserve-3d] ${className}`}>
        {children}
      </div>
    </div>
  );
}
