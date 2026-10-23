"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// A stand-in packaging model: a branded box you can turn. Swap for the real GLB when it is supplied.
function faceTexture(label: string, sub: string) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  const display = getComputedStyle(document.body).getPropertyValue("--font-archivo").trim() || "sans-serif";
  const mono = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim() || "monospace";
  ctx.fillStyle = "#FF5FA2";
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = "#060708";
  ctx.font = `900 72px ${display}`;
  ctx.fillText(label, 40, 300);
  ctx.font = `500 24px ${mono}`;
  ctx.fillText(sub, 44, 350);
  ctx.fillRect(40, 400, 432, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Box() {
  const ref = useRef<THREE.Mesh>(null);
  const mats = useMemo(() => {
    const front = faceTexture("YOUR", "PACKAGING · MMB 06-C");
    const side = faceTexture("BRAND", "3D MODEL PLACEHOLDER");
    return [side, side, side, side, front, front].map((map) => new THREE.MeshStandardMaterial({ map, roughness: 0.45 }));
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.25;
  });
  return (
    <mesh ref={ref} material={mats} rotation={[0.12, 0.5, 0]}>
      <boxGeometry args={[2, 2.8, 1.2]} />
    </mesh>
  );
}

export default function PackagingScene() {
  return (
    <Canvas flat dpr={[1, 1.75]} camera={{ position: [0, 0.4, 7], fov: 35 }} gl={{ antialias: true, alpha: true }} aria-label="Interactive 3D packaging model. Drag to turn it.">
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <directionalLight position={[-4, -1, 2]} intensity={0.6} color="#8E63FF" />
      <Box />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
