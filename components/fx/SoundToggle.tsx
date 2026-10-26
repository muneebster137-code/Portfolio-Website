"use client";

import { useEffect, useState } from "react";
import { isSoundOn, onSoundChange, setSound } from "./sound";

// One small switch in the nav. Sound never plays unless the visitor turns it on.
export function SoundToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(isSoundOn());
    return onSoundChange(setOn);
  }, []);
  return (
    <button
      type="button"
      onClick={() => setSound(!on)}
      data-track={on ? undefined : "sound_on"}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      className="hidden md:grid h-11 w-11 place-items-center rounded-full bg-void/55 text-bone ring-1 ring-bone/10 backdrop-blur-xl backdrop-saturate-150 hover:ring-bone/40 transition"
    >
      <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
        {[2, 6, 10, 14].map((x, i) => (
          <rect key={x} x={x - 0.75} y={on ? 1 : 6} width="1.5" height={on ? 12 : 2} rx="0.75" fill="currentColor" className={on ? "origin-center animate-[eq_0.9s_ease-in-out_infinite]" : ""} style={{ animationDelay: `${i * 0.15}s`, transformBox: "fill-box" }} />
        ))}
      </svg>
    </button>
  );
}
