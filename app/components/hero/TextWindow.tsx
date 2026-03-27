'use client';

import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const TextWindow = () => {
  const data = useScroll();
  const windowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const c = data.range(0.65, 0.15);

    if (windowRef.current) {
      windowRef.current.setRotationFromAxisAngle(new THREE.Vector3(0, -1, 0), 0.5 *Math.PI * c);
      windowRef.current.position.x =  -0.6 * c;
      windowRef.current.position.z = -0.6 * c;
    }
  });

  const fontProps = {
    font: "./soria-font.ttf",
  };

  /** Stronger outline / stroke for a glossy, legible “glass edge” look (no motion). */
  const glossyTextProps = {
    fillOpacity: 1,
    strokeWidth: 0.02,
    strokeOpacity: 0.92,
    outlineWidth: 0.022,
    outlineOpacity: 0.88,
  };

  return (
    <group position={[0, -0.3, 0]} ref={windowRef}>
      <Text color="#ff2a2a" anchorX="left" anchorY="middle"
        strokeColor="#ffc8c8"
        outlineColor="#4a0000"
        fontSize={1.2}
        position={[0.12, 0, 0]}
        {...glossyTextProps}
        {...fontProps}
        scale={[1, -1, 1]}
        rotation={[0, 0,  -Math.PI / 2]}>
        AI ENGINEER
      </Text>

      <Text color="#ffb84d" anchorX="right" anchorY="middle"
        strokeColor="#fff1d4"
        outlineColor="#5c3200"
        {...fontProps}
        {...glossyTextProps}
        scale={[-1, -1, 1]}
        fontSize={1.2}
        position={[0.12, 0, -1.4]}
        rotation={[0, 0,  -Math.PI / 2]}>
        QUERY KEY VALUE
      </Text>

      <group position={[-0.45, 0, -0.3]}>
        <Text color="#d4a3ff" anchorX="left" anchorY="middle"
          strokeColor="#f5e8ff"
          outlineColor="#3d0f5c"
          {...fontProps}
          {...glossyTextProps}
          scale={[1, -1, 1]}
          fontSize={1.2}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          TRANSFORMERS
        </Text>

        <Text color="#b8f0ff" anchorX="left" anchorY="middle"
          strokeColor="#ffffff"
          outlineColor="#063a52"
          {...fontProps}
          {...glossyTextProps}
          scale={[1, -1, 1]}
          fontSize={1.2}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          ATTENTION
        </Text>
      </group>

      <group position={[0.45, 0, -0.3]}>
        <Text color="#e8e8f0" anchorX="right" anchorY="middle"
          strokeColor="#ffffff"
          outlineColor="#303048"
          {...fontProps}
          {...glossyTextProps}
          scale={[-1, -1, 1]}
          fontSize={0.7}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          COMPUTER VISION
        </Text>
        <Text color="#ffe566" anchorX="right" anchorY="middle"
          strokeColor="#fffce0"
          outlineColor="#5c4a00"
          {...fontProps}
          {...glossyTextProps}
          scale={[-1, -1, 1]}
          fontSize={0.7}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2,  -Math.PI / 2]}>
          BACKPROPOGATION.
        </Text>
      </group>
    </group>
  );
}

export default TextWindow;
