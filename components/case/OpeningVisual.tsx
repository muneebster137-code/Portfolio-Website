"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getTier, sized } from "@/components/fx/perf";

gsap.registerPlugin(ScrollTrigger);

// Turns a picture into the pencil drawing it started as, once, on a small canvas: edges become graphite
// lines, tones become light shading on paper. Done in plain JavaScript so it works in every browser.
async function pencilVersion(src: string, width: number) {
  const img = new window.Image();
  img.src = src;
  await img.decode();
  const w = width;
  const h = Math.round((img.height / img.width) * w);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d", { willReadFrequently: true })!;
  x.drawImage(img, 0, 0, w, h);
  const src4 = x.getImageData(0, 0, w, h);
  const d = src4.data;
  const grey = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) grey[i] = (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114) / 255;
  const out = x.createImageData(w, h);
  const o = out.data;
  for (let yy = 1; yy < h - 1; yy++) {
    for (let xx = 1; xx < w - 1; xx++) {
      const i = yy * w + xx;
      const gx = grey[i - w + 1] + 2 * grey[i + 1] + grey[i + w + 1] - grey[i - w - 1] - 2 * grey[i - 1] - grey[i + w - 1];
      const gy = grey[i + w - 1] + 2 * grey[i + w] + grey[i + w + 1] - grey[i - w - 1] - 2 * grey[i - w] - grey[i - w + 1];
      const line = Math.min(1, Math.hypot(gx, gy) * 1.6);
      const shade = 0.78 + 0.22 * grey[i];
      const v = shade * (1 - line * 0.85);
      o[i * 4] = 242 * v;
      o[i * 4 + 1] = 239 * v;
      o[i * 4 + 2] = 231 * v;
      o[i * 4 + 3] = 255;
    }
  }
  x.putImageData(out, 0, 0);
  return c;
}

// The opening visual starts tilted back in space and settles flat as it scrolls into place. On picture
// openings, a handle wipes between the pencil sketch (left) and the finished work (right).
export function OpeningVisual({ src, alt, accent, video, initials }: { src?: string; alt: string; accent: string; video: boolean; initials: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const sketchHost = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [wipe, setWipe] = useState(100);
  const wipeable = !!src && !video;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        plane.current,
        { rotationX: 22, scale: 0.86, y: 40 },
        { rotationX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "top 20%", scrub: true } }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  // Draw the sketch when the browser is idle, then reveal half of it as the visual comes into view.
  useEffect(() => {
    if (!wipeable) return;
    let cancelled = false;
    const run = () =>
      pencilVersion(sized(src, 1080)!, getTier() === "high" ? 1080 : 760)
        .then((canvas) => {
          if (cancelled || !sketchHost.current) return;
          canvas.className = "absolute inset-0 size-full object-cover";
          canvas.setAttribute("aria-hidden", "true");
          sketchHost.current.replaceChildren(canvas);
          setReady(true);
        })
        .catch(() => {});
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) idle(run);
    else setTimeout(run, 300);
    return () => {
      cancelled = true;
    };
  }, [src, wipeable]);

  useEffect(() => {
    if (!ready || !wrap.current) return;
    const v = { p: 100 };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return setWipe(50);
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top 60%",
      once: true,
      onEnter: () => gsap.to(v, { p: 50, duration: 1.4, ease: "power3.inOut", onUpdate: () => setWipe(v.p) }),
    });
    return () => st.kill();
  }, [ready]);

  // Mouse: drag anywhere. Touch: drag the handle (so the page still scrolls). Keyboard: the slider.
  const dragging = useRef(false);
  const fromPointer = (e: React.PointerEvent) => {
    const r = area.current!.getBoundingClientRect();
    setWipe(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };
  const down = (e: React.PointerEvent) => {
    if (!ready) return;
    const r = area.current!.getBoundingClientRect();
    const handleX = r.left + (wipe / 100) * r.width;
    if (e.pointerType !== "mouse" && Math.abs(e.clientX - handleX) > 44) return;
    dragging.current = true;
    area.current!.setPointerCapture(e.pointerId);
    fromPointer(e);
  };

  return (
    <div ref={wrap} className="[perspective:2000px]">
      <div ref={plane} className="relative aspect-[16/9] md:aspect-[21/9] origin-bottom">
        <div
          ref={area}
          data-opening
          onPointerDown={down}
          onPointerMove={(e) => dragging.current && fromPointer(e)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          className={`absolute inset-0 rounded-[26px] overflow-hidden border border-hair bg-carbon [touch-action:pan-y] ${ready ? "cursor-ew-resize select-none" : ""}`}
        >
          {src ? (
            <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <span className="absolute inset-0 grid place-items-center type-x text-[30vw] md:text-[16vw] leading-none" style={{ color: accent }} aria-hidden="true">{initials}</span>
          )}

          {wipeable && (
            <>
              <div ref={sketchHost} className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`} style={{ clipPath: `inset(0 ${100 - wipe}% 0 0)` }} />
              {ready && (
                <>
                  <div className="pointer-events-none absolute inset-y-0 w-px bg-bone/80" style={{ left: `${wipe}%` }} aria-hidden="true">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]" style={{ background: "var(--case, #EEEAE1)", color: "var(--case-ink, #060708)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                  <span className="pointer-events-none label absolute left-4 top-4 rounded-full bg-[#F2EFE7] px-3 py-1.5 text-void" aria-hidden="true">Sketch</span>
                  <span className="pointer-events-none label absolute right-4 top-4 rounded-full bg-void/80 px-3 py-1.5 text-bone" aria-hidden="true">Final</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(wipe)}
                    onChange={(e) => setWipe(Number(e.target.value))}
                    aria-label="Compare the pencil sketch with the final work"
                    className="sr-only"
                  />
                </>
              )}
            </>
          )}

          {video && (
            <>
              <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
                <span className="grid place-items-center size-24 md:size-28 rounded-full bg-bone text-void">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
              <span className="label absolute left-5 bottom-5 rounded-full bg-void border border-hair px-3 py-2">Opening reel · video to supply</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
