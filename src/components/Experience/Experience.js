import { Suspense, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  N8AO,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Stone from "./Stone";
import PhysicsTest, { StonePrimitive } from "./PhysicsTest";
import BGPlane from "./BGPlane";

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
      <ambientLight intensity={0.66} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        // castShadow
      />
      {isMobile && (
        <OrbitControls enableDamping enablePan={false} enableZoom={false} />
      )}
      <Physics debug={false} timeStep={1 / 30} gravity={[0, 0, 0]}>
        <Suspense
          fallback={
            <mesh position-y={0.0} scale={[2, 3, 2]}>
              <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
              <meshBasicMaterial wireframe color="red" />
            </mesh>
          }
        >
          {/* <Stone position={-1.5} url="/assets/models/mahjong2.glb" /> */}
          <StonePrimitive url="/assets/models/mahjong2.glb" />

          <PhysicsTest />
        </Suspense>
      </Physics>

      {/* <BGPlane z={-100} color="#0a8f4d" opacity={0.85} /> */}

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>

      <EffectComposer disableNormalPass multisampling={8}>
        {/* <Bloom
          intensity={0.3}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        /> */}
        {/* <Noise opacity={0.2} /> */}
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
    </>
  );
};

export default Experience;
