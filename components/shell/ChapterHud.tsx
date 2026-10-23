"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "./SmoothScroll";

type Marker = { id: string; label: string; at: number };

// A film-timeline scrubber: one marker per [data-chapter] section, a playhead for scroll progress.
export function ChapterHud() {
  const pathname = usePathname();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState("");
  const head = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const els = [...document.querySelectorAll<HTMLElement>("[data-chapter]")];
      setMarkers(
        els.map((el) => ({
          id: el.id,
          label: el.dataset.chapter ?? "",
          at: max > 0 ? Math.min(1, (el.getBoundingClientRect().top + window.scrollY) / max) : 0,
        }))
      );
    };
    const t = setTimeout(measure, 300);
    ScrollTrigger.addEventListener("refresh", measure);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      ScrollTrigger.removeEventListener("refresh", measure);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (head.current) head.current.style.left = `${p * 100}%`;
      if (fill.current) fill.current.style.transform = `scaleX(${p})`;
      let idx = 0;
      markers.forEach((m, i) => p + 0.001 >= m.at && (idx = i));
      setCurrent(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [markers]);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (markers.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 hidden md:flex items-center gap-6 pl-8 pr-24 pb-4 pt-3 text-bone mix-blend-difference pointer-events-none">
      <span className="label w-28 shrink-0 tabular-nums">
        {String(current + 1).padStart(2, "0")}/{String(markers.length).padStart(2, "0")} {markers[current]?.label}
      </span>
      <div className="relative h-4 flex-1 pointer-events-auto">
        <span className="absolute inset-x-0 top-1/2 h-px bg-bone/30" />
        <span ref={fill} className="absolute inset-x-0 top-1/2 h-px bg-bone origin-left" style={{ transform: "scaleX(0)" }} />
        {markers.map((m, i) => (
          <button
            key={m.id}
            type="button"
            aria-label={`Go to ${m.label}`}
            onClick={() => getLenis()?.scrollTo(`#${m.id}`, { duration: 1.6 })}
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 rotate-45 border border-bone transition-colors ${i <= current ? "bg-bone" : "bg-transparent"}`}
            style={{ left: `${m.at * 100}%` }}
          />
        ))}
        <span ref={head} className="absolute top-0 h-4 w-px bg-bone" />
      </div>
      <span className="label w-36 shrink-0 text-right tabular-nums">Islamabad {time}</span>
    </div>
  );
}
