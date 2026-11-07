"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/animations/gsap";

/**
 * Staged book reveal: the cover turns gently from a slight angle to face the
 * reader as it scrolls into place. Pure CSS 3D — the artwork itself is never
 * altered. (A full 3D paperback waits for the high-resolution cover.)
 */
export function ParallaxCover({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-book]",
        { rotateY: -24, rotateX: 6, y: 60, scale: 0.94 },
        {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 90%", end: "center 55%", scrub: 0.8 },
        },
      );
    },
    { scope: root },
  );
  return (
    <div ref={root} style={{ perspective: "1400px" }}>
      <div data-book style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
