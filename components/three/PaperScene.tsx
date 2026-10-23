"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { dreamState, pointer, smooth } from "./store";
import { SketchSheet, makeWorkSide } from "./paperTextures";

const W = 2.1;
const H = 2.97;
const SEG = 160;
const RADIUS = 0.2; // curl radius of the turning page, local units
const CAM_Z = 6.5;

// One sheet of A4 carries the whole intro: it floats, gets sketched on, then turns like a page
// to show the work printed on its back, and the camera dives into it.
function Sheet({ backSrc }: { backSrc?: string }) {
  const group = useRef<THREE.Group>(null);
  const { camera, viewport } = useThree();
  const [workTex, setWorkTex] = useState<THREE.Texture | null>(null);
  const lastCurl = useRef(-1);

  const sketch = useMemo(() => new SketchSheet(), []);
  const geo = useMemo(() => new THREE.PlaneGeometry(W, H, SEG, 1), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);

  useEffect(() => {
    // A supplied back image (media/home/sheet/back) wins; otherwise the sheet shows a contact sheet of the work.
    const t = backSrc ? new THREE.TextureLoader().load(backSrc) : makeWorkSide(() => {});
    t.colorSpace = THREE.SRGBColorSpace;
    // The back is seen mirrored once the page has turned, so flip it to read the right way round.
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.x = -1;
    setWorkTex(t);
    return () => {
      t.dispose();
      sketch.texture.dispose();
      geo.dispose();
    };
  }, [sketch, geo, backSrc]);

  const tmp = useMemo(() => ({ p: new THREE.Vector3(), q: new THREE.Quaternion(), e: new THREE.Euler(), pc: new THREE.Vector3(), qc: new THREE.Quaternion() }), []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = dreamState.progress;
    const t = state.clock.elapsedTime;
    // Below roughly 5:4 there is no room beside the headline, so the sheet waits underneath it.
    const narrow = viewport.aspect < 1.25;
    const k = 1 - Math.pow(0.0015, dt);

    const center = smooth(0.1, 0.22, p);
    const turn = smooth(0.62, 0.86, p);
    const dive = smooth(0.86, 1, p);

    sketch.draw(smooth(0.24, 0.5, p), smooth(0.5, 0.56, p));

    // Idle: off to the side, turning slowly. Centre: square to the viewer, ready to be drawn on.
    const idlePos = narrow ? tmp.p.set(viewport.width * 0.18, -viewport.height * 0.8, -1) : tmp.p.set(viewport.width * 0.29, -0.05, 0);
    tmp.e.set(0.1 + pointer.y * 0.08, -0.42 + Math.sin(t * 0.4) * 0.12 + pointer.x * 0.15, -0.05);
    tmp.q.setFromEuler(tmp.e);
    const idleScale = narrow ? 0.45 : Math.min(0.74, viewport.height / 5.2);

    // While the page turns, the sheet leans a little so the curl reads in depth.
    tmp.pc.set(0, narrow ? 0.2 : 0.22, 0);
    tmp.e.set(pointer.y * 0.04 + turn * (1 - turn) * 0.5, pointer.x * 0.06 - turn * (1 - turn) * 0.9, Math.sin(t * 0.5) * 0.01);
    tmp.qc.setFromEuler(tmp.e);
    idlePos.lerp(tmp.pc, center);
    tmp.q.slerp(tmp.qc, center);
    const scale = THREE.MathUtils.lerp(idleScale, narrow ? 0.66 : 0.8, center);

    g.position.lerp(idlePos, k);
    g.quaternion.slerp(tmp.q, k);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, k));

    // Dive: the camera falls into the work on the back of the page.
    camera.position.set(0, THREE.MathUtils.lerp(0, 0.22, dive), THREE.MathUtils.lerp(CAM_Z, 0.9, dive * dive));
    camera.rotation.set(0, 0, 0);

    // Page curl: a cylinder rolls from the right edge to the left. Paper past the roll line wraps
    // over it and lands face down on the left, so the turned page shows its back.
    const curl = turn;
    if (Math.abs(curl - lastCurl.current) > 0.0005) {
      lastCurl.current = curl;
      const pos = geo.attributes.position.array as Float32Array;
      const xc = THREE.MathUtils.lerp(W / 2, -W / 2 - Math.PI * RADIUS, curl);
      const shift = (W + Math.PI * RADIUS) * curl; // keeps the sheet centred as it lands on the other side
      for (let i = 0; i < pos.length; i += 3) {
        const x = base[i];
        const d = x - xc;
        let nx = x;
        let nz = 0;
        if (d > 0) {
          if (d < Math.PI * RADIUS) {
            const a = d / RADIUS;
            nx = xc + RADIUS * Math.sin(a);
            nz = RADIUS * (1 - Math.cos(a));
          } else {
            nx = xc - (d - Math.PI * RADIUS);
            nz = 2 * RADIUS;
          }
        }
        pos[i] = nx + shift;
        pos[i + 2] = nz;
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();
    }
  });

  return (
    <group ref={group} scale={0.74}>
      <mesh geometry={geo}>
        <meshStandardMaterial map={sketch.texture} roughness={0.92} metalness={0} side={THREE.FrontSide} />
      </mesh>
      {workTex && (
        <mesh geometry={geo}>
          <meshStandardMaterial map={workTex} emissiveMap={workTex} emissive="#ffffff" emissiveIntensity={0.55} roughness={0.7} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  );
}

export default function PaperScene({ active, backSrc }: { active: boolean; backSrc?: string }) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, CAM_Z], fov: 32, near: 0.05, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[2.5, 4, 5]} intensity={2.1} />
      <directionalLight position={[-4, 1, -2]} intensity={0.5} color="#EEEAE1" />
      <Sheet backSrc={backSrc} />
    </Canvas>
  );
}
