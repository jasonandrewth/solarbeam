/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaQueries } from "@/styles/mixins/MediaQueries";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";

import Experience from "./Experience";

export default function Scene({ ...props }) {
  const path = usePathname();

  const imgRef = useRef(null);

  const [showPerf, setShowPerf] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "d" || e.key === "D") {
        setShowPerf((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <>
      <div
        className="canvas-wrapper"
        css={styles.wrapper}
        style={{
          "--color--background": "#ff00ff",
        }}
      >
        <Canvas dpr={[1, 2]} {...props}>
          {showPerf && <Perf />}
          <Experience />
          {/* <mesh>
                  <planeGeometry
                     args={[2, 2]} // Large plane to cover the entire viewport
                     position={[0, 0, 0]} // Center the plane
                     scale={[window.innerWidth / window.innerHeight, 1, 1]} // Maintain aspect ratio
                     rotation={[0, 0, 0]}
                  />
                  <meshBasicMaterial color={0xff0000} wireframe />
               </mesh> */}
        </Canvas>
      </div>
    </>
  );
}

const styles = {
  wrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;

    height: 100vh;
    height: 100svh;
    pointer-events: none;

    z-index: -1;

    &::after {
      content: " ";

      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;

      display: block;

      background-color: var(--color--background);
      /* background-image: url("/images/concertbg.jpg"); */
      background-position: center;
      background-size: cover;
    }

    & canvas {
      transition-property: opacity;
      transition-duration: 1000ms;
      transition-timing-function: linear;
    }

    &.isReady {
      &::after {
        opacity: 0;
      }

      & canvas {
        opacity: 1;
      }
    }
  `,
};
