import glyph from "@/data/glyph-nine.json";

/**
 * A ~1.2 second veil: a small nine turns to the other side, then lifts.
 *
 * Pure CSS so it can never trap a visitor: it ends on its own even without
 * JavaScript, it is pointer-transparent (content underneath stays usable),
 * it is skipped entirely with reduced motion, and it shows only once per
 * session (the inline head script adds `.intro-seen`). Pressing any key or
 * clicking dismisses it immediately (see globals.css + layout script).
 */
export function Preloader() {
  const [minX, minY, maxX, maxY] = glyph.bounds;
  return (
    <div className="preloader" aria-hidden="true">
      <svg viewBox={`${minX - 20} ${-maxY - 20} ${maxX - minX + 40} ${maxY - minY + 40}`} className="preloader-glyph h-14 w-auto">
        <path d={glyph.path} transform="scale(1 -1)" fill="#bda47d" />
      </svg>
      <span className="eyebrow preloader-skip">Click or press any key to skip</span>
    </div>
  );
}
