/*
  Toghu-inspired motifs. These are original geometric interpretations of the
  Atoghu/Toghu embroidery language (sun medallions, spiders, diamond lattices)
  — used as subtle texture and dividers, never as the focus.
*/

const diamond = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}L${cx + r} ${cy}L${cx} ${cy + r}L${cx - r} ${cy}Z`;

type PatternProps = {
  /** Unique id required so multiple instances don't collide. */
  id: string;
  className?: string;
  opacity?: number;
};

/**
 * Full-bleed, low-opacity background watermark of sun medallions set in a
 * diamond lattice. Tint it with a text color utility on the wrapper (uses
 * `currentColor`). Position the parent `relative`.
 */
export function ToghuWatermark({
  id,
  className = "",
  opacity = 0.07,
}: PatternProps) {
  // radiating "sun" ticks around the central medallion. Coordinates are rounded
  // to a fixed precision so the server and client render identical strings
  // (avoids a React hydration mismatch from floating-point serialization).
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return {
      x1: (80 + Math.cos(a) * 27).toFixed(2),
      y1: (80 + Math.sin(a) * 27).toFixed(2),
      x2: (80 + Math.cos(a) * 33).toFixed(2),
      y2: (80 + Math.sin(a) * 33).toFixed(2),
    };
  });

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg className="h-full w-full" aria-hidden focusable="false">
        <defs>
          <pattern
            id={id}
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            >
              {/* central sun medallion */}
              <circle cx="80" cy="80" r="27" />
              <circle cx="80" cy="80" r="16" />
              <circle cx="80" cy="80" r="3.5" fill="currentColor" />
              {ticks.map((t, i) => (
                <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
              ))}
              {/* corner diamonds (tile seamlessly into full diamonds) */}
              <path d={diamond(0, 0, 16)} />
              <path d={diamond(160, 0, 16)} />
              <path d={diamond(0, 160, 16)} />
              <path d={diamond(160, 160, 16)} />
              {/* edge-midpoint diamonds — form the lattice */}
              <path d={diamond(80, 0, 10)} />
              <path d={diamond(0, 80, 10)} />
              <path d={diamond(160, 80, 10)} />
              <path d={diamond(80, 160, 10)} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

type TrimProps = {
  className?: string;
  /** Animate the hem with a slow, continuous pan. */
  animated?: boolean;
};

// One tile of the "embroidered hem": gold diamond lattice with crimson beads.
const trimTile = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='28' viewBox='0 0 64 28'>
<g fill='none' stroke='%23d8a12a' stroke-width='1.6'>
<path d='M0 14 L16 3 L32 14 L48 3 L64 14'/>
<path d='M0 14 L16 25 L32 14 L48 25 L64 14'/>
</g>
<g fill='%23b5302e'>
<circle cx='16' cy='14' r='2.4'/>
<circle cx='48' cy='14' r='2.4'/>
</g>
<g fill='%23e6ba49'>
<circle cx='0' cy='14' r='1.6'/>
<circle cx='32' cy='14' r='1.6'/>
<circle cx='64' cy='14' r='1.6'/>
</g>
</svg>`.replace(/\n/g, "");

/**
 * A thin "embroidered hem" band — used as a divider and at the edges of
 * velvet sections, echoing the trim on a Toghu gown.
 */
export function ToghuTrim({ className = "", animated = false }: TrimProps) {
  return (
    <div
      aria-hidden
      className={`h-7 w-full bg-velvet-900 ${
        animated ? "animate-toghu-pan" : ""
      } ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,${trimTile}")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "64px 28px",
        backgroundPosition: "center",
        animationDuration: animated ? "32s" : undefined,
        animationTimingFunction: animated ? "linear" : undefined,
        animationIterationCount: animated ? "infinite" : undefined,
      }}
    />
  );
}
