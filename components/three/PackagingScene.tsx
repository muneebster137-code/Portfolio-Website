"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { OBJECTS } from "./ServiceObjects";

// The packaging segment's working 3D model: the same box as the shelf, free to turn by hand.
// Swap in the supplied model when it arrives.
const Box = OBJECTS[5];

export default function PackagingScene() {
  return (
    <Canvas flat dpr={[1, 1.75]} camera={{ position: [0, 0.4, 6.4], fov: 32 }} gl={{ antialias: true, alpha: true }} aria-label="Interactive 3D packaging model. Drag to turn it.">
      <ambientLight intensity={0.95} />
      <spotLight position={[0, 6, 6]} angle={0.5} penumbra={0.9} intensity={60} distance={20} />
      <directionalLight position={[-5, 2, 3]} intensity={0.35} color="#EEEAE1" />
      <Suspense fallback={null}>
        <Box />
      </Suspense>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.7} scale={10} blur={2.4} far={4} color="#000000" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
