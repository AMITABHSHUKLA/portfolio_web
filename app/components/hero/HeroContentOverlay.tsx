'use client';

import { HERO_DISPLAY_HEADLINE, HERO_INTRO } from "@/app/constants/heroDisplay";
import { useLoadReady } from "@/app/hooks/useLoadReady";
import { usePortalStore, useScrollStore, useThemeStore } from "@stores";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import * as THREE from "three";

/** Fade hero stack out over the first segment of scroll (matches intro → camera move). */
const FADE_SCROLL_START = 0.04;
const FADE_SCROLL_END = 0.26;

/** ~30% smaller than previous intro size (×0.7). */
const INTRO_SCALE = 0.7;

/**
 * Placeholder → heading → intro (DOM). Fades out as ScrollControls progress advances.
 */
const HeroContentOverlay = () => {
  const portalOpen = usePortalStore((s) => s.activePortalId != null);
  const isDark = useThemeStore((s) => s.theme.type === "dark");
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const loadReady = useLoadReady();
  const [typedIntro, setTypedIntro] = useState("");

  const fg = isDark ? "#f8fbff" : "#0b0f14";

  const fade = useMemo(
    () => THREE.MathUtils.smoothstep(scrollProgress, FADE_SCROLL_START, FADE_SCROLL_END),
    [scrollProgress],
  );
  const opacity = 1 - fade;
  const driftPx = fade * -28;

  useEffect(() => {
    if (!loadReady) return;

    const firstBreak = HERO_INTRO.indexOf("\n\n");
    const secondBreak = HERO_INTRO.indexOf("\n\n", firstBreak + 2);
    const firstTwoLinesEnd =
      secondBreak > 0 ? secondBreak + 2 : Math.floor(HERO_INTRO.length * 0.6);

    let index = 0;
    let typingTimer: ReturnType<typeof setTimeout> | null = null;
    setTypedIntro("");

    const typeNext = () => {
      index += 1;
      setTypedIntro(HERO_INTRO.slice(0, index));
      if (index < HERO_INTRO.length) {
        const isIntroBlock = index <= firstTwoLinesEnd;
        const ratio = isIntroBlock
          ? 0
          : Math.min(
              1,
              (index - firstTwoLinesEnd) /
                Math.max(1, HERO_INTRO.length - firstTwoLinesEnd),
            );
        const delay = isIntroBlock ? 16 : Math.round(16 - ratio * 10);
        typingTimer = setTimeout(typeNext, delay);
      }
    };

    typingTimer = setTimeout(typeNext, 120);

    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [loadReady]);

  const paragraphs = typedIntro.split("\n\n").filter(Boolean);

  const fontFamily = "var(--font-hero-stack), system-ui, sans-serif";

  const introFontRem = `clamp(${1.425 * INTRO_SCALE}rem, ${2.475 * INTRO_SCALE}vw, ${1.6875 * INTRO_SCALE}rem)`;

  const glassPanel: CSSProperties = isDark
    ? {
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(130,190,255,0.14) 42%, rgba(255,255,255,0.08) 100%)",
        backdropFilter: "blur(22px) saturate(1.45)",
        WebkitBackdropFilter: "blur(22px) saturate(1.45)",
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.2)",
        borderRadius: "1.25rem",
        padding: "1.35rem 1.5rem",
      }
    : {
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(220,235,255,0.65) 50%, rgba(255,255,255,0.55) 100%)",
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow:
          "0 10px 36px rgba(30,60,120,0.18), inset 0 1px 0 rgba(255,255,255,0.95)",
        borderRadius: "1.25rem",
        padding: "1.35rem 1.5rem",
      };

  const introTextStyle: CSSProperties = isDark
    ? {
        fontFamily,
        fontWeight: 700,
        fontSize: introFontRem,
        lineHeight: 1.55,
        backgroundImage:
          "linear-gradient(185deg, #ffffff 0%, #dbe8ff 38%, #9ec0ff 72%, #e8f0ff 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 2px 8px rgba(0,40,90,0.45))",
      }
    : {
        fontFamily,
        fontWeight: 700,
        fontSize: introFontRem,
        lineHeight: 1.55,
        backgroundImage:
          "linear-gradient(185deg, #0a1628 0%, #1a3a6e 45%, #0d2038 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.9))",
      };

  /** DOM layer sits above the canvas; hide when Work / Projects portal is open. */
  if (portalOpen) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-[min(16vh,120px)] z-[35] flex w-[min(92vw,52rem)] max-w-[52rem] flex-col items-center text-center"
      style={{
        opacity,
        transform: `translate(-50%, ${driftPx}px)`,
        visibility: opacity < 0.02 ? "hidden" : "visible",
      }}
    >
      <div
        className="mb-5 h-40 w-40 shrink-0 border border-white/10 bg-[#3a3a3e] md:h-48 md:w-48"
        aria-hidden
      />
      <h1
        className="m-0 mb-5 uppercase tracking-[0.05em]"
        style={{
          fontFamily,
          color: fg,
          fontWeight: 700,
          fontSize: "clamp(1.35rem, 3.5vw, 2.15rem)",
          lineHeight: 1.15,
          textShadow: isDark
            ? "0 2px 20px rgba(0,0,0,0.75)"
            : "0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {HERO_DISPLAY_HEADLINE}
      </h1>
      <div className="w-full" style={glassPanel}>
        <div className="flex flex-col gap-4" style={introTextStyle}>
          {paragraphs.map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroContentOverlay;
