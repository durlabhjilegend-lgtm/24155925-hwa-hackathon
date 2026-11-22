"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Dog } from "@/components/art/Dog";
import { GrassMat } from "@/components/art/GrassMat";
import { ProductArt } from "@/components/art/ProductArt";
import { PRODUCT_MAP, formatPrice } from "@/lib/catalog";
import type { Order, OrderItem } from "@/lib/order-types";

function ItemThumb({ item }: { item: OrderItem }) {
  if (item.config) {
    return (
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-forest-50">
        <GrassMat
          color={item.config.color}
          pattern={item.config.pattern}
          seed={13}
          showKibble={false}
          className="h-full w-full"
          label={`${item.name} thumbnail`}
        />
      </div>
    );
  }
  const product = PRODUCT_MAP[item.productId];
  return (
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-forest-50">
      <ProductArt
        art={product?.art ?? "unknown"}
        accent={product?.accent ?? "#2C6E49"}
        label={`${item.name} thumbnail`}
        className="h-full w-full"
      />
    </div>
  );
}

function estimatedArrival(order: Order): string {
  const date = new Date(order.createdAt);
  const days = order.delivery.method === "express" ? 2 : 5;
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function OrderConfirmation({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<"loading" | "found" | "missing">("loading");
  const reduce = useReducedMotion();
  const orderId = id.trim().toUpperCase();

  useEffect(() => {
    let snapshot: Order | null = null;
    try {
      const raw = window.sessionStorage.getItem(`wildnest-order-${orderId}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Order;
        if (parsed && parsed.id === orderId) snapshot = parsed;
      }
    } catch {
      /* Ignore storage failures. */
    }

    if (snapshot) {
      setOrder(snapshot);
      setStatus("found");
    }

    fetch(`/api/orders/${encodeURIComponent(orderId)}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as { ok?: boolean; order?: Order };
      })
      .then((data) => {
        if (data?.order) {
          setOrder(data.order);
          setStatus("found");
        } else if (!snapshot) {
          setStatus("missing");
        }
      })
      .catch(() => {
        if (!snapshot) setStatus("missing");
      });
  }, [orderId]);

  if (status === "loading") {
    return (
      <div className="container-x py-24 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-forest-900/15 border-t-forest-700" />
        <p className="mt-5 font-display text-2xl font-extrabold">Finding your order…</p>
      </div>
    );
  }

  if (status === "missing" || !order) {
    return (
      <div className="container-x py-20">
        <div className="mx-auto max-w-xl text-center">
          <Dog pose="look" className="mx-auto w-44" />
          <h1 className="mt-2 font-display text-3xl font-extrabold">That order isn&apos;t here.</h1>
          <p className="mt-2 text-forest-900/65">
            The order number <span className="font-extrabold">{orderId}</span> wasn&apos;t found
            on this server instance. If you just placed it, check the confirmation saved in this
            browser, or contact us with the number and we&apos;ll trace it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-primary">Back to the shop</Link>
            <a href={`mailto:hello@wildnest.studio?subject=Order%20${orderId}`} className="btn-ghost">
              Contact us
            </a>
          </div>
        </div>
      </div>
    );
  }

  const created = new Date(order.createdAt);
  const createdLabel = created.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const name = `${order.customer.firstName} ${order.customer.lastName}`;

  return (
    <div className="container-x py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-900 px-6 py-10 text-cream-50 shadow-lift sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-moss-500/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-clay-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex items-start gap-5">
            <motion.span
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-moss-300 text-forest-900"
              initial={reduce ? false : { scale: 0.4, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
                <path d="M7 16.5l6 6L25 9" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-moss-300">
                Order confirmed
              </p>
              <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight text-cream-50 sm:text-4xl">
                Your nest is on its way, {order.customer.firstName}.
              </h1>
              <p className="mt-2 max-w-xl text-sm text-cream-200/75">
                We&apos;ve got it from here. Your order details are stored on our side, and
                this confirmation is your record.
              </p>
            </div>
          </div>
          <div className="w-full shrink-0 rounded-2xl bg-cream-100/10 px-5 py-4 backdrop-blur lg:w-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-cream-200/60">Order number</p>
            <p className="font-display text-2xl font-extrabold">{order.id}</p>
            <p className="mt-1 text-xs font-bold text-moss-300">{order.status === "confirmed" ? "Confirmed" : order.status} · {createdLabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="card p-5 sm:p-6">
          <h2 className="font-display text-xl font-extrabold">What&apos;s in the nest</h2>
          <ul className="mt-4 divide-y divide-forest-900/10">
            {order.items.map((item, index) => (
              <li key={`${item.productId}-${index}`} className="flex items-center gap-4 py-3.5">
                <ItemThumb item={item} />
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold leading-tight">{item.name}</p>
                  {item.detail && <p className="mt-0.5 text-xs text-forest-900/55">{item.detail}</p>}
                  <p className="mt-1 text-xs font-bold text-forest-700">
                    {item.quantity} × {formatPrice(item.unitPrice)}
                  </p>
                </div>
                <p className="font-display text-lg font-extrabold">{formatPrice(item.lineTotal)}</p>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-forest-900/10 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-forest-900/60">Subtotal</dt>
              <dd className="font-extrabold">{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-forest-900/60">
                Shipping ({order.delivery.method === "express" ? "express" : "standard"})
              </dt>
              <dd className="font-extrabold">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-forest-900/10 pt-3">
              <dt className="text-base font-extrabold">Total · pay on delivery</dt>
              <dd className="font-display text-2xl font-extrabold">{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-display text-xl font-extrabold">Delivery</h2>
            <p className="mt-2 text-sm font-extrabold">{name}</p>
            <p className="mt-1 text-sm leading-relaxed text-forest-900/65">
              {order.delivery.address1}
              {order.delivery.address2 ? `, ${order.delivery.address2}` : ""}
              <br />
              {order.delivery.city}, {order.delivery.state} {order.delivery.postalCode}
              <br />
              {order.delivery.country}
            </p>
            <p className="mt-3 border-t border-forest-900/10 pt-3 text-xs text-forest-900/55">
              {order.customer.email}
              <br />
              {order.customer.phone}
            </p>
            <div className="mt-3 rounded-xl bg-moss-100 px-3 py-2 text-xs font-extrabold text-forest-800">
              Estimated arrival · {estimatedArrival(order)}
            </div>
            {order.notes && (
              <div className="mt-3 rounded-xl bg-cream-200/60 px-3 py-2 text-xs text-forest-900/65">
                <span className="font-extrabold">Your note:</span> {order.notes}
              </div>
            )}
          </div>

          <div className="card p-5">
            <h2 className="font-display text-lg font-extrabold">What happens next</h2>
            <ol className="mt-3 space-y-3">
              {[
                "We check the order and pick the buds by hand.",
                "It's packed within two working days with a starter scent pod.",
                "It arrives, your dog digs in, and you pay on delivery.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-forest-900/65">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest-900 text-[10px] font-extrabold text-cream-50">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-ghost flex-1"
            >
              Print confirmation
            </button>
            <Link href="/shop" className="btn-primary flex-1">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-forest-900/10 bg-cream-50 px-6 py-6 sm:flex-row">
        <p className="text-sm text-forest-900/65">
          Need to change something? Email{" "}
          <a href={`mailto:hello@wildnest.studio?subject=Order%20${order.id}`} className="font-extrabold text-forest-800 underline underline-offset-4">
            hello@wildnest.studio
          </a>{" "}
          with your order number.
        </p>
        <Link href="/" className="text-sm font-extrabold text-forest-700 underline underline-offset-4 hover:text-forest-900">
          Back to WILDNEST
        </Link>
      </div>
    </div>
  );
}
