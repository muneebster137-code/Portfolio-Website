// Mutable scroll and pointer state shared between GSAP (DOM) and react-three-fiber (render loop).
// Plain objects on purpose: they change every frame and must not trigger React renders.

// first: 0..1 of the opening pencil line drawn on the sheet. line: where that line sits on screen,
// so the preloader's line can land exactly on it.
export const dreamState = {
  progress: 0,
  first: 0,
  line: null as null | { ax: number; ay: number; bx: number; by: number },
  // Once the visitor has drawn enough on the sheet: returns their drawing as an image.
  sketch: null as null | (() => string),
};
// Fired once, when the visitor's drawing on the sheet is big enough to send with a brief.
export const SKETCHED = "mmb:sketched";
// Where that drawing waits (this visit only) until the contact form picks it up.
export const SKETCH_KEY = "mmb-sketch";
export const showcaseState = { head: 0 };
// scale: 1 is normal speed; holding the mouse down slows the whole site toward 0.12 (see TimeDilation).
// t: seconds on that slowable clock, which the 3D scenes run on.
export const time = { scale: 1, t: 0 };
export const pointer = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
