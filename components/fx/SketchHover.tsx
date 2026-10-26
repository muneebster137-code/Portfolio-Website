"use client";

import { useEffect, useRef, useState } from "react";
import { getTier } from "./perf";

// The SVG filter that turns any picture into a pencil drawing of itself: edges become graphite lines,
// tones become light shading on paper. Rendered once in the layout.
export function SketchFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <filter id="mmb-pencil" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" result="grey" />
        <feConvolveMatrix in="grey" order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" result="edges" />
        <feComponentTransfer in="edges" result="lines">
          <feFuncR type="linear" slope="-5" intercept="0.95" />
          <feFuncG type="linear" slope="-5" intercept="0.93" />
          <feFuncB type="linear" slope="-5" intercept="0.89" />
        </feComponentTransfer>
        <feComponentTransfer in="grey" result="shade">
          <feFuncR type="linear" slope="0.3" intercept="0.7" />
          <feFuncG type="linear" slope="0.3" intercept="0.7" />
          <feFuncB type="linear" slope="0.3" intercept="0.7" />
        </feComponentTransfer>
        <feBlend in="lines" in2="shade" mode="multiply" />
      </filter>
    </svg>
  );
}

// Drop inside a positioned picture: under the mouse, the picture dissolves into the pencil sketch it
// started as, and returns to colour when the mouse moves on. Mouse only.
export function SketchHover({ src, className = "" }: { src?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  // Once first hovered, the sketch layer stays ready so it can fade out as smoothly as it faded in.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || !src || getTier() === "low" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const place = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      place(e);
      setArmed(true);
      setOn(true);
    };
    const leave = () => setOn(false);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointermove", place);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointermove", place);
      host.removeEventListener("pointerleave", leave);
    };
  }, [src]);

  if (!src) return null;
  const mask = "radial-gradient(circle 190px at var(--x, 50%) var(--y, 50%), #000 30%, transparent 72%)";
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-200 ${on ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ backgroundImage: armed ? `url(${src})` : undefined, filter: armed ? "url(#mmb-pencil)" : undefined, maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}
