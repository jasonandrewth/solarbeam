import { Suspense, useRef, useEffect } from "react";
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
  const audioRef = useRef(null);

  const { viewport, gl, camera } = useThree();

  const isMobile = useMediaQuery(MediaQueries.mobile);

  useFrame(() => {
    if (!isReady.current) {
      isReady.current = true;
      const canvasEl = gl.domElement.closest(".canvas-wrapper");
      if (!canvasEl) return;

      canvasEl.classList.add("isReady");
    }
  }, 0);

  // Attempt to resume WebAudio on first user interaction (some browsers block autoplay)
  useEffect(() => {
    const resume = () => {
      const audio = audioRef.current;
      const ctx = audio && audio.context ? audio.context : null;
      if (ctx && ctx.state === "suspended") ctx.resume();
      // If the buffer is loaded but not playing, start it after user gesture
      if (audio && audio.buffer && !audio.isPlaying) {
        try {
          audio.play();
        } catch (_) {}
      }
    };
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("touchstart", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("touchstart", resume);
    };
  }, []);

  // Create and play a non-positional ambient audio loop using Three.js
  useEffect(() => {
    if (!camera) return;
    let audio, listener;
    const loader = new THREE.AudioLoader();

    listener = new THREE.AudioListener();
    camera.add(listener);

    audio = new THREE.Audio(listener);
    audioRef.current = audio;

    loader.load(
      "/assets/audio/ambientloop.mp3",
      (buffer) => {
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.setVolume(0.6);
        // Try to start; if context is suspended, our resume handler will start it later
        if (listener.context.state !== "suspended") {
          try {
            audio.play();
          } catch (_) {}
        }
      },
      undefined,
      (err) => {
        console.warn("Failed to load ambient loop:", err);
      }
    );

    return () => {
      try {
        audio && audio.stop();
      } catch (_) {}
      if (listener) camera.remove(listener);
    };
  }, [gl]);

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
      {/* <pointLight distance={40} intensity={8} color="lightblue" /> */}
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
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
        />
        <Noise opacity={0.06} />
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
    </>
  );
};

export default Experience;
