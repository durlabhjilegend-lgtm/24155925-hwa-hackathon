import { MAT_COLORS, type MatColor, type MatPattern } from "@/lib/catalog";

type Blade = {
  x: number;
  y: number;
  h: number;
  angle: number;
  fill: string;
  opacity: number;
  w: number;
};

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildBlades(pattern: MatPattern, color: MatColor, seed: number): Blade[] {
  const palette = MAT_COLORS[color];
  const rand = mulberry32(seed);
  const blades: Blade[] = [];
  const inner = { x: 92, y: 118, w: 616, h: 340 };
  const stepX = pattern === "wild" ? 31 : 25;
  const stepY = pattern === "wild" ? 35 : 27;
  const trailX = (y: number) => 400 + 96 * Math.sin((y - 100) / 62);

  for (let y = inner.y + 8; y < inner.y + inner.h - 4; y += stepY) {
    for (let x = inner.x + 12; x < inner.x + inner.w - 10; x += stepX) {
      const jx = x + (rand() - 0.5) * stepX * 0.85;
      const jy = y + (rand() - 0.5) * stepY * 0.6;
      const roll = rand();

      if (pattern === "trail") {
        const d = Math.abs(jx - trailX(jy));
        if (d < 48 + rand() * 18) continue;
      }
      if (pattern === "wild" && roll < 0.3) continue;

      let h = 32 + rand() * 26;
      let lean = (rand() - 0.5) * 26;
      if (pattern === "wild") {
        h = 46 + rand() * 50;
        lean = (rand() - 0.5) * 38;
      }
      if (pattern === "trail") {
        h = 26 + rand() * 28 + (Math.abs(jx - trailX(jy)) < 115 ? 18 : 0);
      }

      const tone = rand();
      const fill = tone < 0.36 ? palette.base : tone < 0.72 ? palette.deep : palette.tip;

      blades.push({
        x: jx,
        y: jy,
        h,
        angle: lean,
        fill,
        opacity: 0.72 + rand() * 0.28,
        w: 0.82 + rand() * 0.5,
      });
    }
  }

  blades.sort((a, b) => a.y - b.y);
  return blades;
}

export function GrassMat({
  color = "moss",
  pattern = "meadow",
  seed = 7,
  className = "",
  showKibble = true,
  label = "Top view of the WILDNEST dig mat, a soft silicone meadow with grass buds",
}: {
  color?: MatColor;
  pattern?: MatPattern;
  seed?: number;
  className?: string;
  showKibble?: boolean;
  label?: string;
}) {
  const palette = MAT_COLORS[color];
  const blades = buildBlades(pattern, color, seed);
  const uid = `${color}-${pattern}-${seed}`;
  const rand = mulberry32(seed + 99);

  const kibble = Array.from({ length: 22 }, (_, i) => {
    const isTop = i > 15;
    return {
      cx: 118 + rand() * 568,
      cy: 142 + rand() * 292,
      r: 4 + rand() * 3.5,
      top: isTop,
      tone: i % 3,
    };
  });

  return (
    <svg
      viewBox="0 0 800 560"
      className={className}
      role="img"
      aria-label={label}
    >
      <defs>
        <radialGradient id={`soil-${uid}`} cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor={palette.soil} />
          <stop offset="70%" stopColor={palette.soil} />
          <stop offset="100%" stopColor="#241C13" />
        </radialGradient>
        <linearGradient id={`rim-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.deep} />
          <stop offset="100%" stopColor={palette.base} />
        </linearGradient>
        <linearGradient id={`glow-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect x="92" y="112" width="616" height="346" rx="46" />
        </clipPath>
        <filter id={`soft-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <ellipse cx="400" cy="522" rx="318" ry="26" fill="#0E2A1D" opacity="0.18" filter={`url(#soft-${uid})`} />

      <rect x="48" y="52" width="704" height="462" rx="70" fill={`url(#rim-${uid})`} />
      <rect
        x="48"
        y="52"
        width="704"
        height="462"
        rx="70"
        fill="none"
        stroke="#FAF6E9"
        strokeOpacity="0.28"
        strokeWidth="3"
      />
      <rect x="66" y="70" width="668" height="426" rx="58" fill="none" stroke="#081D14" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />

      <rect x="92" y="112" width="616" height="346" rx="46" fill={`url(#soil-${uid})`} />

      <g clipPath={`url(#clip-${uid})`}>
        <rect x="92" y="112" width="616" height="346" rx="46" fill={`url(#soil-${uid})`} />
        {kibble
          .filter((k) => !k.top)
          .map((k, i) => (
            <ellipse
              key={`kb-b-${i}`}
              cx={k.cx}
              cy={k.cy}
              rx={k.r}
              ry={k.r * 0.72}
              fill={k.tone === 0 ? "#C98B4F" : k.tone === 1 ? "#8A5A31" : "#B0733E"}
              opacity="0.9"
            />
          ))}

        {blades.map((b, i) => (
          <path
            key={i}
            d={`M0 0 C ${-9 * b.w} ${-b.h * 0.32} ${-6.5 * b.w} ${-b.h * 0.78} 0 ${-b.h} C ${6.5 * b.w} ${-b.h * 0.78} ${9 * b.w} ${-b.h * 0.32} 0 0 Z`}
            fill={b.fill}
            opacity={b.opacity}
            transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.angle.toFixed(1)})`}
          />
        ))}

        {showKibble &&
          kibble
            .filter((k) => k.top)
            .map((k, i) => (
              <g key={`kb-t-${i}`}>
                <ellipse
                  cx={k.cx}
                  cy={k.cy}
                  rx={k.r}
                  ry={k.r * 0.72}
                  fill={k.tone === 0 ? "#E0A668" : k.tone === 1 ? "#9A6738" : "#C98B4F"}
                />
                <ellipse cx={k.cx - 1.5} cy={k.cy - 1.5} rx={k.r * 0.42} ry={k.r * 0.26} fill="#F2D3A6" opacity="0.8" />
              </g>
            ))}

        <rect x="92" y="112" width="616" height="346" rx="46" fill={`url(#glow-${uid})`} />
      </g>

      <rect x="102" y="122" width="596" height="326" rx="40" fill="none" stroke="#FAF6E9" strokeOpacity="0.16" strokeWidth="2" />

      <text
        x="400"
        y="490"
        textAnchor="middle"
        fill="#FAF6E9"
        fillOpacity="0.62"
        fontSize="13"
        fontWeight="800"
        letterSpacing="7"
        fontFamily="var(--font-nunito), sans-serif"
      >
        WILDNEST
      </text>

      <g transform="translate(118 466)" fill="#FAF6E9" opacity="0.55">
        <ellipse cx="0" cy="9" rx="9" ry="7" />
        <circle cx="-10" cy="-2" r="3.4" />
        <circle cx="-3" cy="-7" r="3.4" />
        <circle cx="4" cy="-7" r="3.4" />
        <circle cx="11" cy="-2" r="3.4" />
      </g>
    </svg>
  );
}
