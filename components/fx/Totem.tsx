"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { time } from "@/components/three/store";

// The spinning top from Inception, in the corner. Scrolling spins it; when you stop it slows and starts
// to wobble but keeps going (you are still dreaming). Only in the "Wake up" section does it fall over.
export function Totem() {
  const pathname = usePathname();
  const body = useRef<SVGGElement>(null);
  const bands = useRef<SVGGElement>(null);
  const shadow = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !body.current) return;
    let spin = 0.6; // 0..1
    let phase = 0;
    let wobble = 0;
    let fall = 0; // 0 upright .. 1 on its side
    let awake = false;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const wake = document.getElementById("contact");
    const io = wake ? new IntersectionObserver(([e]) => (awake = e.intersectionRatio > 0.45), { threshold: [0, 0.45, 1] }) : null;
    if (wake) io!.observe(wake);

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000) * time.scale;
      last = now;
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      // Scrolling winds it up; friction slows it, but it never quite stops while you dream.
      spin = Math.min(1, spin + dy * 0.0016);
      spin = Math.max(awake ? 0 : 0.22, spin - dt * (awake ? 0.5 : 0.12));
      phase = (phase + dt * (2 + spin * 26)) % 1000;
      wobble += dt * (2 + (1 - spin) * 3);
      const tilt = (1 - spin) ** 2 * 16 * Math.sin(wobble * 3);
      fall += ((awake && spin < 0.05 ? 1 : 0) - fall) * (1 - Math.pow(awake ? 0.08 : 0.0005, dt));

      if (body.current) body.current.setAttribute("transform", `rotate(${tilt * (1 - fall) + fall * 78} 24 58)`);
      if (bands.current) bands.current.setAttribute("transform", `translate(${-((phase * 7) % 6)} 0)`);
      if (shadow.current) shadow.current.setAttribute("rx", String(10 + fall * 10));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, [pathname]);

  return (
    <svg viewBox="0 0 48 64" className="pointer-events-none fixed right-6 bottom-16 z-[80] hidden md:block w-9 h-12 motion-reduce:hidden print:hidden" aria-hidden="true">
      <defs>
        <clipPath id="totem-body">
          <path d="M24 58 L8 36 Q8 28 24 27 Q40 28 40 36 Z" />
        </clipPath>
        <linearGradient id="totem-metal" x1="0" x2="1">
          <stop offset="0" stopColor="#6B7078" />
          <stop offset="0.45" stopColor="#D9DCE0" />
          <stop offset="1" stopColor="#5E626B" />
        </linearGradient>
      </defs>
      <ellipse ref={shadow} cx="24" cy="60" rx="10" ry="1.6" fill="#000" opacity="0.6" />
      <g ref={body}>
        <rect x="21.5" y="12" width="5" height="16" rx="1.5" fill="url(#totem-metal)" />
        <path d="M24 58 L8 36 Q8 28 24 27 Q40 28 40 36 Z" fill="url(#totem-metal)" />
        <g clipPath="url(#totem-body)">
          <g ref={bands} opacity="0.35">
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={2 + i * 6} y="26" width="2" height="34" fill="#060708" />
            ))}
          </g>
        </g>
        <path d="M8.5 36 Q24 40 39.5 36" fill="none" stroke="#FF4A1C" strokeWidth="1.4" />
      </g>
    </svg>
  );
}
