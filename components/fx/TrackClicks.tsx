"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Counts the clicks that matter in Vercel Analytics: any element with data-track="event_name" (and an
// optional data-track-from="where") sends that event with the page it happened on.
export function TrackClicks() {
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track!, { page: window.location.pathname, ...(el.dataset.trackFrom && { from: el.dataset.trackFrom }) });
    };
    // Capture phase: page transitions stop link clicks from bubbling, and the count must happen first.
    window.addEventListener("click", click, true);
    return () => window.removeEventListener("click", click, true);
  }, []);
  return null;
}
