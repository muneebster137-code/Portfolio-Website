"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLenis } from "./SmoothScroll";

export const PRELOADER_DONE = "mmb:preloader-done";

// A single pencil line crosses the dark while the counter runs, then the dark lifts.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("mmb-loaded");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      sessionStorage.setItem("mmb-loaded", "1");
      setVisible(false);
      getLenis()?.start();
      (window as unknown as { __mmbReady?: boolean }).__mmbReady = true;
      window.dispatchEvent(new Event(PRELOADER_DONE));
    };
    if (seen || reduced) {
      finish();
      return;
    }

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({ onComplete: finish })
        .to(counter, { v: 100, duration: 1.2, ease: "power2.inOut", onUpdate: () => setCount(Math.round(counter.v)) }, 0)
        .fromTo(".pl-line", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0)
        .to(".pl-meta, .pl-svg", { autoAlpha: 0, duration: 0.3 }, "+=0.05")
        .to(root.current, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.1");
    }, root);
    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] bg-void text-bone" role="status" aria-label="Loading">
      <svg className="pl-svg absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-24" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="pl-line" d="M0 52 C 120 46, 220 58, 340 50 S 560 44, 680 53 S 880 49, 1000 50" stroke="#EEEAE1" strokeWidth="1.2" pathLength={1} strokeDasharray="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="pl-meta absolute inset-x-5 md:inset-x-10 top-6 flex justify-between label text-fog">
        <span>Muhammad Muneeb Bilal</span>
        <span>A sheet of A4</span>
      </div>
      <span className="pl-meta absolute right-5 md:right-10 bottom-6 label text-fog tabular-nums">{String(count).padStart(3, "0")}</span>
    </div>
  );
}
