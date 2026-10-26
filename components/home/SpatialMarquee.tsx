"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { time } from "@/components/three/store";
import { SketchHover } from "@/components/fx/SketchHover";

export type MarqueeItem = { slug: string; title: string; year: string; src: string };

const TILE_W = 300;
const TILE_H = 188;
const GAP = 34;

// Right after the hero: the work turning in space. The covers ride a slowly spinning drum, seen a
// little from above so the far side shows above the near one; the names circle the other way in
// outline type. Scrolling winds it up and sets its direction; hovering a cover stops it so you can look.
export function SpatialMarquee({ items }: { items: MarqueeItem[] }) {
  const root = useRef<HTMLElement>(null);
  const drum = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const shades = useRef<(HTMLSpanElement | null)[]>([]);
  const hold = useRef(false);
  const focusAt = useRef<number | null>(null);
  const [front, setFront] = useState(0);

  const n = items.length;
  const step = 360 / Math.max(1, n);
  const radius = Math.round((n * (TILE_W + GAP)) / (2 * Math.PI));
  const names = items.map((it) => it.title.split(" ")[0]);

  useEffect(() => {
    const el = root.current;
    if (!el || !n) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0;
    let speed = 6; // degrees a second
    let dir = -1;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    let visible = false;
    let shown = -1;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000) * time.scale;
      last = now;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? -1 : 1;
      const target = hold.current ? 0 : 6 + Math.min(60, Math.abs(dy) * 2.2);
      speed += (target - speed) * (1 - Math.pow(0.05, dt));
      if (focusAt.current !== null) {
        // Bring the focused cover round to the front, the short way.
        const want = -focusAt.current * step;
        const diff = ((want - angle + 540) % 360) - 180;
        angle += diff * (1 - Math.pow(0.002, dt));
      } else if (!still) angle += dir * speed * dt;

      if (drum.current) drum.current.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
      if (words.current) words.current.style.transform = `translateZ(${-radius}px) rotateY(${-angle * 0.6}deg)`;
      // Only the covers facing you are lit; the far side waits in the dark.
      let best = 0;
      let bestCos = -2;
      shades.current.forEach((s, i) => {
        const c = Math.cos(((angle + i * step) * Math.PI) / 180);
        if (c > bestCos) {
          bestCos = c;
          best = i;
        }
        if (s) s.style.opacity = String(Math.min(0.85, Math.max(0, 0.75 - c * 0.9)));
      });
      if (best !== shown) {
        shown = best;
        setFront(best);
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [n, step, radius]);

  if (!n) return null;
  const now = items[front];

  return (
    <section ref={root} id="glimpse" data-chapter="Glimpse" aria-labelledby="glimpse-h" className="relative h-[100svh] min-h-[680px] overflow-hidden bg-void">
      <div className="absolute inset-x-5 md:inset-x-10 top-24 md:top-28 z-10 flex flex-wrap items-end justify-between gap-4 pointer-events-none">
        <div>
          <p className="label text-fog">A glimpse of the work</p>
          <h2 id="glimpse-h" className="type-x mt-3 text-[9vw] md:text-[clamp(36px,3.6vw,64px)] leading-[0.95]">Eleven stories, in orbit</h2>
        </div>
        <Link href="/case-studies" className="pointer-events-auto inline-flex h-11 items-center rounded-full px-5 text-sm ring-1 ring-bone/25 hover:ring-bone transition">
          All case studies
        </Link>
      </div>

      <div className="absolute inset-0 grid place-items-center [perspective:1700px] [perspective-origin:50%_40%]">
        <div className="relative [transform-style:preserve-3d] scale-[0.52] sm:scale-[0.7] lg:scale-100 [transform:rotateX(-11deg)_rotateZ(-4deg)]">
          {/* The names, in outline, turning the other way on a wider ring below the covers. */}
          <div ref={words} className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]" aria-hidden="true">
            {names.map((w, i) => (
              <span
                key={i}
                className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap type-x text-[76px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(238,234,225,0.28)] [backface-visibility:hidden]"
                style={{ transform: `rotateY(${(i * 360) / names.length}deg) translateZ(${radius + 200}px) translateY(140px)` }}
              >
                {w}
              </span>
            ))}
          </div>

          <div ref={drum} className="relative [transform-style:preserve-3d]" style={{ width: TILE_W, height: TILE_H }}>
            {items.map((it, i) => (
              <div key={it.slug} className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}>
                <Link
                  href={`/case-studies/${it.slug}`}
                  aria-label={`${it.title} case study`}
                  onPointerEnter={() => (hold.current = true)}
                  onPointerLeave={() => (hold.current = false)}
                  onFocus={() => (focusAt.current = i)}
                  onBlur={() => (focusAt.current = null)}
                  className="absolute inset-0 block overflow-hidden rounded-[14px] bg-carbon ring-1 ring-bone/10 [backface-visibility:hidden] transition-transform duration-300 hover:[transform:translateZ(40px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
                >
                  <Image src={it.src} alt="" fill sizes="300px" className="object-cover" />
                  <SketchHover src={it.src} />
                  <span ref={(s) => { shades.current[i] = s; }} className="absolute inset-0 bg-void pointer-events-none" />
                </Link>
                {/* The back of each cover: dark board with its name, seen across the drum. */}
                <span className="absolute inset-0 grid place-items-center rounded-[14px] bg-[#0D0F12] ring-1 ring-bone/5 [backface-visibility:hidden] [transform:rotateY(180deg)]" aria-hidden="true">
                  <span className="label text-bone/30">{it.title}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-5 md:inset-x-10 bottom-10 md:bottom-12 z-10 flex items-end justify-between gap-6 pointer-events-none">
        <div>
          <p className="label text-fog">Now passing · {now.year}</p>
          <p className="type-x mt-2 text-[8vw] md:text-[clamp(28px,2.6vw,44px)] leading-none">{now.title}</p>
        </div>
        <p className="hidden md:block label text-fog text-right">Scroll to spin it<br />Hover to stop it</p>
      </div>
    </section>
  );
}
