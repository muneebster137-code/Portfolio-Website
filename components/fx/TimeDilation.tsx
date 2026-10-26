"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { time } from "@/components/three/store";
import { drone } from "./sound";
import { useUI } from "@/components/i18n";

const SLOW = 0.12;

// Deeper dream levels run slower. Press and hold the mouse anywhere that isn't a link or a control, and
// time slows to a crawl: every animation and the 3D scenes, with the colour draining away. Let go to
// come back up to speed. Also keeps the site's slowed clock (time.t) that the 3D scenes run on.
export function TimeDilation() {
  const [on, setOn] = useState(false);
  const t = useUI().time;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let holding = false;
    let timer = 0;
    let start: { x: number; y: number } | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      time.scale += ((holding ? SLOW : 1) - time.scale) * (1 - Math.pow(0.02, dt));
      if (Math.abs(time.scale - 1) < 0.001) time.scale = 1;
      time.t += dt * time.scale;
      gsap.globalTimeline.timeScale(time.scale);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const release = () => {
      clearTimeout(timer);
      start = null;
      if (!holding) return;
      holding = false;
      setOn(false);
      drone(false);
    };
    const down = (e: PointerEvent) => {
      if (reduced || e.pointerType !== "mouse" || e.button !== 0) return;
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest("a, button, input, textarea, select, label, [role=button], [data-lenis-prevent]")) return;
      start = { x: e.clientX, y: e.clientY };
      timer = window.setTimeout(() => {
        holding = true;
        setOn(true);
        drone(true);
      }, 450);
    };
    const move = (e: PointerEvent) => {
      if (start && !holding && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8) release();
    };

    window.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", release);
    window.addEventListener("blur", release);
    return () => {
      cancelAnimationFrame(raf);
      release();
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dilated", on);
  }, [on]);

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[85] transition-opacity duration-700 print:hidden ${on ? "opacity-100" : "opacity-0"}`}>
      <div className={`absolute inset-0 ${on ? "[backdrop-filter:saturate(0.25)_contrast(1.08)]" : ""}`} style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      <p className="absolute inset-x-0 bottom-20 text-center label text-bone/80">{t.message}</p>
    </div>
  );
}
