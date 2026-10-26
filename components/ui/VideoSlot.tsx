"use client";

import { useEffect, useRef, useState } from "react";
import { RATIOS } from "@/lib/media-manifest";
import type { Resolved } from "@/lib/media.server";
import { Placeholder } from "./Slot";
import { useUI } from "@/components/i18n";

const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
);
const PLAY = "M8 5v14l11-7z";
const PAUSE = "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z";
const SOUND = "M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z";
const MUTED = "M4 9v6h4l5 4V5L8 9H4zm15.6 3 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z";
const EXPAND = "M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm14 0h2v6h-6v-2h4v-4z";

// A reel or film in its own shape with play/pause, volume and expand. It plays muted while on screen;
// click the picture to play or pause, the corner button to watch it full screen.
export function VideoSlot({ slot, className = "", autoplay = true }: { slot: Resolved; className?: string; autoplay?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [full, setFull] = useState(false);
  const t = useUI().media;

  useEffect(() => {
    const el = video.current;
    if (!el || !autoplay) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [autoplay, slot.src]);

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === wrap.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };
  const setVol = (v: number) => {
    const el = video.current;
    if (!el) return;
    el.volume = v;
    el.muted = v === 0;
    setVolume(v);
    setMuted(v === 0);
  };
  const toggleMute = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted && el.volume === 0) setVol(0.8);
    setMuted(el.muted);
  };
  const expand = () => {
    const w = wrap.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) return document.exitFullscreen();
    if (w?.requestFullscreen) w.requestFullscreen().catch(() => v?.webkitEnterFullscreen?.());
    else if (w?.webkitRequestFullscreen) w.webkitRequestFullscreen();
    else v?.webkitEnterFullscreen?.();
  };

  return (
    <div
      ref={wrap}
      className={`group relative overflow-hidden rounded-[10px] ring-1 ring-inset ring-hair bg-black ${full ? "grid place-items-center" : ""} ${className}`}
      style={full ? undefined : { aspectRatio: RATIOS[slot.ratio].css }}
    >
      {slot.src ? (
        <>
          <video
            ref={video}
            src={slot.src}
            poster={slot.poster}
            muted={muted}
            loop
            playsInline
            preload={slot.poster ? "none" : "metadata"}
            aria-label={slot.label}
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className={`cursor-pointer ${full ? "max-h-screen max-w-full object-contain" : "absolute inset-0 size-full object-cover"}`}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-2.5 bg-gradient-to-t from-black/70 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <button type="button" onClick={toggle} aria-label={playing ? t.pause : t.play} className="grid place-items-center size-9 rounded-full bg-bone text-void">
              <Icon d={playing ? PAUSE : PLAY} />
            </button>
            <button type="button" onClick={toggleMute} aria-label={muted ? t.soundOn : t.mute} className="grid place-items-center size-9 rounded-full text-bone hover:bg-bone/15">
              <Icon d={muted ? MUTED : SOUND} size={18} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => setVol(Number(e.target.value))}
              aria-label={t.volume}
              className="w-16 md:w-20 accent-bone"
            />
            <button type="button" onClick={expand} aria-label={full ? t.exitFullscreen : t.fullscreen} className="ml-auto grid place-items-center size-9 rounded-full text-bone hover:bg-bone/15">
              <Icon d={EXPAND} size={18} />
            </button>
          </div>
        </>
      ) : (
        <Placeholder slot={slot} />
      )}
    </div>
  );
}
