export type DogPose = "sit" | "look" | "sniff" | "dig" | "sleep" | "cheer";

export function Dog({
  pose = "sit",
  className = "",
  flip = false,
  title,
}: {
  pose?: DogPose;
  className?: string;
  flip?: boolean;
  title?: string;
}) {
  const headTransform =
    pose === "sniff"
      ? "translate(-8 30) rotate(12 300 200)"
      : pose === "sleep"
        ? "translate(10 48) rotate(22 300 200)"
        : pose === "dig"
          ? "translate(-6 12) rotate(10 300 200)"
          : pose === "cheer"
            ? "translate(0 -8) rotate(-7 300 170)"
            : "rotate(-4 300 170)";

  const closedEyes = pose === "sleep";
  const happy = pose === "cheer" || pose === "dig" || pose === "look";

  return (
    <svg
      viewBox="0 0 420 400"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id="dog-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D09767" />
          <stop offset="100%" stopColor="#B27A4A" />
        </linearGradient>
        <linearGradient id="dog-ear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A5133" />
          <stop offset="100%" stopColor="#5E3D26" />
        </linearGradient>
        <linearGradient id="dog-cream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF1DD" />
          <stop offset="100%" stopColor="#EDDCBC" />
        </linearGradient>
      </defs>

      <g transform={flip ? "translate(420 0) scale(-1 1)" : undefined}>
        <ellipse cx="212" cy="372" rx="132" ry="16" fill="#0E2A1D" opacity="0.13" />

        <path
          d="M126 274C74 274 52 232 72 200c9-15 27-15 32 1"
          fill="none"
          stroke="#A9703F"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <circle cx="84" cy="206" r="13" fill="#D09767" />

        <g transform={pose === "dig" ? "rotate(-8 210 290)" : undefined}>
          <ellipse cx="212" cy="274" rx="112" ry="78" fill="url(#dog-body)" />
          <ellipse cx="158" cy="326" rx="42" ry="22" fill="#A9703F" />
          <ellipse cx="158" cy="330" rx="26" ry="12" fill="#EDDCBC" opacity="0.75" />

          <ellipse cx="238" cy="306" rx="66" ry="54" fill="url(#dog-cream)" />

          <rect x="246" y="286" width="36" height="72" rx="18" fill="#C78E5D" />
          <rect x="300" y="292" width="36" height="66" rx="18" fill="#C78E5D" />
          <ellipse cx="264" cy="354" rx="23" ry="13" fill="#EDDCBC" />
          <ellipse cx="318" cy="354" rx="23" ry="13" fill="#EDDCBC" />
          <g stroke="#C2A578" strokeWidth="2" strokeLinecap="round" opacity="0.6">
            <path d="M258 346v10M270 346v10M312 346v10M324 346v10" />
          </g>
        </g>

        <g transform={headTransform}>
          <path
            d="M256 122c-30-18-52 22-42 76 5 26 31 26 39 4 9-24 8-56 3-80Z"
            fill="url(#dog-ear)"
          />
          <path
            d="M338 118c32-16 52 26 40 78-6 24-30 24-38 2-8-22-7-56-2-80Z"
            fill="url(#dog-ear)"
          />
          <path d="M262 136c-18-6-28 20-22 48 3 14 17 14 21 2 5-14 5-36 1-50Z" fill="#A9703F" opacity="0.55" />
          <path d="M333 133c16-5 25 20 19 46-3 13-16 13-20 2-4-13-4-35 1-48Z" fill="#A9703F" opacity="0.55" />

          <ellipse cx="300" cy="172" rx="66" ry="62" fill="url(#dog-body)" />
          <ellipse cx="288" cy="146" rx="34" ry="22" fill="#DCA373" opacity="0.55" />

          <ellipse cx="310" cy="194" rx="51" ry="39" fill="url(#dog-cream)" />
          <ellipse cx="326" cy="200" rx="37" ry="26" fill="#FBF1DD" />

          <ellipse cx="347" cy="188" rx="16" ry="12" fill="#2B1E16" />
          <ellipse cx="342" cy="184" rx="5" ry="3.4" fill="#5C4636" />

          <path
            d={happy ? "M347 201c-5 12-21 13-30 3" : "M347 201c-6 8-18 8-25 1"}
            fill="none"
            stroke="#6B4A32"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path d="M347 200v6" stroke="#6B4A32" strokeWidth="2.4" strokeLinecap="round" />

          {happy && (
            <path
              d="M326 208c5 10 15 12 21 6 3-3 3-7 2-11-8 3-16 3-23 5Z"
              fill="#E07A72"
              stroke="#C9605B"
              strokeWidth="1.4"
            />
          )}

          {closedEyes ? (
            <g stroke="#221A13" strokeWidth="3.4" strokeLinecap="round" fill="none">
              <path d="M262 162c5-6 15-6 20 0" />
              <path d="M312 158c5-6 15-6 20 0" />
            </g>
          ) : (
            <g>
              <ellipse cx="272" cy={pose === "sniff" ? 168 : 160} rx="8" ry="9.5" fill="#221A13" />
              <ellipse cx="322" cy={pose === "sniff" ? 164 : 156} rx="8" ry="9.5" fill="#221A13" />
              <circle cx="274.5" cy={pose === "sniff" ? 165 : 157} r="2.6" fill="#FFF9EC" />
              <circle cx="324.5" cy={pose === "sniff" ? 161 : 153} r="2.6" fill="#FFF9EC" />
              <circle cx="269" cy={pose === "sniff" ? 171 : 163} r="1.3" fill="#FFF9EC" opacity="0.8" />
              <circle cx="319" cy={pose === "sniff" ? 167 : 159} r="1.3" fill="#FFF9EC" opacity="0.8" />
            </g>
          )}

          <g stroke="#7A5133" strokeWidth="2.6" strokeLinecap="round" opacity="0.75">
            <path d="M258 140c5-5 11-6 16-3" />
            <path d="M312 135c5-3 11-2 16 3" />
          </g>

          <circle cx="258" cy="190" r="7" fill="#E8A07F" opacity="0.35" />
          <circle cx="352" cy="184" r="7" fill="#E8A07F" opacity="0.35" />

          <g fill="#B98552" opacity="0.7">
            <circle cx="337" cy="204" r="1.6" />
            <circle cx="346" cy="211" r="1.6" />
            <circle cx="329" cy="213" r="1.6" />
          </g>

          <path
            d="M250 220c20 18 72 20 96-2"
            fill="none"
            stroke="#2C6E49"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M250 220c20 18 72 20 96-2"
            fill="none"
            stroke="#3F855C"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.65"
          />
          <circle cx="300" cy="244" r="12" fill="#E8C766" stroke="#B8933B" strokeWidth="2.5" />
          <text
            x="300"
            y="249"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#5A4632"
            fontFamily="var(--font-display), serif"
          >
            W
          </text>
        </g>

        {pose === "sleep" && (
          <g fill="#1E4D35" fontFamily="var(--font-display), serif" fontWeight="800">
            <text x="366" y="112" fontSize="26" opacity="0.75">
              z
            </text>
            <text x="384" y="88" fontSize="20" opacity="0.55">
              z
            </text>
            <text x="398" y="68" fontSize="15" opacity="0.4">
              z
            </text>
          </g>
        )}

        {pose === "dig" && (
          <g stroke="#1E4D35" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none">
            <path d="M350 330c14-4 24-2 34 4" />
            <path d="M356 348c12-2 20 0 28 6" />
          </g>
        )}
      </g>
    </svg>
  );
}
