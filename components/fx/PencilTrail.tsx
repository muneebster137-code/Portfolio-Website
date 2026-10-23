"use client";

import { useEffect, useRef } from "react";

const LIFE = 650; // ms a mark stays before it fades out

// A thin graphite line that follows the mouse and fades like a sketch. Mouse and trackpad only;
// it draws in "difference" so it reads on the dark pages and the bone ones alike.
export function PencilTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const c = canvas.current;
    if (!c || !fine.matches || reduced.matches) return;
    const ctx = c.getContext("2d")!;
    const pts: { x: number; y: number; t: number }[] = [];
    let raf = 0;
    let dpr = 1;

    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
    };
    size();

    const frame = () => {
      const now = performance.now();
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#EEEAE1";
      // Each segment fades and thins with age; midpoints keep the line smooth.
      for (let i = 2; i < pts.length; i++) {
        const a = pts[i - 2];
        const b = pts[i - 1];
        const p = pts[i];
        const life = 1 - (now - p.t) / LIFE;
        ctx.globalAlpha = 0.55 * life;
        ctx.lineWidth = 0.6 + 1.1 * life;
        ctx.beginPath();
        ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.quadraticCurveTo(b.x, b.y, (b.x + p.x) / 2, (b.y + p.y) / 2);
        ctx.stroke();
      }
      raf = pts.length ? requestAnimationFrame(frame) : 0;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > 80) pts.shift();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", size);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] size-full mix-blend-difference print:hidden" />;
}
