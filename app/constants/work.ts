import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    // Lifted above origin so labels clear the Memory mesh / busy lower background.
    point: new THREE.Vector3(0, 1.35, 0.35),
    year: "2025-2026",
    title: "Kyena Solutions",
    subtitle: "ML Engineer",
    subtitleY: -0.153,
    subtitleOffsetX: 1.212,
    position: "right",
  },
  {
    point: new THREE.Vector3(1.5, 1, -8),
    year: "2026-Present",
    title: "Kreeda Labs",
    subtitle: "AI/ML Engineer",
    subtitleY: -0.288,
    position: "left",
  },
];
