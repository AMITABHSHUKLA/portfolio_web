'use client';

import { useGSAP } from "@gsap/react";
import { AdaptiveDpr, Preload, ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

import { useLoadReady } from "@/app/hooks/useLoadReady";
import { useThemeStore } from "@stores";

import { SpaceStarsCanvas } from "@/app/components/models/SpaceStarBackground";
import HeroContentOverlay from "@/app/components/hero/HeroContentOverlay";

import AwwardsBadge from "./AwwardsBadge";
import Preloader from "./Preloader";
import ProgressLoader from "./ProgressLoader";
import { ScrollHint } from "./ScrollHint";
import ThemeSwitcher from "./ThemeSwitcher";
// import {Perf} from "r3f-perf"

const CanvasLoader = (props: { children: React.ReactNode }) => {
  const ref= useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundColor = useThemeStore((state) => state.theme.color);
  const { progress } = useProgress();
  const loadReady = useLoadReady();
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    overflow: "hidden",
  });

  useEffect(() => {
    if (!isMobile) {
      const borderStyle = {
        inset: '1rem',
        width: 'calc(100% - 2rem)',
        height: 'calc(100% - 2rem)',
      };
      setCanvasStyle((prev) => ({ ...prev, ...borderStyle }));
    }
  }, [isMobile]);

  useGSAP(() => {
    gsap.to(ref.current, {
      backgroundColor: backgroundColor,
      duration: 1,
    });
  }, [backgroundColor]);

  return (
    <div className="h-[100dvh] wrapper relative">
      <div className="h-[100dvh] relative" ref={ref}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SpaceStarsCanvas />
        </div>
        <Canvas className="base-canvas relative z-[1]"
          shadows
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
          }}
          style={{
            ...canvasStyle,
            opacity: loadReady ? 1 : 0,
            transition: loadReady ? "opacity 3s ease 1s" : "none",
            background: 'transparent',
          }}
          ref={canvasRef}
          dpr={[1, 2]}>
          {/* <Perf/> */}
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />

            <ScrollControls pages={4} damping={0.4} maxSpeed={1} distance={1} style={{ zIndex: 1 }}>
              {props.children}
              <Preloader />
            </ScrollControls>

            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated/>
        </Canvas>
        <ProgressLoader progress={progress} complete={loadReady} />
      </div>
      <HeroContentOverlay />
      <AwwardsBadge />
      <ThemeSwitcher />
      <ScrollHint />
    </div>
  );
};

export default CanvasLoader;
