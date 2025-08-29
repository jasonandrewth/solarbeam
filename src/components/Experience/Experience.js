import { Suspense, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Stone from "./Stone";
import PhysicsTest from "./PhysicsTest";

const Experience = () => {
  const isReady = useRef(false);

  const { viewport, gl } = useThree();

  const isMobile = useMediaQuery(MediaQueries.mobile);

  useFrame(() => {
    if (!isReady.current) {
      isReady.current = true;
      const canvasEl = gl.domElement.closest(".canvas-wrapper");
      if (!canvasEl) return;

      canvasEl.classList.add("isReady");
    }
  }, 0);

  return (
    <>
      {/* Studio lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.8} />
      <spotLight
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        castShadow
      />
      {isMobile && <OrbitControls />}
      <Physics debug={false} gravity={[0, 0, 0]}>
        <Suspense
          fallback={
            <mesh position-y={0.0} scale={[2, 3, 2]}>
              <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
              <meshBasicMaterial wireframe color="red" />
            </mesh>
          }
        >
          <group>
            <Stone position={-1.5} url="/assets/models/mahjong2.glb" />
            {/* <Stone position={1.5} /> */}
          </group>
        </Suspense>

        <PhysicsTest />
      </Physics>
      <EffectComposer>
        {/* <Bloom
          intensity={0.3}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        /> */}
        {/* <Noise opacity={0.2} /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      </EffectComposer>
    </>
  );
};

export default Experience;
