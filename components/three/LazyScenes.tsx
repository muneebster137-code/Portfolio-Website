"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInViewport } from "./useInViewport";

// Client-only wrappers so server pages can place 3D scenes. Each pauses while off screen.

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const SwatchCardScene = dynamic(() => import("./SwatchCardScene"), { ssr: false });
const PackagingScene = dynamic(() => import("./PackagingScene"), { ssr: false });

export function OpenFan({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInViewport(ref, "0px");
  return (
    <div ref={ref} className={className}>
      <HeroScene active={active} fixedProgress={0.16} />
    </div>
  );
}

export function SwatchCard({ index, className = "" }: { index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInViewport(ref, "0px");
  return (
    <div ref={ref} className={className}>
      <SwatchCardScene index={index} active={active} />
    </div>
  );
}

export function PackagingModel({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <PackagingScene />
    </div>
  );
}
