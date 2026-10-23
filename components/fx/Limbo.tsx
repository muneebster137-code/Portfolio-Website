"use client";

import { useEffect, useState } from "react";

// A secret: type "dream" anywhere (outside a form field), or keep scrolling past the very end of a page,
// and the site flips into its own negative, limbo. Type it again, press Escape, or wait, to wake up.
export function Limbo() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("limbo", on);
    if (!on) return;
    const t = setTimeout(() => setOn(false), 12000);
    return () => clearTimeout(t);
  }, [on]);

  useEffect(() => {
    let typed = "";
    let push = 0;
    let pushAt = 0;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOn(false);
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest("input, textarea, select, [contenteditable]") || e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-5);
      if (typed === "dream") {
        typed = "";
        setOn((v) => !v);
      }
    };
    // Past the end: wheel down while already at the bottom, hard enough, in a short time.
    const wheel = (e: WheelEvent) => {
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (!atEnd || e.deltaY <= 0) return;
      const now = performance.now();
      if (now - pushAt > 1500) push = 0;
      pushAt = now;
      push += e.deltaY;
      if (push > 2400) {
        push = 0;
        setOn(true);
      }
    };
    window.addEventListener("keydown", key);
    window.addEventListener("wheel", wheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("wheel", wheel);
      document.documentElement.classList.remove("limbo");
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className={`pointer-events-none fixed left-1/2 top-24 z-[96] -translate-x-1/2 rounded-full bg-void px-5 py-3 label text-bone ring-1 ring-bone/20 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
      {on ? "You're in limbo. Type dream again, or press Esc, to wake up." : ""}
    </div>
  );
}
