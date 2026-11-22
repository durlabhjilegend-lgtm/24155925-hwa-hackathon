"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import { useCart } from "@/components/cart/CartProvider";
import {
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  PRODUCT_MAP,
  formatPrice,
  type Product,
} from "@/lib/catalog";

const MATS = PRODUCTS.filter((product) => product.kind === "mat");
const CHEWS = PRODUCTS.filter((product) => product.kind === "chew");
const PUZZLES = PRODUCTS.filter((product) => product.kind === "puzzle");
const SCENTS = PRODUCTS.filter((product) => product.kind === "scent");

export function PackageBuilder() {
  const { addProduct } = useCart();
  const [matId, setMatId] = useState("mat-classic");
  const [extraIds, setExtraIds] = useState<string[]>(["chew-antler", "puzzle-maze"]);
  const [added, setAdded] = useState(false);

  const selected: Product[] = [matId, ...extraIds]
    .map((id) => PRODUCT_MAP[id])
    .filter((product): product is Product => Boolean(product));

  const total = selected.reduce((sum, product) => sum + product.price, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  const toggleExtra = (id: string) => {
    setExtraIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
    setAdded(false);
  };

  const addKit = () => {
    selected.forEach((product) => addProduct(product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.18fr_0.82fr] lg:gap-10">
      <div className="space-y-5">
        <BuilderStep number="01" title="Choose your meadow" hint="Every kit starts with a dig mat.">
          <div className="grid gap-2.5 sm:grid-cols-3" role="group" aria-label="Choose a dig mat">
            {MATS.map((product) => {
              const active = matId === product.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setMatId(product.id);
                    setAdded(false);
                  }}
                  aria-pressed={active}
                  className={`overflow-hidden rounded-2xl border-2 text-left transition-all ${
                    active
                      ? "border-forest-800 bg-forest-50 shadow-soft"
                      : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
                  }`}
                >
                  <span
                    className="block overflow-hidden"
                    style={{ background: `linear-gradient(160deg,${product.accent}1f,#FAF6E9 70%)` }}
                  >
                    <ProductArt art={product.art} accent={product.accent} label={product.name} className="h-24 w-full" />
                  </span>
                  <span className="block px-3 py-2.5">
                    <span className="block text-xs font-extrabold">{product.name.replace("WILDNEST ", "")}</span>
                    <span className="mt-0.5 block text-[10px] font-bold text-forest-900/45">{product.dims}</span>
                    <span className="mt-1 block text-xs font-extrabold text-forest-700">{formatPrice(product.price)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </BuilderStep>

        <BuilderStep number="02" title="Add chew toys" hint="Slow, satisfying things to gnaw.">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {CHEWS.map((product) => (
              <ToggleCard
                key={product.id}
                product={product}
                active={extraIds.includes(product.id)}
                onToggle={() => toggleExtra(product.id)}
              />
            ))}
          </div>
        </BuilderStep>

        <BuilderStep number="03" title="Add puzzle games" hint="For noses that like a project.">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {PUZZLES.map((product) => (
              <ToggleCard
                key={product.id}
                product={product}
                active={extraIds.includes(product.id)}
                onToggle={() => toggleExtra(product.id)}
              />
            ))}
          </div>
        </BuilderStep>

        <BuilderStep number="04" title="Add forest air" hint="Scent pods and the breeze dispenser.">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {SCENTS.map((product) => (
              <ToggleCard
                key={product.id}
                product={product}
                active={extraIds.includes(product.id)}
                onToggle={() => toggleExtra(product.id)}
              />
            ))}
          </div>
        </BuilderStep>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">Your custom kit</p>
              <h3 className="mt-1 font-display text-2xl font-extrabold">{selected.length} pieces</h3>
            </div>
            <span className="chip">{formatPrice(total)}</span>
          </div>

          <ul className="mt-4 divide-y divide-forest-900/10">
            {selected.map((product) => (
              <li key={product.id} className="flex items-center gap-3 py-2.5">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl"
                  style={{ background: `${product.accent}1a` }}
                >
                  <ProductArt art={product.art} accent={product.accent} label="" className="h-full w-full" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-extrabold">{product.name}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-forest-900/40">
                    {product.kind === "mat" ? "Dig mat" : product.kind === "chew" ? "Chew toy" : product.kind === "puzzle" ? "Puzzle" : "Scent"}
                  </span>
                </span>
                <span className="text-xs font-extrabold">{formatPrice(product.price)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold text-forest-900/60">
              <span>{remaining === 0 ? "Free shipping unlocked" : `Free shipping at ${formatPrice(FREE_SHIPPING_THRESHOLD)}`}</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-forest-900/10">
              <div
                className="h-full rounded-full bg-forest-600 transition-all duration-500"
                style={{ width: `${Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>

          <button type="button" onClick={addKit} className="btn-primary mt-5 w-full">
            {added ? "Kit added to nest" : `Add kit to nest · ${formatPrice(total)}`}
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-forest-900/50">
            Kits are built from individual products, so you can swap, add or remove
            anything in the cart before checkout.
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-forest-900/10 pt-3 text-xs font-extrabold">
            <Link href="/customize" className="text-forest-700 underline underline-offset-4 hover:text-forest-900">
              Customize the mat too
            </Link>
            <Link href="/shop" className="text-forest-900/50 hover:text-forest-900">
              Back to shop
            </Link>
          </div>
        </div>

        <p className="mt-3 rounded-2xl border border-forest-900/10 bg-cream-50/70 px-4 py-3 text-[11px] leading-relaxed text-forest-900/55">
          Pay on delivery for now. Orders are confirmed instantly and stored with a unique
          WILDNEST order number.
        </p>
      </div>
    </div>
  );
}

function ToggleCard({
  product,
  active,
  onToggle,
}: {
  product: Product;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`relative overflow-hidden rounded-2xl border-2 text-left transition-all ${
        active
          ? "border-forest-800 bg-forest-50 shadow-sm"
          : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
      }`}
    >
      <span
        className="block"
        style={{ background: `linear-gradient(160deg,${product.accent}1f,#FAF6E9 75%)` }}
      >
        <ProductArt art={product.art} accent={product.accent} label={product.name} className="h-20 w-full sm:h-24" />
      </span>
      <span
        className={`absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${
          active ? "border-forest-800 bg-forest-800 text-cream-50" : "border-forest-900/25 bg-cream-50/80"
        }`}
        aria-hidden="true"
      >
        {active && (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="block px-2.5 py-2">
        <span className="block text-[11px] font-extrabold leading-tight">{product.name}</span>
        <span className="mt-0.5 block text-[10px] font-extrabold text-forest-700">{formatPrice(product.price)}</span>
      </span>
    </button>
  );
}

function BuilderStep({
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
