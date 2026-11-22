import { MAT_COLORS, type MatColor } from "@/lib/catalog";

const FONT = "var(--font-nunito), sans-serif";

function bladesFor(color: MatColor, count = 52) {
  const palette = MAT_COLORS[color];
  return Array.from({ length: count }, (_, i) => {
    const h = 26 + ((i * 37) % 46) + (i % 5 === 0 ? 16 : 0);
    const lean = ((i * 53) % 30) - 15;
    const tone = i % 3;
    return {
      x: 112 + i * ((700 - 112) / (count - 1)),
      h,
      lean,
      fill: tone === 0 ? palette.tip : tone === 1 ? palette.base : palette.deep,
      opacity: 0.7 + (i % 4) * 0.08,
    };
  });
}

function Label({
  x,
  y,
  text,
  accent = "#1E4D35",
  light = false,
}: {
  x: number;
  y: number;
  text: string;
  accent?: string;
  light?: boolean;
}) {
  const width = text.length * 7.4 + 42;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={32}
        rx={16}
        fill={light ? "#FAF6E9" : "#FAF6E9"}
        stroke={accent}
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
      <circle cx={x + 16} cy={y + 16} r="4.5" fill={accent} />
      <text
        x={x + 28}
        y={y + 21}
        fontSize="12.5"
        fontWeight="800"
        fill="#142319"
        fontFamily={FONT}
      >
        {text}
      </text>
    </g>
  );
}

export function SideView({ color = "moss" }: { color?: MatColor }) {
  const palette = MAT_COLORS[color];
  const blades = bladesFor(color, 58);
  return (
    <svg viewBox="0 0 800 520" className="h-full w-full" role="img" aria-label="Side profile of the WILDNEST mat showing grass buds above and the sealed kibble tray below">
      <defs>
        <linearGradient id={`side-body-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4EDDA" />
          <stop offset="100%" stopColor="#DCCBAA" />
        </linearGradient>
        <linearGradient id={`side-tray-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A2E22" />
          <stop offset="100%" stopColor="#241C13" />
        </linearGradient>
        <filter id="side-shadow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <ellipse cx="400" cy="452" rx="300" ry="22" fill="#0E2A1D" opacity="0.18" filter="url(#side-shadow)" />

      {blades.map((b, i) => (
        <path
          key={i}
          d={`M0 0 C -8 ${-b.h * 0.33} -5 ${-b.h * 0.78} 0 ${-b.h} C 5 ${-b.h * 0.78} 8 ${-b.h * 0.33} 0 0 Z`}
          fill={b.fill}
          opacity={b.opacity}
          transform={`translate(${b.x.toFixed(1)} 356) rotate(${b.lean})`}
        />
      ))}

      <rect x="90" y="350" width="620" height="66" rx="26" fill={`url(#side-body-${color})`} stroke="#1E4D35" strokeOpacity="0.14" strokeWidth="2" />
      <rect x="90" y="350" width="620" height="18" rx="9" fill="#FAF6E9" opacity="0.55" />

      <rect x="148" y="376" width="504" height="24" rx="12" fill={`url(#side-tray-${color})`} />
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse key={i} cx={176 + i * 30} cy={388} rx="6" ry="4.4" fill={i % 2 ? "#C98B4F" : "#9A6738"} />
      ))}
      <rect x="148" y="376" width="504" height="24" rx="12" fill="none" stroke="#FAF6E9" strokeOpacity="0.12" strokeWidth="1.5" />

      <circle cx="400" cy="412" r="9" fill="#FAF6E9" stroke={palette.base} strokeWidth="2.5" />
      <path d="M400 406v-4M396.5 409l3.5-3 3.5 3" stroke={palette.base} strokeWidth="1.6" strokeLinecap="round" fill="none" />

      <g stroke={palette.deep} strokeWidth="2" strokeDasharray="4 5" fill="none" opacity="0.65">
        <path d="M182 300 C 205 300 214 330 220 352" />
        <path d="M560 190 C 590 230 610 300 596 350" />
        <path d="M600 250 C 620 300 620 350 596 376" />
      </g>

      <Label x={70} y={244} text="18 mm soft buds" accent={palette.base} />
      <Label x={530} y={140} text="Paw pressure opens valve" accent="#C96F4A" />
      <Label x={548} y={196} text="Sealed kibble tray" accent="#8C4229" />

      <g stroke="#1E4D35" strokeOpacity="0.5" strokeWidth="2" fill="none">
        <path d="M90 470h620" />
        <path d="M90 464v12M710 464v12" />
        <path d="M742 292v126" />
        <path d="M736 292h12M736 418h12" />
        <path d="M48 292v58" />
        <path d="M43 292h10M43 350h10" />
      </g>
      <g fill="#1E4D35" fontFamily={FONT} fontWeight="800" fontSize="13">
        <rect x="350" y="456" width="92" height="28" rx="14" fill="#FAF6E9" />
        <text x="396" y="475" textAnchor="middle">80 cm</text>
        <text x="744" y="360" fill="#1E4D35">5 cm</text>
        <text x="28" y="324" transform="rotate(-90 28 324)">18 mm</text>
      </g>
    </svg>
  );
}

export function CloseUpView() {
  const palette = MAT_COLORS.moss;
  return (
    <svg viewBox="0 0 800 520" className="h-full w-full" role="img" aria-label="Close-up of a paw pressing the WILDNEST buds as kibble pops up between them">
      <defs>
        <radialGradient id="close-bg" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#2C6E49" />
          <stop offset="100%" stopColor="#0E2A1D" />
        </radialGradient>
        <linearGradient id="close-blade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E4D35" />
          <stop offset="45%" stopColor="#619A52" />
          <stop offset="100%" stopColor="#C7DD93" />
        </linearGradient>
        <radialGradient id="close-kibble" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#E7B273" />
          <stop offset="100%" stopColor="#9A6738" />
        </radialGradient>
        <filter id="close-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <rect width="800" height="520" rx="36" fill="url(#close-bg)" />
      <circle cx="400" cy="380" r="200" fill="#95B84B" opacity="0.14" filter="url(#close-glow)" />

      {[
        { x: 150, h: 300, lean: -13, w: 30 },
        { x: 240, h: 380, lean: 7, w: 34 },
        { x: 345, h: 420, lean: -6, w: 38 },
        { x: 470, h: 360, lean: 10, w: 32 },
        { x: 580, h: 300, lean: -9, w: 28 },
        { x: 670, h: 370, lean: 5, w: 32 },
      ].map((b, i) => (
        <path
          key={i}
          d={`M0 0 C ${-b.w} ${-b.h * 0.3} ${-b.w * 0.72} ${-b.h * 0.78} 0 ${-b.h} C ${b.w * 0.72} ${-b.h * 0.78} ${b.w} ${-b.h * 0.3} 0 0 Z`}
          fill="url(#close-blade)"
          opacity="0.96"
          transform={`translate(${b.x} 560) rotate(${b.lean})`}
        />
      ))}

      {[
        { x: 250, y: 230, r: 17 },
        { x: 352, y: 160, r: 15 },
        { x: 470, y: 236, r: 19 },
        { x: 560, y: 178, r: 13 },
        { x: 414, y: 290, r: 16 },
      ].map((k, i) => (
        <g key={i}>
          <ellipse cx={k.x} cy={k.y} rx={k.r} ry={k.r * 0.78} fill="url(#close-kibble)" />
          <ellipse cx={k.x - k.r * 0.3} cy={k.y - k.r * 0.3} rx={k.r * 0.34} ry={k.r * 0.2} fill="#F6DDB4" opacity="0.85" />
        </g>
      ))}

      <g fill="none" stroke="#FAF6E9" strokeOpacity="0.4" strokeWidth="2.5" strokeDasharray="3 9" strokeLinecap="round">
        <path d="M300 320 C 310 270 330 240 352 210" />
        <path d="M500 330 C 505 290 520 260 545 220" />
        <path d="M410 350 C 412 320 415 302 420 286" />
      </g>

      <g transform="translate(398 96) rotate(-8)" opacity="0.96">
        <ellipse cx="0" cy="0" rx="92" ry="64" fill="#E08A5F" />
        <ellipse cx="0" cy="10" rx="92" ry="52" fill="#C96F4A" opacity="0.55" />
        <ellipse cx="-72" cy="-44" rx="26" ry="22" fill="#E08A5F" />
        <ellipse cx="-26" cy="-62" rx="25" ry="21" fill="#E08A5F" />
        <ellipse cx="26" cy="-64" rx="25" ry="21" fill="#E08A5F" />
        <ellipse cx="72" cy="-44" rx="25" ry="21" fill="#E08A5F" />
        <ellipse cx="-70" cy="-40" rx="12" ry="9" fill="#EDAE8C" opacity="0.9" />
        <ellipse cx="-26" cy="-57" rx="11" ry="8" fill="#EDAE8C" opacity="0.9" />
        <ellipse cx="26" cy="-59" rx="11" ry="8" fill="#EDAE8C" opacity="0.9" />
        <ellipse cx="70" cy="-40" rx="11" ry="8" fill="#EDAE8C" opacity="0.9" />
        <ellipse cx="0" cy="2" rx="38" ry="28" fill="#EDAE8C" opacity="0.8" />
      </g>

      <g stroke="#FAF6E9" strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M310 48l-20 24M280 44l-8 16M348 34l6 16" />
        <path d="M546 40l-6 18M518 56l-16 18" />
      </g>

      <g fontFamily={FONT} fontWeight="800">
        <rect x="44" y="440" width="236" height="40" rx="20" fill="#FAF6E9" />
        <text x="66" y="465" fontSize="14" fill="#142319">Buds flex under every paw</text>
        <rect x="500" y="440" width="256" height="40" rx="20" fill="#FAF6E9" />
        <text x="522" y="465" fontSize="14" fill="#142319">Kibble pops up, never spills over</text>
        <circle cx="604" cy="96" r="38" fill="#C96F4A" />
        <text x="604" y="90" textAnchor="middle" fontSize="11" fill="#FAF6E9">PAW</text>
        <text x="604" y="105" textAnchor="middle" fontSize="11" fill="#FAF6E9">PRESSURE</text>
      </g>
    </svg>
  );
}

export function UnderView({ color = "moss" }: { color?: MatColor }) {
  const palette = MAT_COLORS[color];
  return (
    <svg viewBox="0 0 800 520" className="h-full w-full" role="img" aria-label="Underside of the WILDNEST mat with non-slip rings and a twist-lock sealed tray">
      <defs>
        <linearGradient id={`under-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.deep} />
          <stop offset="100%" stopColor="#0E2A1D" />
        </linearGradient>
        <filter id="under-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <ellipse cx="400" cy="452" rx="300" ry="20" fill="#0E2A1D" opacity="0.2" filter="url(#under-shadow)" />

      <rect x="96" y="78" width="608" height="356" rx="64" fill={`url(#under-${color})`} />
      <rect x="96" y="78" width="608" height="356" rx="64" fill="none" stroke="#FAF6E9" strokeOpacity="0.22" strokeWidth="2.5" />
      <rect x="126" y="106" width="548" height="300" rx="48" fill="none" stroke="#FAF6E9" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="2 10" />

      {[
        { x: 160, y: 140 },
        { x: 640, y: 140 },
        { x: 160, y: 374 },
        { x: 640, y: 374 },
      ].map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="20" fill="#081D14" opacity="0.7" />
          <circle cx={c.x} cy={c.y} r="11" fill="#2C6E49" />
          <circle cx={c.x - 3} cy={c.y - 4} r="4" fill="#8AB97B" opacity="0.6" />
        </g>
      ))}

      <g fill="none" stroke="#FAF6E9" strokeOpacity="0.12" strokeWidth="10">
        <rect x="188" y="140" width="424" height="232" rx="92" />
        <rect x="214" y="160" width="372" height="192" rx="76" />
      </g>

      <circle cx="400" cy="256" r="102" fill="#081D14" opacity="0.6" />
      <circle cx="400" cy="256" r="94" fill="none" stroke="#FAF6E9" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="10 8" />
      <circle cx="400" cy="256" r="76" fill="#1B4D36" stroke="#FAF6E9" strokeOpacity="0.28" strokeWidth="2.5" />

      <g stroke="#FAF6E9" strokeOpacity="0.7" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M360 240a44 44 0 0 1 80 22" />
        <path d="M434 256l6 8 9-5" />
        <path d="M440 272a44 44 0 0 1-80-22" />
        <path d="M366 256l-6-8-9 5" />
      </g>

      <rect x="374" y="282" width="52" height="24" rx="10" fill="#FAF6E9" opacity="0.16" />
      {[390, 402, 414].map((x, i) => (
        <ellipse key={i} cx={x} cy="294" rx="3.6" ry="2.8" fill="#C98B4F" opacity="0.9" />
      ))}

      <g stroke="#FAF6E9" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 5" fill="none">
        <path d="M190 174 C 250 178 280 186 302 210" />
        <path d="M610 174 C 550 178 520 190 498 210" />
        <path d="M520 420 C 490 380 470 348 448 328" />
      </g>

      <g fontFamily={FONT} fontWeight="800" fontSize="12.5">
        <rect x="42" y="150" width="150" height="34" rx="17" fill="#FAF6E9" />
        <circle cx="61" cy="167" r="4.5" fill={palette.base} />
        <text x="73" y="172" fill="#142319">Non-slip grip feet</text>

        <rect x="600" y="128" width="164" height="34" rx="17" fill="#FAF6E9" />
        <circle cx="619" cy="145" r="4.5" fill="#C96F4A" />
        <text x="631" y="150" fill="#142319">Twist-lock tray</text>

        <rect x="446" y="430" width="196" height="34" rx="17" fill="#FAF6E9" />
        <circle cx="465" cy="447" r="4.5" fill="#8C4229" />
        <text x="477" y="452" fill="#142319">Sealed kibble channel</text>

        <text x="400" y="490" textAnchor="middle" fontSize="13" fill="#1E4D35" opacity="0.7">80 × 60 cm · fits the Classic Wild</text>
      </g>
    </svg>
  );
}
