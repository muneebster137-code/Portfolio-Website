"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { services } from "@/lib/site";
import { pointer, processState, smooth } from "./store";

// Three forms, one point cloud: Listen (a sphere that takes everything in),
// Shape the vision (a sheet of A4), Deliver (seven swatch colours sent outward).
function Morph({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { geo, sphere, sheet, burst, bone, swatch } = useMemo(() => {
    const sphere = new Float32Array(count * 3);
    const sheet = new Float32Array(count * 3);
    const burst = new Float32Array(count * 3);
    const bone = new Float32Array(count * 3);
    const swatch = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const cols = Math.round(Math.sqrt(count / 1.414));
    const rows = Math.ceil(count / cols);
    const boneC = new THREE.Color("#EEEAE1");
    const swatchCs = services.map((s) => new THREE.Color(s.color));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      sphere.set([Math.cos(th) * r * 2, y * 2, Math.sin(th) * r * 2], i * 3);

      const cx = i % cols;
      const cy = Math.floor(i / cols);
      sheet.set([(cx / (cols - 1) - 0.5) * 2.6, (cy / (rows - 1) - 0.5) * 3.7, 0], i * 3);

      const g = i % 7;
      const ang = (g / 7) * Math.PI * 2 + 0.3;
      const spread = Math.pow(Math.random(), 0.6) * 0.75;
      const dir = new THREE.Vector3(Math.cos(ang), Math.sin(ang) * 0.8, Math.sin(ang * 1.7) * 0.6).normalize();
      const jitter = new THREE.Vector3().randomDirection().multiplyScalar(spread);
      const p = dir.multiplyScalar(1.7 + Math.random() * 0.8).add(jitter);
      burst.set([p.x, p.y, p.z], i * 3);

      bone.set([boneC.r, boneC.g, boneC.b], i * 3);
      swatch.set([swatchCs[g].r, swatchCs[g].g, swatchCs[g].b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(sphere.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(bone.slice(), 3));
    return { geo, sphere, sheet, burst, bone, swatch };
  }, [count]);

  useFrame((state) => {
    const p = processState.progress;
    const t = state.clock.elapsedTime;
    const toSheet = smooth(0.24, 0.42, p);
    const toBurst = smooth(0.6, 0.78, p);
    const pos = geo.attributes.position.array as Float32Array;
    const col = geo.attributes.color.array as Float32Array;

    for (let i = 0; i < count * 3; i += 3) {
      const wave = Math.sin(sheet[i] * 1.6 + t * 1.2) * 0.12 + Math.cos(sheet[i + 1] * 1.2 + t) * 0.08;
      for (let a = 0; a < 3; a++) {
        const s = sphere[i + a];
        const sh = sheet[i + a] + (a === 2 ? wave : 0);
        const b = burst[i + a] * (1 + Math.sin(t * 0.8 + i) * 0.02);
        pos[i + a] = (s + (sh - s) * toSheet) * (1 - toBurst) + b * toBurst;
        col[i + a] = bone[i + a] + (swatch[i + a] - bone[i + a]) * toBurst;
      }
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;

    if (points.current) {
      points.current.rotation.y = t * 0.12 * (1 - toSheet * (1 - toBurst)) + pointer.x * 0.3;
      points.current.rotation.x = 0.25 * (1 - toSheet) + pointer.y * 0.15 + toSheet * (1 - toBurst) * -0.15;
      points.current.position.x = viewport.aspect < 1 ? 0 : 1.9;
    }
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function ProcessScene({ active }: { active: boolean }) {
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 2600 : 5200;
  return (
    <Canvas flat dpr={[1, 1.75]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 9], fov: 35 }} gl={{ alpha: true }} aria-hidden="true">
      <Morph count={count} />
    </Canvas>
  );
}
