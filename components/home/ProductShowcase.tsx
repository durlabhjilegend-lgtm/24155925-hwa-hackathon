"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrassMat } from "@/components/art/GrassMat";
import { CloseUpView, SideView, UnderView } from "@/components/art/MatViews";
import { MAT_SIZES, type MatSize } from "@/lib/catalog";

const ANGLES = [
  {
    id: "top",
    label: "Top down",
    caption:
      "A dense field of soft silicone buds with a few kibble pieces sitting in the grass. From above, it reads as a rug — to a nose, it reads as a trail.",
  },
  {
    id: "side",
    label: "Side profile",
    caption:
      "18 mm buds above, a 5 cm sealed tray below. One-way pressure valves sit between them so rewards go up and kibble never tumbles out.",
  },
  {
    id: "close",
    label: "Paw's eye",
    caption:
      "Buds flex under a paw, the valves open, and a few pieces of kibble pop up between the blades. The rest waits safely underneath.",
  },
  {
    id: "under",
    label: "Underside",
    caption:
      "Grip feet, a twist-lock tray and a fully sealed kibble channel. Rinse the buds, twist out the tray, and the meadow is clean again.",
  },
] as const;

const BUD_HEIGHT: Record<MatSize, string> = {
  mini: "18 mm",
  classic: "18 mm",
  xl: "20 mm",
};

const WEIGHT: Record<MatSize, string> = {
  mini: "1.2 kg",
  classic: "2.1 kg",
  xl: "3.4 kg",
};

type AngleId = (typeof ANGLES)[number]["id"];

export function ProductShowcase({ initialSize = "classic" }: { initialSize?: MatSize }) {
  const [angle, setAngle] = useState<AngleId>("top");
  const [size, setSize] = useState<MatSize>(initialSize);
  const current = ANGLES.find((item) => item.id === angle) ?? ANGLES[0];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
      <div>
        <div className="card relative p-2 sm:p-3">
          <div className="relative aspect-[10/8] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-forest-50 to-cream-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={angle}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full w-full"
              >
                {angle === "top" && (
                  <div className="flex h-full w-full items-center justify-center p-3 sm:p-6">
                    <GrassMat color="moss" pattern="meadow" seed={7} className="max-h-full w-full" />
                  </div>
                )}
                {angle === "side" && (
                  <div className="flex h-full w-full items-center justify-center p-1 sm:p-3">
                    <SideView color="moss" />
                  </div>
                )}
                {angle === "close" && (
                  <div className="h-full w-full">
                    <CloseUpView />
                  </div>
                )}
                {angle === "under" && (
                  <div className="flex h-full w-full items-center justify-center p-1 sm:p-3">
                    <UnderView color="moss" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-800 shadow-sm backdrop-blur">
              {current.label}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 px-1 pb-1" role="tablist" aria-label="Product angles">
            {ANGLES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={angle === item.id}
                onClick={() => setAngle(item.id)}
                className={`rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                  angle === item.id
                    ? "bg-forest-900 text-cream-50"
                    : "bg-cream-200/70 text-forest-800 hover:bg-cream-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-forest-900/65" aria-live="polite">
          {current.caption}
        </p>
      </div>

      <div>
        <p className="eyebrow">Estimated dimensions</p>
        <h3 className="mt-2 font-display text-3xl font-extrabold">One mat, three sizes.</h3>
        <p className="mt-3 text-sm leading-relaxed text-forest-900/65">
          Choose the footprint that fits your den. Every size keeps the same 18 mm bud
          field and sealed pressure tray — only the meadow grows.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2" role="group" aria-label="Mat size">
          {(Object.keys(MAT_SIZES) as MatSize[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSize(key)}
              aria-pressed={size === key}
              className={`rounded-2xl border-2 px-3 py-3 text-left transition-all ${
                size === key
                  ? "border-forest-800 bg-forest-900 text-cream-50"
                  : "border-forest-900/12 bg-cream-50 text-forest-900 hover:border-forest-800/35"
              }`}
            >
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-70">
                {key === "mini" ? "Small" : key === "classic" ? "Medium" : "Large"}
              </span>
              <span className="mt-0.5 block text-sm font-extrabold">{MAT_SIZES[key].label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-forest-900/10 rounded-3xl border border-forest-900/10 bg-cream-50/80 px-5">
          <Row label="Footprint" value={MAT_SIZES[size].dims} />
          <Row label="Grass buds" value={`${BUD_HEIGHT[size]} tall, soft silicone`} />
          <Row label="Kibble capacity" value={MAT_SIZES[size].capacity} />
          <Row label="Weight" value={WEIGHT[size]} />
          <Row label="Base" value="5 cm sealed tray, twist-lock" />
          <Row label="Clean-up" value="Rinse buds · tray is top-rack safe" />
        </dl>

        <p className="mt-4 rounded-2xl border border-clay-500/20 bg-clay-300/10 px-4 py-3 text-xs leading-relaxed text-clay-700">
          Estimates only — final production dimensions may shift by a few millimetres.
          Supervise the first few digs while your dog learns the meadow.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5">
      <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-forest-900/50">{label}</dt>
      <dd className="text-right text-sm font-extrabold text-forest-900">{value}</dd>
    </div>
  );
}
