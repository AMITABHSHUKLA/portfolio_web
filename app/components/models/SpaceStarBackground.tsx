'use client';

import { Points, PointMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { random } from 'maath';
import { Suspense, useMemo, useRef } from 'react';
import type { Points as PointsImpl } from 'three';

/** Rotating point starfield inspired by Jenin82/SpacePortfolio `StarBackground.tsx`. */
function SpaceStarfield() {
  const ref = useRef<PointsImpl>(null);
  const positions = useMemo(() => {
    const buf = new Float32Array(5000 * 3);
    random.inSphere(buf, { radius: 1.2 });
    return buf;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/** Fixed full-area layer; sits under the main portfolio canvas. */
export function SpaceStarsCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
    >
      <Suspense fallback={null}>
        <SpaceStarfield />
      </Suspense>
    </Canvas>
  );
}
