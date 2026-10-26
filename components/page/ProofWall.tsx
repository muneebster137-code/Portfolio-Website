"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { pointer } from "@/components/three/store";
import { getTier } from "@/components/fx/perf";

export type Note = { quote: string; name: string; title: string; source: string };
export type Logo = { name: string; src: string };

// Where each pinned piece sits on the wall (percent of the wall) and how it hangs (degrees).
const SPOTS = [
  { x: 2, y: 4, r: -4 },
  { x: 36, y: 0, r: 2.5 },
  { x: 70, y: 6, r: -2 },
  { x: 14, y: 50, r: 3 },
  { x: 50, y: 46, r: -3.5 },
  { x: 80, y: 56, r: 2 },
  { x: 30, y: 82, r: -1.5 },
  { x: 62, y: 88, r: 4 },
];
const LOGO_SPOTS = [
  { x: 28, y: 30, r: 6 },
  { x: 90, y: 30, r: -7 },
  { x: 4, y: 88, r: -5 },
  { x: 90, y: 92, r: 5 },
];

function Pin() {
  return <span aria-hidden="true" className="absolute left-1/2 -top-2 -translate-x-1/2 size-3.5 rounded-full bg-signal shadow-[0_3px_5px_rgba(0,0,0,0.45)]" />;
}

// What clients say, as handwritten notes and their logos pinned to a wall. They sway a little with the
// mouse; pick one up to read it properly. On phones the wall becomes a row you swipe through.
export function ProofWall({ notes, logos }: { notes: Note[]; logos: Logo[] }) {
  const wall = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = wall.current;
    if (!el || getTier() === "low" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    const frame = (now: number) => {
      const t = now / 1000;
      items.current.forEach((it, i) => {
        if (!it) return;
        const depth = 0.6 + (i % 3) * 0.25;
        it.style.transform = `rotateZ(${Number(it.dataset.r) + Math.sin(t * 0.7 + i) * 0.8}deg) rotateY(${pointer.x * 10 * depth}deg) rotateX(${-pointer.y * 6 * depth}deg)`;
      });
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (open === null) return;
    close.current?.focus();
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  const note = open !== null ? notes[open] : null;

  return (
    <>
      <div ref={wall} className="relative mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-5 px-5 [scrollbar-width:none] md:mx-0 md:px-0 md:block md:h-[min(1100px,120vw)] md:overflow-visible md:[perspective:1400px]">
        {notes.slice(0, SPOTS.length).map((n, i) => (
          <button
            key={n.name + i}
            ref={(el) => { items.current[i] = el; }}
            type="button"
            data-r={SPOTS[i].r}
            onClick={() => setOpen(i)}
            aria-label={`Read what ${n.name} said`}
            className="group relative shrink-0 snap-center w-[78vw] max-w-[320px] md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[clamp(240px,22vw,320px)] origin-top bg-[#F2EFE7] text-void text-left p-6 shadow-[0_24px_40px_-20px_rgba(0,0,0,0.85)] transition-shadow hover:shadow-[0_40px_60px_-24px_rgba(0,0,0,0.9)]"
            style={{ ["--x" as string]: `${SPOTS[i].x}%`, ["--y" as string]: `${SPOTS[i].y}%`, transform: `rotateZ(${SPOTS[i].r}deg)` }}
          >
            <Pin />
            <span className="block type-c text-[17px] leading-[1.35] text-void/85 line-clamp-6">&ldquo;{n.quote}&rdquo;</span>
            <span className="block mt-5 text-[14px] font-medium">{n.name}</span>
            <span className="block label text-void/50 mt-1">{n.title}</span>
          </button>
        ))}
        {logos.slice(0, LOGO_SPOTS.length).map((l, j) => {
          const i = notes.length + j;
          return (
            <span
              key={l.name}
              ref={(el) => { items.current[i] = el; }}
              data-r={LOGO_SPOTS[j].r}
              className="relative shrink-0 snap-center hidden md:grid md:absolute md:left-[var(--x)] md:top-[var(--y)] size-[clamp(96px,9vw,130px)] place-items-center origin-top bg-[#F7F4EC] p-4 shadow-[0_18px_30px_-16px_rgba(0,0,0,0.85)]"
              style={{ ["--x" as string]: `${LOGO_SPOTS[j].x}%`, ["--y" as string]: `${LOGO_SPOTS[j].y}%`, transform: `rotateZ(${LOGO_SPOTS[j].r}deg)` }}
            >
              <Pin />
              <span className="relative size-full">
                <Image src={l.src} alt={`${l.name} logo`} fill sizes="130px" className="object-contain" />
              </span>
            </span>
          );
        })}
      </div>

      {note && (
        <div role="dialog" aria-modal="true" aria-label={`What ${note.name} said`} className="fixed inset-0 z-[96] grid place-items-center bg-void/80 p-5 animate-[fade-in_0.3s_ease-out]" onClick={() => setOpen(null)}>
          <figure className="relative w-full max-w-[640px] bg-[#F2EFE7] text-void p-8 md:p-12 rotate-[-1.2deg] shadow-[0_60px_100px_-30px_rgba(0,0,0,0.9)]" onClick={(e) => e.stopPropagation()}>
            <Pin />
            <blockquote className="type-c text-[22px] md:text-[30px] leading-[1.3]">&ldquo;{note.quote}&rdquo;</blockquote>
            <figcaption className="mt-8">
              <span className="block font-medium">{note.name}</span>
              <span className="block label text-void/55 mt-1">{note.title} · {note.source}</span>
            </figcaption>
            <button ref={close} type="button" onClick={() => setOpen(null)} className="absolute right-4 top-4 label text-void/60 hover:text-void">
              Pin it back
            </button>
          </figure>
        </div>
      )}
    </>
  );
}
