/**
 * Shared, render-free state between the GSAP scroll timeline and the WebGL
 * scene. GSAP writes `progress`; the scene reads it inside its frame loop.
 * No React state is involved, so scrolling never triggers re-renders.
 */
export const perspectiveStore = {
  progress: 0,
  invalidate: null as null | (() => void),
};

export function setPerspectiveProgress(p: number) {
  perspectiveStore.progress = p;
  perspectiveStore.invalidate?.();
}

/** Ease helpers shared by scene and fallbacks. */
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/** Piecewise interpolation across [p, value] keyframes with smoothstep easing. */
export function keyframes(frames: [number, number][], p: number) {
  if (p <= frames[0][0]) return frames[0][1];
  for (let i = 0; i < frames.length - 1; i++) {
    const [p0, v0] = frames[i];
    const [p1, v1] = frames[i + 1];
    if (p <= p1) return v0 + (v1 - v0) * smooth(p0, p1, p);
  }
  return frames[frames.length - 1][1];
}
