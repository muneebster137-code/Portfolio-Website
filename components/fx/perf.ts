"use client";

import { useEffect, useState } from "react";

// How much the device can take, so weaker phones and laptops still run the site smoothly:
//   high: everything at full quality
//   mid:  3D at lower resolution, lighter shadows and textures
//   low:  3D at native resolution without shadows, and the costliest effects (pencil trail, sketch hover,
//         glass blur, blend layers, the totem) switched off
// A first guess comes from the hardware; then the real frame rate is watched for a few seconds and the
// tier steps down if the device struggles. The result is kept for the visit.
export type Tier = "high" | "mid" | "low";

const KEY = "mmb-tier";
const order: Tier[] = ["high", "mid", "low"];
let tier: Tier = "high";
const listeners = new Set<(t: Tier) => void>();

function guess(): Tier {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  if (nav.connection?.saveData || memory <= 2 || cores <= 2) return "low";
  if (memory <= 4 || cores <= 4 || window.matchMedia("(max-width: 767px)").matches) return "mid";
  return "high";
}

function apply(t: Tier) {
  tier = t;
  document.documentElement.dataset.tier = t;
  try {
    sessionStorage.setItem(KEY, t);
  } catch {}
  listeners.forEach((l) => l(t));
}

// Watches about three seconds of frames; if most are slow, steps down one tier and looks again.
function watch() {
  let frames: number[] = [];
  let last = 0;
  const tick = (now: number) => {
    if (document.hidden) {
      last = 0;
      requestAnimationFrame(tick);
      return;
    }
    if (last) frames.push(now - last);
    last = now;
    if (frames.length < 180) return void requestAnimationFrame(tick);
    const sorted = [...frames].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    frames = [];
    if (median > 1000 / 42 && tier !== "low") {
      apply(order[order.indexOf(tier) + 1]);
      last = 0;
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
}

if (typeof window !== "undefined") {
  let saved: Tier | null = null;
  try {
    saved = sessionStorage.getItem(KEY) as Tier | null;
  } catch {}
  apply(saved && order.includes(saved) ? saved : guess());
  if (!saved) {
    if (document.readyState === "complete") setTimeout(watch, 1500);
    else window.addEventListener("load", () => setTimeout(watch, 1500), { once: true });
  }
}

export const getTier = () => tier;
export const onTierChange = (l: (t: Tier) => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

// For components rendered only in the browser (the 3D scenes); elsewhere read getTier() in an effect.
export function useTier() {
  const [t, setT] = useState<Tier>(() => tier);
  useEffect(() => {
    setT(tier);
    listeners.add(setT);
    return () => {
      listeners.delete(setT);
    };
  }, []);
  return t;
}

// Settings for a 3D canvas at the current tier.
export function canvasQuality(t: Tier) {
  return {
    dpr: (t === "high" ? [1, 1.75] : t === "mid" ? [1, 1.25] : 1) as number | [number, number],
    antialias: t === "high",
    shadows: t === "high" ? 512 : t === "mid" ? 256 : 0,
  };
}

// A resized copy of a site image for use as a 3D texture: the full-size file would cost far more GPU
// memory than a few hundred pixels on screen need. Uses Next's image optimiser; other sources pass through.
export function sized(src: string | undefined, width: 640 | 828 | 1080 | 1200) {
  if (!src || !src.startsWith("/") || src.startsWith("/_next/") || /\.(mp4|webm|mov)$/i.test(src)) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}
