"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { GrassMat } from "@/components/art/GrassMat";
import { useCart } from "@/components/cart/CartProvider";
import {
  DEFAULT_CUSTOM_MAT,
  MAT_ADDONS,
  MAT_COLORS,
  MAT_PATTERNS,
  MAT_SCENTS,
  MAT_SIZES,
  customMatName,
  formatPrice,
  priceCustomMat,
  type CustomMatConfig,
  type MatColor,
  type MatPattern,
  type MatScent,
  type MatSize,
} from "@/lib/catalog";

const sizeKeys = Object.keys(MAT_SIZES) as MatSize[];
const patternKeys = Object.keys(MAT_PATTERNS) as MatPattern[];
const colorKeys = Object.keys(MAT_COLORS) as MatColor[];
const scentKeys = Object.keys(MAT_SCENTS) as MatScent[];

export function PlayzoneCustomizer() {
  const { addCustomMat } = useCart();
  const [config, setConfig] = useState<CustomMatConfig>(DEFAULT_CUSTOM_MAT);
  const price = priceCustomMat(config);
  const size = MAT_SIZES[config.size];

  const set = <K extends keyof CustomMatConfig>(key: K, value: CustomMatConfig[K]) =>
    setConfig((current) => ({ ...current, [key]: value }));

  const randomize = () => {
    const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];
    setConfig({
      size: pick(sizeKeys),
      pattern: pick(patternKeys),
      color: pick(colorKeys),
      scent: pick(scentKeys),
      chewKit: Math.random() > 0.5,
      puzzleKit: Math.random() > 0.5,
    });
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
      <div className="lg:sticky lg:top-24">
        <div className="card p-2.5 sm:p-3">
          <div className="overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-forest-50 via-cream-200 to-moss-100 p-2 sm:p-3">
            <GrassMat
              color={config.color}
              pattern={config.pattern}
              seed={11}
              className="w-full"
              showKibble
              label={`Preview of a ${MAT_COLORS[config.color].label} WILDNEST mat with ${MAT_PATTERNS[config.pattern].label} buds`}
            />
          </div>
          <div className="px-3 pb-2 pt-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Your playzone</p>
                <h3 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
                  {customMatName(config)}
                </h3>
              </div>
              <p className="shrink-0 font-display text-2xl font-extrabold text-forest-800">
                {formatPrice(price)}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="chip">{size.dims}</span>
              <span className="chip">{MAT_COLORS[config.color].label}</span>
              <span className="chip">{size.capacity}</span>
              {config.scent !== "none" && <span className="chip">{MAT_SCENTS[config.scent].label} pods</span>}
              {config.chewKit && <span className="chip">{MAT_ADDONS.chewKit.label}</span>}
              {config.puzzleKit && <span className="chip">{MAT_ADDONS.puzzleKit.label}</span>}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-forest-900/55">
              {MAT_PATTERNS[config.pattern].blurb} Every playzone ships with the sealed
              pressure tray, a starter kibble scoop and a care card.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={randomize}
            className="rounded-full border-2 border-forest-900/15 bg-cream-50 px-4 py-2.5 text-xs font-extrabold text-forest-800 transition-colors hover:border-forest-800/35 hover:bg-cream-100"
          >
            Surprise me
          </button>
          <Link href="/product#care" className="text-xs font-extrabold text-forest-700 underline underline-offset-4">
            Cleaning &amp; care
          </Link>
        </div>
      </div>

      <div className="space-y-5">
        <Step number="01" title="Pick a footprint" hint="The mat your room can live with.">
          <div className="grid gap-2.5 sm:grid-cols-3" role="group" aria-label="Mat size">
            {sizeKeys.map((key) => {
              const item = MAT_SIZES[key];
              const active = config.size === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("size", key)}
                  aria-pressed={active}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${
                    active
                      ? "border-forest-800 bg-forest-900 text-cream-50 shadow-soft"
                      : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
                  }`}
                >
                  <span className="block text-sm font-extrabold">{item.label}</span>
                  <span className={`mt-0.5 block text-[11px] font-bold ${active ? "text-cream-200/70" : "text-forest-900/50"}`}>
                    {item.dims}
                  </span>
                  <span className={`mt-2 block text-xs font-extrabold ${active ? "text-moss-300" : "text-forest-700"}`}>
                    {formatPrice(item.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step number="02" title="Choose a playzone pattern" hint="How the meadow is planted.">
          <div className="space-y-2.5" role="group" aria-label="Playzone pattern">
            {patternKeys.map((key) => {
              const item = MAT_PATTERNS[key];
              const active = config.pattern === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("pattern", key)}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-all ${
                    active
                      ? "border-forest-800 bg-forest-50"
                      : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
                  }`}
                >
                  <span>
                    <span className="flex items-center gap-2 text-sm font-extrabold">
                      {item.label}
                      {active && (
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-forest-800 text-cream-50">
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                            <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-forest-900/55">{item.blurb}</span>
                  </span>
                  <span className="shrink-0 text-xs font-extrabold text-forest-700">
                    {item.price === 0 ? "Included" : `+${formatPrice(item.price)}`}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step number="03" title="Colour the buds" hint="Three outdoor tones, zero neon.">
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Bud colour">
            {colorKeys.map((key) => {
              const item = MAT_COLORS[key];
              const active = config.color === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("color", key)}
                  aria-pressed={active}
                  aria-label={item.label}
                  className={`flex items-center gap-2.5 rounded-full border-2 py-2 pl-2 pr-4 transition-all ${
                    active ? "border-forest-800 bg-cream-50" : "border-transparent bg-cream-50/60 hover:border-forest-900/20"
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-forest-900/15"
                    style={{ backgroundColor: item.swatch }}
                  />
                  <span className="text-xs font-extrabold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step number="04" title="Add a forest scent" hint="The placebo effect of a window left open.">
          <div className="grid gap-2.5 sm:grid-cols-2" role="group" aria-label="Scent pods">
            {scentKeys.map((key) => {
              const item = MAT_SCENTS[key];
              const active = config.scent === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("scent", key)}
                  aria-pressed={active}
                  className={`rounded-2xl border-2 p-3.5 text-left transition-all ${
                    active ? "border-forest-800 bg-forest-50" : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 text-sm font-extrabold">
                    {item.label}
                    {active && (
                      <svg viewBox="0 0 16 16" className="h-4 w-4 text-forest-700" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4.6 8.2l2.2 2.2 4.4-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-forest-900/55">{item.blurb}</span>
                  <span className="mt-1.5 block text-[11px] font-extrabold text-forest-700">
                    {item.price === 0 ? "No pods" : `+${formatPrice(item.price)} · 3 pods`}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step number="05" title="Finish the kit" hint="Optional add-ons that keep the nose busy.">
          <div className="space-y-2.5">
            {(Object.keys(MAT_ADDONS) as (keyof typeof MAT_ADDONS)[]).map((key) => {
              const item = MAT_ADDONS[key];
              const active = config[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => set(key, !active)}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-all ${
                    active ? "border-forest-800 bg-forest-50" : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${
                        active ? "border-forest-800 bg-forest-800 text-cream-50" : "border-forest-900/25"
                      }`}
                      aria-hidden="true"
                    >
                      {active && (
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                          <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold">{item.label}</span>
                      <span className="block text-[11px] text-forest-900/55">{item.contents}</span>
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-extrabold text-forest-700">+{formatPrice(item.price)}</span>
                </button>
              );
            })}
          </div>
        </Step>

        <div className="rounded-3xl border border-forest-900/10 bg-forest-900 p-5 text-cream-50 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-moss-300">
                Your playzone total
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold">{formatPrice(price)}</p>
              <p className="mt-1 text-xs text-cream-200/60">
                {customMatName(config)} · {size.dims}
              </p>
            </div>
            <button
              type="button"
              onClick={() => addCustomMat(config)}
              className="btn bg-clay-500 text-cream-50 hover:-translate-y-0.5 hover:bg-clay-400"
            >
              Add playzone to nest
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-4 border-t border-cream-100/10 pt-3 text-[11px] leading-relaxed text-cream-200/55">
            Free shipping over $120 · Scent pods ship free with every sized mat · 30-day
            happy-dig guarantee. Configuration is confirmed in your cart before checkout.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  hint,
  children,
}: {
  number: string;
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-forest-900/10 bg-cream-50/70 p-4 sm:p-5">
      <div className="mb-3.5 flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-900 font-display text-xs font-extrabold text-cream-50">
          {number}
        </span>
        <div>
          <h4 className="font-display text-lg font-extrabold leading-tight">{title}</h4>
          <p className="text-xs text-forest-900/50">{hint}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
