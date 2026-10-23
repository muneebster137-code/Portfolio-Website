"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Scroll reveals for a block of markup:
//   [data-line]  slides up out of its overflow-hidden parent
//   [data-fade]  fades and rises
//   [data-words] reads word by word as it scrolls through (scrubbed)
//   [data-rise]  lifts into place, staggered
export function Reveal({ as: Tag = "div", className, children, immediate = false, ...rest }: { as?: ElementType; className?: string; children: ReactNode; immediate?: boolean } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    // Less motion asked for: everything is simply there.
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      const trigger = (t: Element, start = "top 85%") => (immediate ? undefined : { trigger: t, start });
      const lines = el.querySelectorAll("[data-line]");
      if (lines.length) gsap.from(lines, { yPercent: 112, duration: 1.2, stagger: 0.08, ease: "expo.out", delay: immediate ? 0.15 : 0, scrollTrigger: trigger(el, "top 88%") });
      el.querySelectorAll("[data-fade]").forEach((f) => gsap.from(f, { autoAlpha: 0, y: 24, duration: 1, ease: "power3.out", delay: immediate ? 0.4 : 0, scrollTrigger: trigger(f, "top 90%") }));
      const rises = el.querySelectorAll("[data-rise]");
      if (rises.length) gsap.from(rises, { y: 90, autoAlpha: 0, duration: 1.1, stagger: 0.09, ease: "expo.out", scrollTrigger: trigger(el, "top 85%") });
      el.querySelectorAll<HTMLElement>("[data-words]").forEach((p) => {
        const s = new SplitText(p, { type: "words" });
        splits.push(s);
        gsap.fromTo(s.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 50%", scrub: true } });
      });
    }, el);
    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [immediate]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
