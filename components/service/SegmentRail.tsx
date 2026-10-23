"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/shell/SmoothScroll";

// Sticky index of a service page's segments; the one on screen lights up in the service colour.
export function SegmentRail({ names, color }: { names: string[]; color: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const triggers = names.map((_, i) =>
      ScrollTrigger.create({
        trigger: `#seg-${i}`,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(i),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [names]);

  return (
    <nav aria-label="Segments" className="hidden lg:block sticky top-28 self-start">
      <p className="label text-fog mb-5">Segments</p>
      <ol className="space-y-2.5">
        {names.map((n, i) => (
          <li key={n}>
            <button
              type="button"
              onClick={() => getLenis()?.scrollTo(`#seg-${i}`, { offset: -110, duration: 1.4 })}
              aria-current={i === active}
              className={`flex items-center gap-3 text-left text-sm transition-colors ${i === active ? "text-bone" : "text-fog hover:text-mist"}`}
            >
              <span className="size-2.5 shrink-0 rotate-45 border transition-colors" style={{ borderColor: i === active ? color : "currentColor", background: i === active ? color : "transparent" }} />
              <span className="label w-6">{String(i + 1).padStart(2, "0")}</span>
              {n}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
