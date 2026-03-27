import * as THREE from "three";

export interface WorkTimelinePoint {
  point: THREE.Vector3;
  year: string;
  title: string;
  subtitle?: string;
  /** Local Y for subtitle (anchor top); default -0.48. Use less negative to lift role line only. */
  subtitleY?: number;
  /** Local X offset for subtitle only (e.g. nudge role line sideways on screen). */
  subtitleOffsetX?: number;
  position: "left" | "right";
}
