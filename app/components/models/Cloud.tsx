import { Cloud, Clouds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import { useScroll } from "@react-three/drei";

const CloudContainer = () => {
  const groupRef = useRef<Group>(null);
  const data = useScroll();

  useFrame(() => {
    if (!groupRef.current || !data) return;
    // Smoothly fade and sink clouds instead of abruptly hiding them.
    // Gate approach begins around the mid-scroll band, so fade starts there.
    const fadeProgress = THREE.MathUtils.smoothstep(data.offset, 0.38, 0.64);
    const alpha = THREE.MathUtils.clamp(1 - fadeProgress, 0, 1);
    groupRef.current.position.y = THREE.MathUtils.lerp(0, -8, fadeProgress);

    groupRef.current.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.material) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        if ("opacity" in material) {
          material.transparent = true;
          material.opacity = alpha;
          material.depthWrite = false;
          material.needsUpdate = true;
        }
      });
    });
  });

  return (
    <group ref={groupRef}>
      <Clouds material={THREE.MeshBasicMaterial}
        position={[0, -22, 10]}
        frustumCulled={false}>
      <Cloud seed={1}
        segments={1}
        concentrate="outside"
        bounds={[12, 1.1, 10]}
        growth={4}
        position={[-9, -5.5, -14]}
        smallestVolume={2}
        scale={3.1}
        volume={5}
        speed={0.1}
        fade={6}
        opacity={0.3}
        />
      <Cloud
        seed={3}
        segments={1}
        concentrate="outside"
        bounds={[12, 1.1, 10]}
        growth={4}
        position={[9.5, -5.8, -12]}
        smallestVolume={2}
        scale={3}
        volume={5}
        fade={6}
        speed={0.11}
        opacity={0.28}/>

      <Cloud
        seed={4}
        segments={1}
        concentrate="outside"
        bounds={[16, 1.2, 14]}
        growth={5}
        position={[0, -7, -16]}
        smallestVolume={2}
        scale={4.4}
        volume={6}
        fade={7}
        speed={0.1}
        opacity={0.28}/>

      <Cloud
        seed={5}
        segments={1}
        concentrate="outside"
        bounds={[12, 1.1, 10]}
        growth={4}
        position={[-11, -8.2, -8]}
        smallestVolume={2}
        scale={3.1}
        volume={5}
        fade={5}
        speed={0.12}
        opacity={0.3}/>

      <Cloud
        seed={6}
        segments={1}
        concentrate="outside"
        bounds={[12, 1.1, 10]}
        growth={4}
        position={[11.2, -8.4, -5]}
        smallestVolume={2}
        scale={3}
        volume={5}
        fade={5}
        speed={0.12}
        opacity={0.29}/>

      <Cloud
        seed={7}
        segments={1}
        concentrate="outside"
        bounds={[18, 1.3, 14]}
        growth={5}
        position={[0, -10.3, -1]}
        smallestVolume={2}
        scale={4.6}
        volume={6}
        fade={6}
        speed={0.1}
        opacity={0.28}/>

      <Cloud
        seed={8}
        segments={1}
        concentrate="outside"
        bounds={[16, 1.1, 14]}
        growth={4}
        position={[-3.2, -9.2, -4]}
        smallestVolume={2}
        scale={3.2}
        volume={5}
        fade={5}
        speed={0.12}
        opacity={0.27}/>

      <Cloud
        seed={9}
        segments={1}
        concentrate="outside"
        bounds={[16, 1.1, 14]}
        growth={4}
        position={[4.2, -9.6, -9]}
        smallestVolume={2}
        scale={3.3}
        volume={5}
        fade={5}
        speed={0.11}
        opacity={0.27}/>

      <Cloud
        seed={10}
        segments={1}
        concentrate="outside"
        bounds={[20, 1.3, 16]}
        growth={5}
        position={[0, -12, -22]}
        smallestVolume={2}
        scale={5}
        volume={6}
        fade={8}
        speed={0.1}
        opacity={0.27}/>
      </Clouds>
    </group>);
}

export default CloudContainer;