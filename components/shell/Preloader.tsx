"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLenis } from "./SmoothScroll";
import { useUI } from "@/components/i18n";

export const PRELOADER_DONE = "mmb:preloader-done";

const MIN = 1.1; // seconds: long enough to read the sketch, never a flash
const MAX = 4; // seconds: never keep anyone waiting longer than this

// The first moment of the site, in one second: the brand mark is sketched in pencil while the page really
// loads (the counter follows fonts and files, not a timer), then the circle floods with colour. The dark
// opens from the middle like eyes opening, and on the home page the pencil line flies down to become the
// underline beneath the tagline.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [inked, setInked] = useState(false);
  const [visible, setVisible] = useState(true);
  const ui = useUI();
  const t = ui.preloader;

  useEffect(() => {
    const seen = sessionStorage.getItem("mmb-loaded");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = () => {
      getLenis()?.start();
      (window as unknown as { __mmbReady?: boolean }).__mmbReady = true;
      window.dispatchEvent(new Event(PRELOADER_DONE));
    };
    const remove = () => {
      sessionStorage.setItem("mmb-loaded", "1");
      setVisible(false);
    };
    if (seen || reduced) {
      reveal();
      remove();
      return;
    }

    const q = gsap.utils.selector(root);

    // Real progress: a third straight away, most of it once the fonts are in, all of it when the page has loaded.
    let target = 30;
    const bump = (n: number) => (target = Math.max(target, n));
    document.fonts?.ready.then(() => bump(80));
    if (document.readyState === "complete") bump(100);
    else window.addEventListener("load", () => bump(100), { once: true });
    const cap = window.setTimeout(() => bump(100), MAX * 1000);
    // Safety net: if animation frames have stopped (an unusual browser, a frozen tab), never leave the site
    // covered. This checks on a timer, not on frames, and simply reveals the page.
    let finished = false;
    const startedAt = performance.now();
    let lastFrame = startedAt;
    const rescue = window.setInterval(() => {
      const now = performance.now();
      if (finished || document.hidden || now - startedAt < (MAX + 2) * 1000 || now - lastFrame < 1500) return;
      finished = true;
      window.clearInterval(rescue);
      reveal();
      remove();
    }, 1000);

    // The ending: ink fills the mark, the words change, then the dark opens and the line lands.
    const end = () => {
      setInked(true);
      const target = document.querySelector("[data-landing]")?.getBoundingClientRect();
      const l = target && target.width > 0 && window.scrollY < 10 ? { ax: target.left, ay: target.top + target.height / 2, bx: target.right } : null;
      const tl = gsap.timeline({
        onComplete: () => {
          finished = true;
          remove();
        },
      });
      tl.fromTo(q(".pl-ink"), { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "expo.out", transformOrigin: "50% 50%" }, 0)
        .to(q(".pl-meta, .pl-mark"), { autoAlpha: 0, y: -8, duration: 0.35, ease: "power2.in" }, 0.45)
        .add(() => {
          if (root.current) root.current.style.pointerEvents = "none";
        })
        .to(q(".pl-top"), { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, 0.7)
        .to(q(".pl-bottom"), { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, 0.7)
        .add(reveal, 0.95);
      if (l) {
        const len = l.bx - l.ax;
        tl.to(q(".pl-svg"), { x: l.ax, y: l.ay - window.innerHeight / 2, scaleX: len / window.innerWidth, transformOrigin: "0% 50%", duration: 0.75, ease: "power3.inOut" }, 0.7).to(q(".pl-svg"), { autoAlpha: 0, duration: 0.4 }, ">-0.05");
      } else {
        tl.to(q(".pl-svg"), { autoAlpha: 0, duration: 0.3 }, 0.6);
      }
    };

    // Each frame: ease toward the real progress (but never faster than MIN allows), and draw the sketch with it.
    let v = 0;
    let elapsed = 0;
    let done = false;
    let last = 0;
    const path = (sel: string) => root.current?.querySelector<SVGPathElement>(sel);
    const line = path(".pl-line");
    const ring = path(".pl-ring");
    const em = path(".pl-m");
    const tick = (_: number, dtMs: number) => {
      lastFrame = performance.now();
      if (done) return;
      const dt = Math.min(0.1, dtMs / 1000);
      elapsed += dt;
      // Eased toward the target, but capped in speed so the sketch always takes at least MIN seconds.
      v = Math.min(target, v + Math.max(0, (target - v) * (1 - Math.pow(0.02, dt))), v + (100 / MIN) * dt);
      const p = v / 100;
      line?.style.setProperty("stroke-dashoffset", String(1 - p));
      ring?.style.setProperty("stroke-dashoffset", String(1 - Math.min(1, p / 0.7)));
      em?.style.setProperty("stroke-dashoffset", String(1 - Math.min(1, Math.max(0, (p - 0.45) / 0.5))));
      const shown = Math.round(v);
      if (shown !== last) setCount((last = shown));
      if (v >= 99.5 && elapsed >= MIN) {
        done = true;
        setCount(100);
        end();
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.clearTimeout(cap);
      window.clearInterval(rescue);
    };
  }, []);

  if (!visible) return null;

  const hero = ui.hero;
  return (
    <div ref={root} className="fixed inset-0 z-[100] text-bone" role="status" aria-label={t.loading}>
      {/* The two halves of the dark, which part like eyelids. */}
      <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-void" />
      <div className="pl-bottom absolute inset-x-0 bottom-0 h-1/2 bg-void" />

      <svg className="pl-svg absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-24" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="pl-line" d="M0 52 C 120 46, 220 58, 340 50 S 560 44, 680 53 S 880 49, 1000 50" stroke="#EEEAE1" strokeWidth="1.2" pathLength={1} strokeDasharray="1" strokeDashoffset="1" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* The brand mark, sketched in pencil, then inked. */}
      <svg className="pl-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+76px)] size-24 md:size-28" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle className="pl-ink" cx="32" cy="32" r="24" fill="#FF4A1C" style={{ opacity: 0 }} />
        <path className="pl-ring" d="M32 8 A24 24 0 1 1 31.9 8" stroke="#EEEAE1" strokeWidth="1.1" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
        <path className="pl-m" d="M21 44 L23.5 21 L32 34 L40.5 21 L43 44" stroke={inked ? "#060708" : "#EEEAE1"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" style={{ transition: "stroke 0.3s" }} />
      </svg>

      <div className="pl-meta absolute inset-x-5 md:inset-x-10 top-6 flex justify-between label text-fog">
        <span>Muhammad Muneeb Bilal</span>
        <span>{t.sheet}</span>
      </div>
      <div className="pl-meta absolute inset-x-5 md:inset-x-10 bottom-6 flex items-end justify-between gap-6">
        <p className="label text-fog" aria-live="polite">
          {inked ? (
            <>
              {hero.before}
              <span className="text-signal">{hero.highlight}</span>
              {hero.after}
            </>
          ) : (
            hero.line1
          )}
        </p>
        <span className="type-x text-[44px] md:text-[64px] leading-none tabular-nums text-bone/90">{String(count).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
