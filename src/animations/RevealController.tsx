"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Global editorial reveal: any element with [data-reveal] rises gently into
 * place as it enters the viewport. Elements are visible by default; the
 * `js-motion` class (set before paint) hides them only when JS is running and
 * motion is allowed. Re-initialises on every route change.
 */
export function RevealController() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
      // Anything already above the fold appears immediately.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
