"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/catalog";
import { CartThumb } from "./CartThumb";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, count, setQuantity, removeLine } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, closeCart]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="absolute inset-0 h-full w-full cursor-default bg-forest-950/45 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-cream-100 shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-forest-900/10 px-6 py-5">
              <div>
                <h2 id="cart-drawer-title" className="font-display text-2xl font-extrabold">
                  Your nest
                </h2>
                <p className="text-xs font-bold text-forest-700">
                  {count} {count === 1 ? "item" : "items"} · {formatPrice(subtotal)}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="grid h-10 w-10 place-items-center rounded-full bg-cream-50 text-forest-900 transition-colors hover:bg-cream-200"
                aria-label="Close cart"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-forest-50">
                    <svg viewBox="0 0 24 24" className="h-11 w-11 text-forest-600" fill="none" aria-hidden="true">
                      <path d="M4 9h16l-1.4 10.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 9Z" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M8.5 9V7a3.5 3.5 0 0 1 7 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-display text-xl font-extrabold">Nothing buried here yet.</p>
                  <p className="max-w-[260px] text-sm text-forest-900/70">
                    Add a meadow, a chew or a puzzle and we&apos;ll keep it safe in your nest.
                  </p>
                  <Link href="/shop" onClick={closeCart} className="btn-primary mt-1">
                    Browse the meadow
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((line) => (
                    <li key={line.key} className="flex gap-4">
                      <CartThumb line={line} className="h-20 w-20 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-extrabold leading-tight text-forest-900">{line.name}</p>
                            {line.detail && (
                              <p className="mt-1 line-clamp-2 text-xs leading-snug text-forest-900/60">{line.detail}</p>
                            )}
                          </div>
                          <p className="shrink-0 text-sm font-extrabold">{formatPrice(line.price * line.quantity)}</p>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.key, line.quantity - 1)}
                              className="grid h-7 w-7 place-items-center rounded-full border border-forest-900/20 text-sm font-extrabold transition-colors hover:bg-cream-200 disabled:opacity-40"
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
                              className="grid h-7 w-7 place-items-center rounded-full border border-forest-900/20 text-sm font-extrabold transition-colors hover:bg-cream-200 disabled:opacity-40"
                              aria-label={`Increase quantity of ${line.name}`}
                              disabled={line.quantity >= 10}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            className="text-xs font-bold text-clay-600 underline underline-offset-2 hover:text-clay-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-forest-900/10 bg-cream-50/80 px-6 py-5">
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-forest-900/70">
                    <span>{remaining === 0 ? "Free shipping unlocked" : `Free shipping at ${formatPrice(FREE_SHIPPING_THRESHOLD)}`}</span>
                    <span>{remaining === 0 ? "✓" : `${formatPrice(subtotal)} / ${formatPrice(FREE_SHIPPING_THRESHOLD)}`}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-forest-900/10">
                    <div
                      className="h-full rounded-full bg-forest-600 transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-forest-900/70">Subtotal</span>
                  <span className="font-display text-2xl font-extrabold">{formatPrice(subtotal)}</span>
                </div>
                <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                  Checkout
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-2 block text-center text-xs font-bold text-forest-700 underline underline-offset-4 hover:text-forest-900"
                >
                  View full cart & delivery estimate
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
