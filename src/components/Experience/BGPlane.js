import React, { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { Plane, shaderMaterial } from "@react-three/drei";

// Animated lava-lamp material using classic simplex 4D noise
const LavaMaterial = shaderMaterial(
  // uniforms
  {
    uTime: 0,
    uColor: new THREE.Color(0xffffff),
    uScale: 1.5,
    uSpeed: 0.1,
  },
  // vertex shader
  /*glsl*/ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader (classic simplex 3D noise)
  /*glsl*/ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uScale;
  uniform float uSpeed;

  // --- Classic Simplex Noise 3D (Ashima Arts / Stefan Gustavson, public domain) ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, vec3(C.y)));
    vec3 x0 = v - i + dot(i, vec3(C.x));

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    //  x0 = x0 - 0. + 0.0 * C.x ;
    vec3 x1 = x0 - i1 + 1.0 * C.x;
    vec3 x2 = x0 - i2 + 2.0 * C.x;
    vec3 x3 = x0 - 1.0 + 3.0 * C.x;

    // Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  // mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    // Mix contributions from the four corners
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;

    // Compute final noise value at P
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
  // --- End simplex 3D ---

  void main(){
    // Scale UVs and animate 3rd dimension with time for smooth lava-lamp flow
    vec2 uv = vUv * uScale;
    float t = uTime * uSpeed;
    float n = snoise(vec3(uv, t)); // [-1,1]

    float a = max(n, 0.0); // visible where > 0, transparent otherwise
    vec3 col = uColor * a;
    gl_FragColor = vec4(col, a * 0.1);
  }
  `
);
extend({ LavaMaterial });

/**
 * BGPlane — a screen-filling plane at a given world-space Z depth.
 * It auto-resizes with the canvas using R3F's viewport helper.
 *
 * Props:
 *  - z: number (default 0) world-space Z position
 *  - color: THREE.ColorLike (default black)
 *  - transparent: boolean (default true)
 *  - opacity: number (default 1)
 */
const BGPlane = memo(function BGPlane({
  z = 0,
  color = 0x000000,
  transparent = true,
  opacity = 1,
}) {
  // Access camera + viewport helper
  const camera = useThree((s) => s.camera);
  const viewport = useThree((s) => s.viewport);

  // Compute the viewport dimensions at the target depth.
  // getCurrentViewport(camera, target) returns width/height in world units
  // at the given target point. We pass a point at z-depth in world space.
  const vp = useMemo(() => {
    // Target world point at the desired z-depth centered at origin
    const target = new THREE.Vector3(0, 0, z);
    return viewport.getCurrentViewport(camera, target);
  }, [viewport, camera, z]);

  const { width, height } = vp;

  const matRef = useRef();
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uTime = clock.getElapsedTime();
  });

  const colorUniform = useMemo(() => new THREE.Color(color), [color]);
  const scale = 1.5; // tweak as desired or expose as prop
  const speed = 0.2; // tweak as desired or expose as prop

  return (
    <Plane
      // Centered and placed at the given z depth
      position={[0, 0, z]}
      // Make plane match the viewport at that depth
      args={[width, height, 1, 1]}
    >
      <lavaMaterial
        ref={matRef}
        uColor={colorUniform}
        uScale={scale}
        uSpeed={speed}
        transparent={true}
        opacity={opacity}
        depthWrite={false}
      />
    </Plane>
  );
});

export default BGPlane;
