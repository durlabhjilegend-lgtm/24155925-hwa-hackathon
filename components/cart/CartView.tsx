"use client";

import Link from "next/link";
import { CartThumb } from "@/components/cart/CartThumb";
import { useCart } from "@/components/cart/CartProvider";
import { Dog } from "@/components/art/Dog";
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
  formatPrice,
} from "@/lib/catalog";

export function CartView() {
  const { items, hydrated, subtotal, setQuantity, removeLine } = useCart();
  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING;

  if (!hydrated) {
    return (
      <div className="container-x py-16">
        <div className="h-8 w-48 animate-pulse rounded-full bg-forest-900/10" />
        <div className="mt-6 h-40 animate-pulse rounded-3xl bg-forest-900/5" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="w-56">
            <Dog pose="sleep" className="w-full" />
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Your nest is empty.</h1>
          <p className="mt-3 max-w-md text-forest-900/65">
            No meadow, no toys, no forest air. Let&apos;s fix that with something worth digging for.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-primary">Browse the shop</Link>
            <Link href="/customize" className="btn-ghost">Customize a playzone</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Cart</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold sm:text-5xl">Your nest</h1>
          <p className="mt-1 text-sm font-bold text-forest-900/50">
            {count} {count === 1 ? "item" : "items"} · {formatPrice(subtotal)}
          </p>
        </div>
        <Link href="/shop" className="text-sm font-extrabold text-forest-700 underline underline-offset-4 hover:text-forest-900">
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="card divide-y divide-forest-900/10 px-5 sm:px-6">
          {items.map((line) => (
            <div key={line.key} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
              <CartThumb line={line} className="h-24 w-24 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-extrabold leading-tight">{line.name}</p>
                {line.detail && <p className="mt-1 text-xs leading-snug text-forest-900/55">{line.detail}</p>}
                <p className="mt-1.5 text-xs font-bold text-forest-700">{formatPrice(line.price)} each</p>
                <button
                  type="button"
                  onClick={() => removeLine(line.key)}
                  className="mt-2 text-xs font-bold text-clay-600 underline underline-offset-2 hover:text-clay-700 sm:hidden"
                >
                  Remove
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(line.key, line.quantity - 1)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-forest-900/20 text-sm font-extrabold transition-colors hover:bg-cream-200 disabled:opacity-40"
                    aria-label={`Decrease quantity of ${line.name}`}
                    disabled={line.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-extrabold" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(line.key, line.quantity + 1)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-forest-900/20 text-sm font-extrabold transition-colors hover:bg-cream-200 disabled:opacity-40"
                    aria-label={`Increase quantity of ${line.name}`}
                    disabled={line.quantity >= 10}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeLine(line.key)}
                    className="ml-2 hidden text-xs font-bold text-clay-600 underline underline-offset-2 hover:text-clay-700 sm:inline"
                  >
                    Remove
                  </button>
                </div>
                <p className="font-display text-lg font-extrabold">{formatPrice(line.price * line.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="card p-5 sm:p-6">
            <h2 className="font-display text-xl font-extrabold">Order summary</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-forest-900/60">Subtotal</dt>
                <dd className="font-extrabold">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-forest-900/60">Standard shipping</dt>
                <dd className="font-extrabold">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-forest-900/10 pt-3">
                <dt className="text-base font-extrabold">Estimated total</dt>
                <dd className="font-display text-2xl font-extrabold">{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-[11px] leading-relaxed text-forest-900/45">
              Express delivery ($15) can be selected at checkout. Final total is confirmed on
              the server before your order is placed.
            </p>

            <Link href="/checkout" className="btn-primary mt-5 w-full">
              Continue to checkout
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="mt-3 rounded-xl bg-moss-100 px-3 py-2 text-center text-[11px] font-bold text-forest-800">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} for free standard shipping.
              </p>
            )}
          </div>

          <ul className="mt-4 space-y-2 px-1 text-xs font-bold text-forest-900/55">
            <li>30-day happy-dig guarantee</li>
            <li>Pay on delivery — no card details online</li>
            <li>Instant order number and confirmation</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
