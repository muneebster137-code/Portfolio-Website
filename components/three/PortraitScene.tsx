"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { pointer, time } from "./store";
import { canvasQuality, sized, useTier } from "@/components/fx/perf";

// A rounded-corner alpha mask, shared by every card in the scene.
let maskTex: THREE.CanvasTexture | null = null;
function roundMask() {
  if (maskTex) return maskTex;
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.roundRect(0, 0, 256, 256, 14);
  ctx.fill();
  maskTex = new THREE.CanvasTexture(c);
  return maskTex;
}

// Crops a texture to fill a card of the given aspect.
function fit(tex: THREE.Texture, aspect: number) {
  const img = tex.image as { width: number; height: number };
  const src = img.width / img.height;
  tex.colorSpace = THREE.SRGBColorSpace;
  if (src > aspect) {
    tex.repeat.set(aspect / src, 1);
    tex.offset.set((1 - aspect / src) / 2, 0);
  } else {
    tex.repeat.set(1, src / aspect);
    tex.offset.set(0, (1 - src / aspect) / 2);
  }
  tex.needsUpdate = true;
  return tex;
}

const PH = 3.3; // portrait height in scene units

function Portrait({ src, cutout }: { src: string; cutout: boolean }) {
  const tex = useTexture(sized(src, 1080)!);
  const { width: iw, height: ih } = tex.image as { width: number; height: number };
  const aspect = cutout ? iw / ih : 0.78;
  const map = useMemo(() => {
    if (!cutout) return fit(tex.clone(), aspect);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [tex, cutout, aspect]);
  const w = PH * aspect;
  return (
    <group>
      {!cutout && (
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[w + 0.08, PH + 0.08]} />
          <meshBasicMaterial color="#EEEAE1" transparent opacity={0.14} alphaMap={roundMask()} toneMapped={false} />
        </mesh>
      )}
      <mesh>
        <planeGeometry args={[w, PH]} />
        <meshBasicMaterial map={map} transparent alphaMap={cutout ? undefined : roundMask()} alphaTest={cutout ? 0.04 : 0} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Where the floating work sits around the portrait: [x, y, z, size].
const ORBIT: [number, number, number, number][] = [
  [-2.25, 1.05, -1.6, 1],
  [2.15, 1.35, -2.4, 1.1],
  [2.35, -1.0, 0.7, 0.8],
  [-2.0, -1.25, 1.0, 0.75],
  [0.6, 2.05, -3.2, 1.2],
];

function Tiles({ srcs }: { srcs: string[] }) {
  const texs = useTexture(srcs.map((s) => sized(s, 640)!));
  const maps = useMemo(() => texs.map((t) => fit(t.clone(), 16 / 10)), [texs]);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(() => {
    const t = time.t;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const [x, y, z] = ORBIT[i];
      // Nearer cards drift further with the pointer: depth you can feel.
      const depth = 0.25 + (z + 3.2) * 0.12;
      m.position.set(x + pointer.x * depth * 0.6 + Math.sin(t * 0.3 + i) * 0.08, y + pointer.y * depth * 0.35 + Math.sin(t * 0.5 + i * 2) * 0.1, z);
      m.rotation.set(Math.sin(t * 0.4 + i) * 0.08, -x * 0.12 + Math.sin(t * 0.3 + i) * 0.1, Math.sin(t * 0.2 + i) * 0.04);
    });
  });
  return (
    <>
      {maps.map((m, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} scale={ORBIT[i][3]}>
          <planeGeometry args={[1.12, 0.7]} />
          <meshBasicMaterial map={m} alphaMap={roundMask()} transparent toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

function Stage({ src, cutout, tiles, ready }: { src?: string; cutout: boolean; tiles: string[]; ready: boolean }) {
  const float = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const appear = useRef(0);
  const { viewport } = useThree();
  // Narrow screens: a smaller portrait so the headline and button keep their room.
  const s = Math.min(1, viewport.width / 6.2, viewport.height / 4.6);

  useFrame((_, rawDt) => {
    const dt = rawDt * time.scale;
    const t = time.t;
    appear.current += ((ready ? 1 : 0) - appear.current) * (1 - Math.pow(0.02, dt));
    const a = appear.current;
    const g = float.current;
    if (g) {
      g.position.set(0, Math.sin(t * 0.6) * 0.08 - (1 - a) * 0.6, 0);
      g.rotation.set(-pointer.y * 0.12 + Math.sin(t * 0.4) * 0.02, pointer.x * 0.28 + Math.sin(t * 0.3) * 0.06, 0);
      g.scale.setScalar(s * (0.86 + 0.14 * a));
      g.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
        if (!m || !("opacity" in m)) return;
        if (m.userData.base === undefined) m.userData.base = m.opacity;
        m.opacity = (m.userData.base as number) * a;
      });
    }
    if (ring.current) ring.current.rotation.z += dt * 0.15;
  });

  return (
    <group ref={float}>
      {/* The orange disc from the first sketch, and a pencil construction ring around it. */}
      <mesh position={[0, 0.35, -1.1]}>
        <circleGeometry args={[1.55, 96]} />
        <meshBasicMaterial color="#FF4A1C" transparent toneMapped={false} />
      </mesh>
      <mesh ref={ring} position={[0.05, 0.3, -0.7]}>
        <ringGeometry args={[1.92, 1.935, 160, 1, 0, Math.PI * 1.82]} />
        <meshBasicMaterial color="#EEEAE1" transparent opacity={0.4} toneMapped={false} />
      </mesh>
      {tiles.length > 0 && (
        <Suspense fallback={null}>
          <Tiles srcs={tiles.slice(0, ORBIT.length)} />
        </Suspense>
      )}
      {src && (
        <Suspense fallback={null}>
          <Portrait src={src} cutout={cutout} />
        </Suspense>
      )}
    </group>
  );
}

export default function PortraitScene({ active, src, cutout, tiles, ready }: { active: boolean; src?: string; cutout: boolean; tiles: string[]; ready: boolean }) {
  const q = canvasQuality(useTier());
  return (
    <Canvas flat dpr={q.dpr} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 7.5], fov: 32 }} gl={{ antialias: q.antialias, alpha: true }} aria-hidden="true">
      <fog attach="fog" args={["#060708", 7, 13]} />
      <Stage src={src} cutout={cutout} tiles={tiles} ready={ready} />
    </Canvas>
  );
}
