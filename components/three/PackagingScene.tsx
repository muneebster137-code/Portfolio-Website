"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { ShelfObject } from "./ServiceObjects";
import { canvasQuality, useTier } from "@/components/fx/perf";

// The packaging segment's working 3D model. Drop a .glb at media/services/packaging-design/model/model.glb
// and it replaces the stand-in box, scaled to fit.
function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return (
    <Bounds fit clip observe margin={1.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </Bounds>
  );
}

export default function PackagingScene({ modelSrc, boxTexture, active }: { modelSrc?: string; boxTexture?: string; active: boolean }) {
  const q = canvasQuality(useTier());
  return (
    <Canvas flat dpr={q.dpr} frameloop={active ? "always" : "never"} camera={{ position: [0, 0.4, 6.4], fov: 32 }} gl={{ antialias: q.antialias, alpha: true }} aria-label="Interactive 3D packaging model. Drag to turn it.">
      <ambientLight intensity={0.95} />
      <spotLight position={[0, 6, 6]} angle={0.5} penumbra={0.9} intensity={60} distance={20} />
      <directionalLight position={[-5, 2, 3]} intensity={0.35} color="#EEEAE1" />
      <Suspense fallback={null}>{modelSrc ? <Model src={modelSrc} /> : <ShelfObject index={5} textures={[boxTexture]} />}</Suspense>
      {q.shadows > 0 && <ContactShadows position={[0, -1.4, 0]} opacity={0.7} scale={10} blur={2.4} far={4} resolution={q.shadows} color="#000000" />}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} makeDefault />
    </Canvas>
  );
}
