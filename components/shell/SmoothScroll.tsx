"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getTier, onTierChange } from "@/components/fx/perf";

gsap.registerPlugin(ScrollTrigger);
// On phones the address bar resizes the viewport while scrolling; re-measuring then makes pinned
// scenes jump. Sections use svh heights, so those resizes can be ignored.
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis: Lenis | null = null;

export const getLenis = () => lenis;
// How closely scrolling follows the wheel; dream levels lower it to make deep pages feel slower.
export const BASE_LERP = 0.16;

// Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger and Lenis share one clock.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A light lerp keeps the glide but answers the wheel straight away; scenes follow it directly.
    lenis = new Lenis({
      lerp: reduced ? 1 : BASE_LERP,
      smoothWheel: !reduced && getTier() !== "low",
      touchMultiplier: 1.4,
    });
    const offTier = onTierChange((t) => {
      if (lenis && !reduced) lenis.options.smoothWheel = t !== "low";
    });

    // The preloader mounts first and releases the scroll when it finishes.
    if (!reduced && !sessionStorage.getItem("mmb-loaded")) lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);
    const onRotate = () => setTimeout(() => ScrollTrigger.refresh(), 250);
    window.addEventListener("orientationchange", onRotate);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      offTier();
      gsap.ticker.remove(tick);
      window.removeEventListener("orientationchange", onRotate);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return <>{children}</>;
}
