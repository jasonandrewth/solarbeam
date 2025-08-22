import { Suspense, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import Stone from "./Stone";

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

      <Suspense
        fallback={
          <mesh position-y={0.0} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color="red" />
          </mesh>
        }
      >
        <Stone />
      </Suspense>
    </>
  );
};

export default Experience;
