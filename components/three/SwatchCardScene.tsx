"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { services } from "@/lib/site";
import { makeSwatchTexture, CARD_H, CARD_W } from "./swatchTexture";
import { pointer } from "./store";
import { Dust } from "./Dust";

// One service's swatch, floating with two echoes behind it. Pointer tilts it; scrolling away turns it.
function Card({ texture }: { texture: THREE.CanvasTexture }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const away = Math.min(1, window.scrollY / window.innerHeight);
    const k = 1 - Math.pow(0.002, dt);
    g.rotation.y += (-0.35 + pointer.x * 0.35 + away * 1.1 - g.rotation.y) * k;
    g.rotation.x += (0.08 - pointer.y * 0.2 - g.rotation.x) * k;
    g.rotation.z = Math.sin(t * 0.5) * 0.03 - 0.05;
    g.position.y = Math.sin(t * 0.8) * 0.08 + away * 0.6;
  });
  return (
    <group ref={group}>
      {[2, 1, 0].map((i) => (
        <mesh key={i} position={[i * 0.42, i * 0.18, -i * 0.7]} rotation={[0, 0, i * 0.08]}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshStandardMaterial map={texture} transparent alphaTest={0.02} opacity={i === 0 ? 1 : 0.32 / i} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function SwatchCardScene({ index, active = true }: { index: number; active?: boolean }) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    let made: THREE.CanvasTexture | null = null;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      made = makeSwatchTexture(services[index], index);
      setTex(made);
    });
    return () => {
      alive = false;
      made?.dispose();
    };
  }, [index]);

  return (
    <Canvas flat dpr={[1, 1.75]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 7], fov: 35 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 6]} intensity={1.5} />
      <pointLight position={[-3, -2, 3]} intensity={14} color={services[index].color} distance={12} />
      <Dust count={700} />
      {tex && <Card texture={tex} />}
    </Canvas>
  );
}
