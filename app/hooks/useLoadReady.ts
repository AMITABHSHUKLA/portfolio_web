'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';

const FALLBACK_MS = 8000;

/**
 * Shared load gate: drei progress ≥ 99 or timeout.
 * Use this inside R3F (Hero) and in DOM (CanvasLoader, AwwardsBadge) — do not rely on
 * React context across `<Canvas>`; it may not reach R3F children.
 */
export function useLoadReady() {
  const { progress } = useProgress();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setTimedOut(true), FALLBACK_MS);
    return () => clearTimeout(id);
  }, []);

  return useMemo(
    () => progress >= 99 || timedOut,
    [progress, timedOut],
  );
}
