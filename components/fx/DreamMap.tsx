"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nameFor } from "@/lib/page-name";
import { useLang, useUI } from "@/components/i18n";
import { stripLang } from "@/lib/i18n";
import { pencil } from "./sound";

gsap.registerPlugin(ScrollTrigger);

const KEY = "mmb-path";
const MAX = 7;

// Every visit leaves a trail. The footer draws, in pencil, the path this visitor took through the site,
// room by room, ending where they are now.
export function DreamMap() {
  const pathname = usePathname();
  const lang = useLang();
  const t = useUI().footer;
  const [path, setPath] = useState<string[]>([]);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let list: string[] = [];
    try {
      list = JSON.parse(sessionStorage.getItem(KEY) ?? "[]");
    } catch {}
    if (list[list.length - 1] !== pathname) list.push(pathname);
    list = list.slice(-MAX);
    try {
      sessionStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
    setPath(list);
  }, [pathname]);

  const n = path.length;
  // Points across the sheet, alternating up and down a little, with a hand-drawn wobble.
  const pts = path.map((_, i) => ({ x: n > 1 ? 8 + (84 * i) / (n - 1) : 50, y: 50 + (i % 2 ? -22 : 22) + Math.sin(i * 2.3) * 6 }));
  const d = pts.reduce((acc, p, i) => {
    if (!i) return `M ${p.x} ${p.y}`;
    const q = pts[i - 1];
    return `${acc} Q ${(q.x + p.x) / 2 + 3} ${(q.y + p.y) / 2 - 10} ${p.x} ${p.y}`;
  }, "");

  useEffect(() => {
    const el = root.current;
    if (!el || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%" } });
      tl.fromTo(".dm-line", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35 * n, ease: "power1.inOut", onUpdate: () => pencil(900) }).from(
        ".dm-stop",
        { autoAlpha: 0, y: 6, duration: 0.3, stagger: 0.35 },
        0
      );
    }, el);
    return () => ctx.revert();
  }, [n, d]);

  return (
    <div ref={root} className="mx-auto max-w-[1600px] px-5 md:px-10 pb-10">
      <p className="label text-void/55">{t.pathTitle}</p>
      {n < 2 ? (
        <p className="mt-3 text-[15px] text-void/60">{t.pathOne}</p>
      ) : (
        <div className="relative mt-4 h-28 md:h-32">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
            <path className="dm-line" d={d} fill="none" stroke="#26282E" strokeOpacity="0.75" strokeWidth="1.3" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
            <path className="dm-line" d={d} fill="none" stroke="#26282E" strokeOpacity="0.3" strokeWidth="1" transform="translate(0.15 0.8)" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
          </svg>
          <ol className="absolute inset-0" aria-label={t.pathAria}>
            {path.map((p, i) => {
              const here = i === n - 1;
              return (
                <li key={`${p}-${i}`} className="dm-stop absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}>
                  <span className={`block size-2.5 rounded-full ${here ? "bg-signal" : "bg-void/80"}`} />
                  <span className={`absolute whitespace-nowrap label ${i % 2 ? "bottom-full mb-2" : "top-full mt-2"} ${here ? "text-void" : "text-void/55"}`}>
                    {here ? `${nameFor(stripLang(p), "", true, lang)} · ${t.youAreHere}` : nameFor(stripLang(p), "", true, lang)}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
