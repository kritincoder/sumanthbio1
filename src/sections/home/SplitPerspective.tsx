"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/animations/gsap";
import glyph from "@/data/glyph-nine.json";

/**
 * A mirrored composition: one form, two sides. As it scrolls through view,
 * a dividing line travels across and each half turns to the other reading.
 */
export function SplitPerspective() {
  const root = useRef<HTMLDivElement>(null);
  const [minX, minY, maxX, maxY] = glyph.bounds;
  const vb = `${minX - 60} ${-maxY - 60} ${maxX - minX + 120} ${maxY - minY + 120}`;
  // Centre of the glyph in SVG space (font units, y flipped).
  const cx = (minX + maxX) / 2;
  const cy = -(minY + maxY) / 2;
  const origin = `${cx} ${cy}`;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 35%", scrub: 0.8 },
        defaults: { ease: "none" },
      });
      tl.fromTo("[data-turn='a']", { rotation: 0, svgOrigin: origin }, { rotation: 180, svgOrigin: origin, ease: "power2.inOut" }, 0)
        .fromTo("[data-turn='b']", { rotation: 180, svgOrigin: origin }, { rotation: 0, svgOrigin: origin, ease: "power2.inOut" }, 0)
        .fromTo("[data-divider]", { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "power2.out" }, 0);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative grid aspect-[5/4] grid-cols-2 overflow-hidden rounded-[4px]">
      <figure className="env-dark relative flex flex-col items-center justify-center">
        <svg viewBox={vb} className="h-[56%] w-auto" aria-hidden="true">
          <g data-turn="a">
            <path d={glyph.path} transform="scale(1 -1)" fill="currentColor" />
          </g>
        </svg>
        <figcaption className="eyebrow absolute bottom-6">This side</figcaption>
      </figure>
      <figure className="relative flex flex-col items-center justify-center bg-[#e4ddcf]">
        <svg viewBox={vb} className="h-[56%] w-auto text-obsidian" aria-hidden="true">
          <g data-turn="b" transform={`rotate(180 ${cx} ${cy})`}>
            <path d={glyph.path} transform="scale(1 -1)" fill="currentColor" />
          </g>
        </svg>
        <figcaption className="eyebrow absolute bottom-6">The other side</figcaption>
      </figure>
      <div data-divider aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px origin-top bg-champagne" />
      <p className="sr-only">The same numeral shown from two sides: a nine on one, a six on the other.</p>
    </div>
  );
}
