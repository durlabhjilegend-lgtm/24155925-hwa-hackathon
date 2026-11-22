import type { ReactNode } from "react";
import { GrassMat } from "./GrassMat";

function Frame({
  art,
  accent,
  label,
  children,
  className = "",
}: {
  art: string;
  accent: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 240 240" className={className} role="img" aria-label={label}>
      <defs>
        <radialGradient id={`bg-${art}`} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.04" />
        </radialGradient>
        <linearGradient id={`stone-${art}`} x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#AFC49A" />
          <stop offset="100%" stopColor="#6E8A5C" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="112" r="98" fill={`url(#bg-${art})`} />
      <circle cx="120" cy="112" r="98" fill="none" stroke={accent} strokeOpacity="0.16" />
      <ellipse cx="120" cy="205" rx="56" ry="9" fill="#0E2A1D" opacity="0.1" />
      {children}
    </svg>
  );
}

export function ProductArt({
  art,
  accent = "#2C6E49",
  label,
  className = "",
}: {
  art: string;
  accent?: string;
  label?: string;
  className?: string;
}) {
  if (art.startsWith("mat-")) {
    const config =
      art === "mat-mini"
        ? { pattern: "meadow" as const, seed: 17 }
        : art === "mat-xl"
          ? { pattern: "wild" as const, seed: 31 }
          : { pattern: "meadow" as const, seed: 7 };
    return (
      <GrassMat
        color="moss"
        pattern={config.pattern}
        seed={config.seed}
        className={className}
        label={label ?? "WILDNEST dig mat with soft grass buds"}
      />
    );
  }

  const alt = label ?? "WILDNEST accessory";

  if (art === "antler") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g fill="none" strokeLinecap="round">
          <path d="M134 192c-12-30-19-62-16-92 3-24 16-40 34-47" stroke="#C2A578" strokeWidth="28" />
          <path d="M122 132c-19-8-34-23-41-43" stroke="#C2A578" strokeWidth="20" />
          <path d="M118 104c7-15 20-25 36-29" stroke="#C2A578" strokeWidth="18" />
          <path d="M134 192c-12-30-19-62-16-92 3-24 16-40 34-47" stroke="#DCC5A0" strokeWidth="12" opacity="0.7" />
          <path d="M122 132c-19-8-34-23-41-43" stroke="#DCC5A0" strokeWidth="8" opacity="0.6" />
          <g stroke="#A98F60" strokeWidth="2.5" opacity="0.6">
            <path d="M120 166l13 5M117 152l13 5M115 136l12 5M121 120l10 5M127 92l10 4M135 76l9 4" />
          </g>
        </g>
      </Frame>
    );
  }

  if (art === "rope") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g fill="none" strokeLinecap="round">
          <ellipse cx="114" cy="106" rx="58" ry="38" transform="rotate(-14 114 106)" stroke="#6E8A3C" strokeWidth="21" />
          <ellipse cx="114" cy="106" rx="58" ry="38" transform="rotate(-14 114 106)" stroke="#AECB69" strokeWidth="21" strokeDasharray="9 7" />
          <path d="M108 160c-4 22-2 35 4 44" stroke="#6E8A3C" strokeWidth="19" />
          <path d="M136 160c6 20 6 32 2 42" stroke="#6E8A3C" strokeWidth="19" />
          <path d="M108 160c-4 22-2 35 4 44" stroke="#95B84B" strokeWidth="19" strokeDasharray="8 7" />
          <path d="M136 160c6 20 6 32 2 42" stroke="#95B84B" strokeWidth="19" strokeDasharray="8 7" />
          <circle cx="122" cy="146" r="28" fill="#7A9A3A" />
          <circle cx="122" cy="146" r="28" fill="none" stroke="#5F7C2C" strokeWidth="4" />
          <path d="M108 134c9 8 20 10 32 6M104 152c10 8 24 9 36 4" stroke="#AECB69" strokeWidth="5" opacity="0.8" fill="none" />
        </g>
      </Frame>
    );
  }

  if (art === "pinecone") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <path d="M120 204c-28-34-42-72-36-104 5-27 22-46 36-46s31 19 36 46c6 32-8 70-36 104Z" fill="#7A4A26" />
          {[92, 114, 136, 158, 180].map((y, row) =>
            Array.from({ length: row < 4 ? 5 : 3 }, (_, i) => {
              const cx = 120 + (i - (row < 4 ? 2 : 1)) * 21;
              const cy = y + (i % 2 === 0 ? 0 : 5);
              return (
                <ellipse
                  key={`${y}-${i}`}
                  cx={cx}
                  cy={cy}
                  rx="14"
                  ry="10"
                  fill={i % 2 === 0 ? "#A9703F" : "#8C5A2E"}
                  stroke="#6B3F1F"
                  strokeWidth="1.2"
                />
              );
            })
          )}
          <path d="M120 52c-1-10 2-18 9-24" stroke="#5A4632" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="103" cy="112" rx="9" ry="20" fill="#C98B4F" opacity="0.35" transform="rotate(20 103 112)" />
        </g>
      </Frame>
    );
  }

  if (art === "boulder") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <path
            d="M62 150c-9-34 17-68 55-70 33-2 60 14 65 41 5 34-17 64-54 68-38 4-60-10-66-39Z"
            fill={`url(#stone-${art})`}
            stroke="#5E7A4E"
            strokeWidth="3"
          />
          <path d="M82 128c8-22 26-33 48-34" fill="none" stroke="#D7E4C6" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
          <g fill="#4E6741" opacity="0.55">
            <circle cx="123" cy="158" r="3" />
            <circle cx="98" cy="166" r="2" />
            <circle cx="146" cy="142" r="2" />
          </g>
          <path d="M104 170c12 6 26 6 38-2" fill="none" stroke="#4E6741" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <path d="M56 120c4-6 9-10 15-13" stroke="#8FA77C" strokeWidth="2" strokeDasharray="3 4" fill="none" />
        </g>
      </Frame>
    );
  }

  if (art === "stick") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g transform="rotate(-18 120 120)">
          <rect x="106" y="42" width="36" height="160" rx="18" fill="#AECB69" />
          <rect x="112" y="42" width="12" height="160" fill="#C7DD93" opacity="0.75" />
          <ellipse cx="124" cy="42" rx="18" ry="8" fill="#7A9A3A" />
          <ellipse cx="124" cy="52" rx="10" ry="4.5" fill="#5F7C2C" />
          <ellipse cx="124" cy="202" rx="18" ry="8" fill="#7A9A3A" />
          <g stroke="#7A9A3A" strokeWidth="4" opacity="0.8">
            <path d="M106 82h36M106 118h36M106 154h36" />
          </g>
          <path d="M143 46c13-8 22-8 29-3-8 12-18 16-29 13Z" fill="#619A52" />
        </g>
      </Frame>
    );
  }

  if (art === "maze") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <rect x="38" y="58" width="164" height="126" rx="26" fill="#EADFC4" stroke="#5A4632" strokeWidth="3" />
          <rect x="46" y="66" width="148" height="110" rx="20" fill="none" stroke="#B08A5F" strokeWidth="2.5" strokeDasharray="4 5" />
          <g fill="#C96F4A">
            <rect x="62" y="86" width="44" height="24" rx="10" />
            <rect x="132" y="122" width="48" height="24" rx="10" />
          </g>
          <g fill="#7A9A3A">
            <rect x="120" y="82" width="42" height="24" rx="10" />
            <rect x="64" y="128" width="48" height="24" rx="10" />
          </g>
          <g fill="#5A4632">
            <circle cx="112" cy="98" r="6" />
            <circle cx="134" cy="140" r="6" />
          </g>
          <g fill="#B67A3F">
            <ellipse cx="112" cy="152" rx="6" ry="4.5" />
            <ellipse cx="120" cy="158" rx="5" ry="4" />
          </g>
          <g fill="none" stroke="#8C6A45" strokeWidth="2" opacity="0.6">
            <path d="M70 118h56v22" />
            <path d="M140 86v18h30" />
          </g>
        </g>
      </Frame>
    );
  }

  if (art === "tower") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <ellipse cx="120" cy="190" rx="66" ry="18" fill="#163D2A" />
          <ellipse cx="120" cy="186" rx="66" ry="18" fill="#2C6E49" />
          <rect x="64" y="150" width="112" height="36" rx="18" fill="#C96F4A" />
          <ellipse cx="120" cy="150" rx="56" ry="16" fill="#E08A5F" />
          <rect x="72" y="112" width="96" height="38" rx="19" fill="#95B84B" />
          <ellipse cx="120" cy="112" rx="48" ry="14" fill="#AECB69" />
          <rect x="82" y="76" width="76" height="36" rx="18" fill="#2C6E49" />
          <ellipse cx="120" cy="76" rx="38" ry="12" fill="#427C36" />
          <g fill="#4A3B2A">
            <ellipse cx="96" cy="78" rx="8" ry="5" />
            <ellipse cx="132" cy="130" rx="8" ry="5" />
            <ellipse cx="108" cy="168" rx="8" ry="5" />
          </g>
          <ellipse cx="120" cy="68" rx="9" ry="6" fill="#C98B4F" />
          <g fill="none" stroke="#1E4D35" strokeWidth="2.5" strokeLinecap="round" opacity="0.35">
            <path d="M188 120c8 6 12 14 10 24" />
            <path d="M52 132c-6 8-6 16 0 22" />
          </g>
        </g>
      </Frame>
    );
  }

  if (art === "log") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <rect x="44" y="94" width="152" height="68" rx="34" fill="#8C4229" />
          <rect x="44" y="94" width="152" height="20" rx="10" fill="#A95A3B" opacity="0.7" />
          <ellipse cx="56" cy="128" rx="16" ry="34" fill="#DCCBAA" />
          <ellipse cx="56" cy="128" rx="8" ry="19" fill="none" stroke="#B08A5F" strokeWidth="2.5" />
          <ellipse cx="184" cy="128" rx="16" ry="34" fill="#C7B48E" />
          <g fill="#3A2216">
            <ellipse cx="94" cy="122" rx="11" ry="8" />
            <ellipse cx="126" cy="116" rx="9" ry="7" />
            <ellipse cx="156" cy="124" rx="11" ry="8" />
          </g>
          <g fill="#B67A3F">
            <ellipse cx="102" cy="106" rx="5" ry="4" />
            <ellipse cx="146" cy="104" rx="4" ry="3.4" />
          </g>
          <g stroke="#6B301E" strokeWidth="2" opacity="0.6" fill="none">
            <path d="M84 152c14-5 30-5 46 0M136 158c10-3 20-2 28 2" />
          </g>
          <path d="M196 86c8-7 16-9 24-7" stroke="#7A9A3A" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </Frame>
    );
  }

  if (art === "forage") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <path d="M38 160c4-34 30-58 62-62 18-22 52-22 68 2 24 4 36 24 34 50-2 30-28 44-80 44-46 0-88-8-84-34Z" fill="#7A9A3A" />
          <path d="M46 158c16-16 40-24 74-24s58 8 74 24c-6 22-32 30-74 30s-68-8-74-30Z" fill="#95B84B" />
          <g fill="#5F7C2C" opacity="0.9">
            <path d="M76 154c6-18 18-26 26-28-2 16-10 26-26 28Z" />
            <path d="M150 156c-2-16 6-28 18-32 2 16-4 28-18 32Z" />
          </g>
          <g fill="#EADFC4">
            <path d="M88 146c-2 14 8 22 22 20l-2-20Z" />
            <path d="M122 150c-2 12 7 20 19 18l-1-18Z" />
            <path d="M152 144c-1 12 8 19 20 17l-2-17Z" />
          </g>
          <g stroke="#C96F4A" strokeWidth="2" strokeDasharray="3 3" fill="none">
            <path d="M90 154c4 8 10 10 18 10M124 158c4 7 10 9 15 8M156 152c4 7 9 9 14 8" />
          </g>
          <g fill="#B67A3F">
            <ellipse cx="106" cy="158" rx="4.5" ry="3.4" />
            <ellipse cx="132" cy="164" rx="4" ry="3" />
            <ellipse cx="166" cy="154" rx="4" ry="3" />
          </g>
          <g fill="#619A52">
            <path d="M64 134c-8-10-8-20-2-28 8 8 10 18 2 28Z" />
            <path d="M176 130c8-8 10-18 4-26-8 8-10 18-4 26Z" />
          </g>
        </g>
      </Frame>
    );
  }

  if (art.startsWith("pod-")) {
    const variant =
      art === "pod-rain"
        ? { label: "RAIN", hue: "#619A52", pod: "#8AB97B" }
        : art === "pod-pine"
          ? { label: "PINE", hue: "#2C6E49", pod: "#6E8A3C" }
          : { label: "FOREST", hue: "#5A4632", pod: "#7A5B3C" };
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <rect x="86" y="82" width="68" height="112" rx="22" fill="#FAF6E9" stroke="#DCCBAA" strokeWidth="3" />
          <rect x="86" y="82" width="68" height="46" rx="22" fill={variant.hue} opacity="0.14" />
          <rect x="92" y="66" width="56" height="24" rx="9" fill={variant.hue} />
          <rect x="92" y="66" width="56" height="8" rx="4" fill="#FAF6E9" opacity="0.25" />
          <g>
            <circle cx="106" cy="120" r="12" fill={variant.pod} />
            <circle cx="130" cy="140" r="11" fill={variant.pod} opacity="0.9" />
            <circle cx="116" cy="162" r="10" fill={variant.pod} opacity="0.75" />
            <circle cx="102" cy="116" r="3" fill="#FAF6E9" opacity="0.5" />
          </g>
          <rect x="98" y="150" width="44" height="24" rx="7" fill="#EADFC4" />
          <text x="120" y="166" textAnchor="middle" fontSize="9" fontWeight="800" fill={variant.hue} fontFamily="var(--font-nunito), sans-serif" letterSpacing="1">
            {variant.label}
          </text>
          {art === "pod-rain" && (
            <path d="M174 100c8 10 12 16 12 22a12 12 0 0 1-24 0c0-6 4-12 12-22Z" fill="#7FB3C9" opacity="0.8" />
          )}
          {art === "pod-pine" && (
            <g fill="#2C6E49">
              <path d="M180 66l4 10h-8Z" />
              <path d="M180 74l8 16h-16Z" />
              <rect x="178" y="90" width="4" height="8" rx="2" />
            </g>
          )}
          {art === "pod-forest" && (
            <path d="M182 70c10 4 14 12 12 22-10-2-16-10-12-22Z" fill="#619A52" />
          )}
        </g>
      </Frame>
    );
  }

  if (art === "dispenser") {
    return (
      <Frame art={art} accent={accent} label={alt} className={className}>
        <g>
          <path
            d="M94 190c-8-24-11-52-6-78 4-20 14-32 32-32s28 12 32 32c5 26 2 54-6 78-9 13-43 13-52 0Z"
            fill="#F4EDDA"
            stroke="#DCCBAA"
            strokeWidth="3"
          />
          <ellipse cx="120" cy="78" rx="26" ry="9" fill="#DCCBAA" />
          <ellipse cx="120" cy="78" rx="17" ry="5.5" fill="#8C4229" opacity="0.55" />
          <rect x="100" y="120" width="40" height="38" rx="10" fill="#EADFC4" />
          <circle cx="120" cy="139" r="8" fill="#EDAE8C" />
          <rect x="112" y="184" width="16" height="6" rx="3" fill="#5A4632" opacity="0.4" />
          <g stroke="#7A9A3A" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7">
            <path d="M120 62c-10-10-8-22 2-30" />
            <path d="M134 58c8-8 8-18 2-26" />
            <path d="M108 54c-6-6-6-14 0-20" />
          </g>
          <circle cx="120" cy="30" r="2.5" fill="#95B84B" opacity="0.6" />
          <circle cx="139" cy="30" r="2" fill="#95B84B" opacity="0.45" />
          <circle cx="103" cy="32" r="2" fill="#95B84B" opacity="0.4" />
        </g>
      </Frame>
    );
  }

  return (
    <Frame art={art} accent={accent} label={alt} className={className}>
      <circle cx="120" cy="112" r="42" fill={accent} opacity="0.5" />
    </Frame>
  );
}
