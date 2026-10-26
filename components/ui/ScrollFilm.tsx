"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RATIOS } from "@/lib/media-manifest";
import type { Resolved } from "@/lib/media.server";
import { getTier } from "@/components/fx/perf";
import { VideoSlot } from "./VideoSlot";
import { useUI } from "@/components/i18n";

// A film you play with the scroll, frame by frame, like a product page from Apple. It uses the light
// scroll copy (name.scrub.mp4, a keyframe every few frames) so seeking stays smooth; "Watch with sound"
// swaps in the full film. Weak devices and reduced motion get the normal player instead.
export function ScrollFilm({ slot }: { slot: Resolved }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"scroll" | "plain" | "watch">("scroll");
  const t = useUI().media;
  // The scroll copy only starts downloading when the film is about a screen away.
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [near, mode]);

  useEffect(() => {
    if (!slot.scrub || getTier() === "low" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMode("plain");
  }, [slot.scrub]);

  useEffect(() => {
    const v = video.current;
    if (mode !== "scroll" || !v || !wrap.current) return;
    let target = 0;
    let raf = 0;
    // Seek toward the scroll position, never queuing a new seek while one is still in progress.
    const step = () => {
      raf = 0;
      if (!v.duration || v.seeking) return void (raf = requestAnimationFrame(step));
      if (Math.abs(v.currentTime - target) > 1 / 30) {
        const fast = v as HTMLVideoElement & { fastSeek?: (t: number) => void };
        if (fast.fastSeek && Math.abs(v.currentTime - target) > 1.5) fast.fastSeek(target);
        else v.currentTime = target;
        raf = requestAnimationFrame(step);
      }
    };
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        target = self.progress * (v.duration || 0);
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
        if (!raf) raf = requestAnimationFrame(step);
      },
    });
    return () => {
      st.kill();
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  if (mode === "plain") return <VideoSlot slot={slot} />;
  if (mode === "watch")
    return (
      <div>
        <VideoSlot slot={slot} />
        <button type="button" onClick={() => setMode("scroll")} className="mt-4 label text-fog hover:text-bone">{t.backToScrolling}</button>
      </div>
    );

  return (
    <div ref={wrap} className="relative h-[260svh]">
      <div className="sticky top-[12svh] h-[76svh] flex flex-col justify-center">
        <div className="relative overflow-hidden rounded-[14px] ring-1 ring-inset ring-hair bg-black" style={{ aspectRatio: RATIOS[slot.ratio].css }}>
          <video ref={video} src={near ? slot.scrub : undefined} poster={slot.poster} muted playsInline preload="auto" aria-label={`${slot.label}, ${t.playedByScrolling}`} className="absolute inset-0 size-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-bone/15" aria-hidden="true">
            <span ref={bar} className="absolute inset-0 origin-left bg-bone" style={{ transform: "scaleX(0)" }} />
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="label text-fog">{t.scrollToPlay}</p>
          <button type="button" onClick={() => setMode("watch")} className="inline-flex h-10 items-center rounded-full px-4 text-sm ring-1 ring-bone/25 hover:ring-bone transition">
            {t.watchWithSound}
          </button>
        </div>
      </div>
    </div>
  );
}
