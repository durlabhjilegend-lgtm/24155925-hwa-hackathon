"use client";

import { useState } from "react";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { PRODUCTS, formatPrice, type Product } from "@/lib/catalog";

const MATS = PRODUCTS.filter((product) => product.kind === "mat");

export function BuyBox() {
  const [selected, setSelected] = useState<Product>(MATS[1] ?? MATS[0]);
  const price = selected.price;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip bg-forest-900 text-cream-50">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-moss-300" aria-hidden="true" />
          Pressure-activated
        </span>
        <span className="chip">Spill-proof tray</span>
        <span className="chip">Dishwasher-safe tray</span>
      </div>

      <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] sm:text-5xl">
        A meadow your dog can dig.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-forest-900/68">
        {selected.description}
      </p>

      <div className="mt-6 flex items-end gap-3">
        <p className="font-display text-4xl font-extrabold text-forest-900">{formatPrice(price)}</p>
        <p className="pb-1 text-sm font-bold text-forest-900/50">Includes a starter scent pod pack</p>
      </div>

      <div className="mt-6">
        <p className="field-label">Choose your footprint</p>
        <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Mat size">
          {MATS.map((mat) => {
            const active = mat.id === selected.id;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelected(mat)}
                aria-pressed={active}
                className={`rounded-2xl border-2 p-3.5 text-left transition-all ${
                  active
                    ? "border-forest-800 bg-forest-900 text-cream-50 shadow-soft"
                    : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
                }`}
              >
                <span className="block text-sm font-extrabold">{mat.name.replace("WILDNEST ", "")}</span>
                <span className={`mt-0.5 block text-[10px] font-bold ${active ? "text-cream-200/65" : "text-forest-900/45"}`}>
                  {mat.dims}
                </span>
                <span className={`mt-1.5 block text-xs font-extrabold ${active ? "text-moss-300" : "text-forest-700"}`}>
                  {formatPrice(mat.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <AddToCartButton product={selected} label="Add this meadow to nest" className="btn-primary h-14 w-full text-base" />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <Link href="/customize" className="btn-ghost h-12">
          Customize size, pattern, colour &amp; scent
        </Link>
        <Link href="/build" className="btn-ghost h-12">
          Build a whole kit
        </Link>
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-forest-900/10 pt-5 text-sm font-bold text-forest-900/65">
        {[
          "Sealed 5 cm tray — kibble goes up, nothing spills down",
          "Soft 18 mm buds that flex under a paw without hurting",
          "Non-slip base, twist-lock tray, easy rinse clean",
          "Free shipping over $120 · pay on delivery",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
              <path d="M6.5 10.5l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
