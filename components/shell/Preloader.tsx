"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { services } from "@/lib/site";
import { getLenis } from "./SmoothScroll";

export const PRELOADER_DONE = "mmb:preloader-done";

// Counts 000 to 100 while the seven service swatches fill, then lifts away.
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
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(counter, { v: 100, duration: 2.4, ease: "power2.inOut", onUpdate: () => setCount(Math.round(counter.v)) }, 0)
        .from(".pl-bar", { scaleY: 0, transformOrigin: "bottom", duration: 0.5, stagger: 0.28, ease: "expo.out" }, 0.1)
        .to(".pl-bar", { yPercent: -110, duration: 0.7, stagger: 0.04, ease: "expo.in" }, "+=0.15")
        .to(".pl-meta", { autoAlpha: 0, duration: 0.3 }, "<")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.25");
    }, root);
    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  const active = Math.min(services.length, Math.floor((count / 100) * services.length) + 1);

  return (
    <div ref={root} className="fixed inset-0 z-[100] bg-void text-bone flex flex-col justify-between p-5 md:p-8" aria-label="Loading" role="status">
      <div className="pl-meta flex justify-between label text-fog">
        <span>Muhammad Muneeb Bilal</span>
        <span>Sharpening the pencil</span>
      </div>
      <div className="absolute inset-x-5 md:inset-x-8 top-1/2 -translate-y-1/2 grid grid-cols-7 gap-1.5 h-[38vh] overflow-hidden">
        {services.map((s) => (
          <div key={s.code} className="pl-bar rounded-t-lg self-end" style={{ background: s.color, height: "100%" }} />
        ))}
      </div>
      <div className="pl-meta flex justify-between items-end">
        <span className="label text-fog">Swatch {String(active).padStart(2, "0")} of 07</span>
        <span className="type-x text-[22vw] md:text-[14vw] leading-[0.75] tabular-nums">{String(count).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
