"use client";

import { useEffect, useState } from "react";
import type * as THREE from "three";
import { services } from "@/lib/site";
import { makeSwatchTexture } from "./swatchTexture";

// Textures are drawn with the page fonts, so wait for them before painting.
export function useSwatchTextures() {
  const [textures, setTextures] = useState<THREE.CanvasTexture[] | null>(null);

  useEffect(() => {
    let made: THREE.CanvasTexture[] = [];
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      made = services.map((s, i) => makeSwatchTexture(s, i));
      setTextures(made);
    });
    return () => {
      alive = false;
      made.forEach((t) => t.dispose());
    };
  }, []);

  return textures;
}
