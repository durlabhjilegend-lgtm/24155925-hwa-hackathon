"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { PRODUCTS, type ProductKind } from "@/lib/catalog";

type Filter = "all" | ProductKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "mat", label: "Dig mats" },
  { id: "chew", label: "Chew toys" },
  { id: "puzzle", label: "Puzzle games" },
  { id: "scent", label: "Outdoor scent" },
];

function normalizeKind(value?: string): Filter {
  if (value === "mat" || value === "chew" || value === "puzzle" || value === "scent") return value;
  return "all";
}

export function ShopGrid({ initialKind }: { initialKind?: string }) {
  const [kind, setKind] = useState<Filter>(normalizeKind(initialKind));
  const products = kind === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.kind === kind);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">
          {FILTERS.map((filter) => {
            const count =
              filter.id === "all"
                ? PRODUCTS.length
                : PRODUCTS.filter((product) => product.kind === filter.id).length;
            const active = kind === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setKind(filter.id)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                  active
                    ? "bg-forest-900 text-cream-50 shadow-soft"
                    : "bg-cream-50/80 text-forest-800 hover:bg-cream-200"
                }`}
              >
                {filter.label}
                <span className={`ml-1.5 text-[10px] ${active ? "text-moss-300" : "text-forest-900/40"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs font-bold text-forest-900/50" aria-live="polite">
          {products.length} {products.length === 1 ? "piece" : "pieces"} in the meadow
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-forest-900/10 bg-forest-900 px-6 py-6 text-cream-50 sm:flex-row">
        <div>
          <p className="font-display text-xl font-extrabold">Still want it yours?</p>
          <p className="mt-1 text-sm text-cream-200/70">
            Choose the footprint, bud pattern, colour and forest scent of your own playzone.
          </p>
        </div>
        <Link href="/customize" className="btn-light shrink-0">
          Customize a playzone
        </Link>
      </div>
    </div>
  );
}
