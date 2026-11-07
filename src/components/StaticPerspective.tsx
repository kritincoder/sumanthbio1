import glyph from "@/data/glyph-nine.json";

/**
 * Static fallback for the signature scene (no WebGL, reduced motion, no JS).
 * The same Instrument Serif "9", and the same form turned to the other side.
 */
export function StaticPerspective({ className = "" }: { className?: string }) {
  const [minX, minY, maxX, maxY] = glyph.bounds;
  const w = maxX - minX;
  const h = maxY - minY;
  const pad = 90;
  // Font units are y-up; flip into SVG space.
  const upright = `translate(${pad - minX} ${pad + maxY}) scale(1 -1)`;
  // The same glyph rotated 180° about its centre: what the other side sees.
  const cx = pad + w / 2;
  const cy = pad + h / 2;
  const turned = `rotate(180 ${cx} ${cy + h + pad}) translate(0 ${h + pad}) ${upright}`;

  return (
    <svg
      viewBox={`0 0 ${w + pad * 2} ${h * 2 + pad * 3}`}
      className={className}
      role="img"
      aria-label="A numeral nine, and below it the same form turned to the other side, where it reads as a six."
    >
      <defs>
        <linearGradient id="sp-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3d3b4" />
          <stop offset="0.45" stopColor="#bda47d" />
          <stop offset="1" stopColor="#7d6849" />
        </linearGradient>
        <linearGradient id="sp-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bda47d" stopOpacity="0.38" />
          <stop offset="1" stopColor="#bda47d" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={glyph.path} transform={upright} fill="url(#sp-metal)" />
      <line x1="0" x2={w + pad * 2} y1={h + pad * 1.5} y2={h + pad * 1.5} stroke="#bda47d" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d={glyph.path} transform={turned} fill="url(#sp-fade)" />
    </svg>
  );
}
