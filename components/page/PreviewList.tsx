"use client";

import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type PreviewItem = {
  href: string;
  index: string;
  title: string;
  summary: string;
  meta: string;
  tags?: string[];
  color: string;
  image?: string;
};

// A big index list. A preview card follows the cursor in 3D, leaning with its speed.
export function PreviewList({ items }: { items: PreviewItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    const el = card.current;
    const ctx = gsap.context(() => {
      gsap.from("[data-row]", { yPercent: 40, autoAlpha: 0, stagger: 0.05, duration: 1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
    }, root);
    if (!el || window.matchMedia("(hover: none)").matches) return () => ctx.revert();
    gsap.set(el, { transformPerspective: 900 });
    const x = gsap.quickTo(el, "x", { duration: 0.32, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.32, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3.out" });
    const rz = gsap.quickTo(el, "rotation", { duration: 0.4, ease: "power3.out" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      setTracking(true);
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      x(e.clientX);
      y(e.clientY);
      ry(gsap.utils.clamp(-12, 12, dx * 0.6));
      rz(gsap.utils.clamp(-3, 3, dx * 0.15));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  const shown = hover === null ? null : items[hover];

  return (
    <div ref={root} className="relative border-b border-hair" onPointerLeave={() => setHover(null)}>
      {items.map((it, i) => (
        <Link
          key={it.href}
          href={it.href}
          data-row
          onPointerEnter={() => setHover(i)}
          onFocus={() => setHover(i)}
          className="group relative grid grid-cols-[48px_minmax(0,1fr)] md:grid-cols-[80px_minmax(0,1.3fr)_minmax(0,1fr)_120px] gap-x-6 gap-y-2 items-center border-t border-hair py-6 md:py-8"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]" style={{ background: `color-mix(in srgb, ${it.color} 7%, transparent)` }} aria-hidden="true" />
          <span className="relative label text-fog flex items-center gap-2">
            {it.index}
          </span>
          <span className="relative">
            <span className="type-x block text-[8vw] md:text-[2.9vw] leading-[0.92] [overflow-wrap:anywhere]">{it.title}</span>
            {it.tags && it.tags.length > 0 && (
              <span className="flex flex-wrap gap-2 mt-3">
                {it.tags.map((t) => (
                  <span key={t} className="label rounded-full border border-bone/20 px-2.5 py-1.5 text-mist">{t}</span>
                ))}
              </span>
            )}
          </span>
          <span className="relative col-start-2 md:col-start-auto text-mist text-[16px] md:text-[18px] leading-snug">{it.summary}</span>
          <span className="relative col-start-2 md:col-start-auto label text-fog md:text-right">{it.meta}</span>
        </Link>
      ))}

      <div
        ref={card}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ opacity: shown && tracking ? 1 : 0, transition: "opacity .3s" }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-[300px] h-[380px] rounded-[18px] overflow-hidden border border-hair shadow-[0_40px_80px_-20px_rgba(0,0,0,.8)]" style={{ background: shown?.color ?? "transparent" }}>
          {shown?.image ? (
            <Image src={shown.image} alt="" fill sizes="300px" className="object-cover" />
          ) : (
            <span className="absolute inset-x-5 bottom-5 type-x text-[30px] leading-[0.92] [overflow-wrap:anywhere]" style={{ color: "#060708" }}>{shown?.title}</span>
          )}
        </div>
      </div>
    </div>
  );
}
