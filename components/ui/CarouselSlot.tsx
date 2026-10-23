"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { RATIOS } from "@/lib/media-manifest";
import type { Resolved } from "@/lib/media.server";
import { Placeholder } from "./Slot";

// One carousel post, swiped the way it is on Instagram: slides side by side, snapping one at a time.
export function CarouselSlot({ slides, className = "" }: { slides: Resolved[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={`group relative ${className}`}>
      <div
        ref={track}
        data-lenis-prevent
        onScroll={(e) => setAt(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex overflow-x-auto snap-x snap-mandatory rounded-[10px] ring-1 ring-inset ring-hair bg-carbon [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ aspectRatio: RATIOS[slides[0].ratio].css }}
        aria-label="Carousel post"
        tabIndex={0}
      >
        {slides.map((s) => (
          <div key={s.path} className="relative shrink-0 w-full h-full snap-start">
            {s.src ? <Image src={s.src} alt={s.label} fill sizes="25vw" className="object-cover" /> : <Placeholder slot={s} />}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
        <button type="button" onClick={() => go(at - 1)} aria-label="Previous slide" className="pointer-events-auto grid place-items-center size-8 rounded-full bg-void/70 text-bone backdrop-blur disabled:opacity-0 transition-opacity" disabled={at === 0}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button type="button" onClick={() => go(at + 1)} aria-label="Next slide" className="pointer-events-auto grid place-items-center size-8 rounded-full bg-void/70 text-bone backdrop-blur disabled:opacity-0 transition-opacity" disabled={at === slides.length - 1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none" aria-hidden="true">
        {slides.map((s, i) => <span key={s.path} className={`size-1.5 rounded-full transition-colors ${i === at ? "bg-bone" : "bg-bone/35"}`} />)}
      </div>
    </div>
  );
}
