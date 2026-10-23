"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { OBJECTS } from "./ServiceObjects";
import { pointer } from "./store";

// A service page's own object from the shelf, lit alone and turning slowly toward the pointer.
function Turntable({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.pow(0.003, dt);
    g.current.rotation.y += (Math.sin(t * 0.35) * 0.45 + pointer.x * 0.35 - g.current.rotation.y) * k;
    g.current.rotation.x += (0.08 - pointer.y * 0.12 - g.current.rotation.x) * k;
    g.current.position.y = Math.sin(t * 0.7) * 0.06;
  });
  return <group ref={g}>{children}</group>;
}

export default function ServiceObjectScene({ index, active }: { index: number; active: boolean }) {
  const Obj = OBJECTS[index];
  return (
    <Canvas flat dpr={[1, 1.75]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0.3, 6.6], fov: 32 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <ambientLight intensity={0.95} />
      <spotLight position={[0, 6, 6]} angle={0.5} penumbra={0.9} intensity={60} distance={20} />
      <directionalLight position={[-5, 2, 3]} intensity={0.35} color="#EEEAE1" />
      <Turntable>
        <Suspense fallback={null}>
          <Obj />
        </Suspense>
      </Turntable>
      <ContactShadows position={[0, -1.85, 0]} opacity={0.7} scale={12} blur={2.4} far={4} color="#000000" />
    </Canvas>
  );
}
