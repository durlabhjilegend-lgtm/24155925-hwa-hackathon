"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartThumb } from "@/components/cart/CartThumb";
import { useCart } from "@/components/cart/CartProvider";
import { Dog } from "@/components/art/Dog";
import {
  FREE_SHIPPING_THRESHOLD,
  formatPrice,
  shippingFor,
  type DeliveryMethod,
} from "@/lib/catalog";
import type { Order, OrderIssue } from "@/lib/order-types";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  method: DeliveryMethod;
  notes: string;
  agree: boolean;
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  method: "standard",
  notes: "",
  agree: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[+]?[0-9][0-9 ()\-.]{6,19}$/;

const ISSUE_TO_FIELD: Record<string, string> = {
  "customer.firstName": "firstName",
  "customer.lastName": "lastName",
  "customer.email": "email",
  "customer.phone": "phone",
  "delivery.address1": "address1",
  "delivery.address2": "address2",
  "delivery.city": "city",
  "delivery.state": "state",
  "delivery.postalCode": "postalCode",
  "delivery.country": "country",
  "delivery.method": "method",
  notes: "notes",
};

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (form.firstName.trim().length < 2) errors.firstName = "Please enter your first name.";
  if (form.lastName.trim().length < 2) errors.lastName = "Please enter your last name.";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(form.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (form.address1.trim().length < 4) errors.address1 = "Please enter your street address.";
  if (form.city.trim().length < 2) errors.city = "Please enter your city.";
  if (form.state.trim().length < 2) errors.state = "Please enter your state or region.";
  if (form.postalCode.trim().length < 2) errors.postalCode = "Please enter your postal code.";
  if (form.country.trim().length < 2) errors.country = "Please enter your country.";
  if (!form.agree) errors.agree = "Please confirm the order details before placing it.";
  return errors;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, hydrated, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const shipping = shippingFor(subtotal, form.method);
  const total = subtotal + shipping;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as string]) return current;
      const next = { ...current };
      delete next[key as string];
      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || items.length === 0) return;
    setBanner("");

    const clientErrors = validate(form);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setBanner("Please check the highlighted fields.");
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((line) =>
            line.config
              ? { productId: line.productId, quantity: line.quantity, config: line.config }
              : { productId: line.productId, quantity: line.quantity }
          ),
          customer: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
          delivery: {
            address1: form.address1.trim(),
            address2: form.address2.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            postalCode: form.postalCode.trim(),
            country: form.country.trim(),
            method: form.method,
          },
          notes: form.notes.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; order?: Order; issues?: OrderIssue[]; error?: string }
        | null;

      if (!response.ok || !data?.ok || !data.order) {
        const mapped: Record<string, string> = {};
        (data?.issues ?? []).forEach((issue) => {
          const key = ISSUE_TO_FIELD[issue.field];
          if (key) mapped[key] = issue.message;
        });
        setErrors(mapped);
        const messages = (data?.issues ?? []).map((issue) => issue.message);
        setBanner(
          messages.length > 0
            ? `We couldn't place the order. ${messages.slice(0, 2).join(" ")}`
            : data?.error || "We couldn't place the order. Please try again."
        );
        setSubmitting(false);
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const order = data.order;
      try {
        window.sessionStorage.setItem(`wildnest-order-${order.id}`, JSON.stringify(order));
        window.sessionStorage.setItem("wildnest-last-order", JSON.stringify(order));
      } catch {
        /* Storage may be blocked; the confirmation page can fetch the order by id. */
      }
      setPlaced(true);
      clearCart();
      router.push(`/order/${order.id}`);
    } catch {
      setBanner("Network error — please check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="container-x py-16">
        <div className="h-8 w-48 animate-pulse rounded-full bg-forest-900/10" />
        <div className="mt-6 h-64 animate-pulse rounded-3xl bg-forest-900/5" />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-x py-24 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-forest-900/15 border-t-forest-700" />
        <p className="mt-5 font-display text-2xl font-extrabold">Placing your order…</p>
        <p className="mt-1 text-sm text-forest-900/60">Taking you to your confirmation.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <Dog pose="sleep" className="w-48" />
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Nothing to check out yet.</h1>
          <p className="mt-3 text-forest-900/65">
            Build a meadow or add a toy to your nest, then come back to place the order.
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
      <div ref={topRef} className="scroll-mt-28">
        <nav className="flex items-center gap-2 text-xs font-bold text-forest-900/45" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-forest-900">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cart" className="hover:text-forest-900">Cart</Link>
          <span aria-hidden="true">/</span>
          <span className="text-forest-900/70">Checkout</span>
        </nav>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Checkout</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold sm:text-5xl">Almost wild.</h1>
            <p className="mt-1 max-w-xl text-sm text-forest-900/60">
              Tell us where the meadow is going. Your order is validated and priced on our
              server, then confirmed with a WILDNEST order number.
            </p>
          </div>
          <Link href="/cart" className="text-sm font-extrabold text-forest-700 underline underline-offset-4 hover:text-forest-900">
            Back to cart
          </Link>
        </div>
      </div>

      {banner && (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-clay-500/30 bg-clay-300/15 px-4 py-3 text-sm font-bold text-clay-700"
        >
          {banner}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid items-start gap-8 lg:grid-cols-[1.22fr_0.78fr]" noValidate>
        <div className="space-y-5">
          <fieldset className="card p-5 sm:p-6">
            <legend className="font-display text-xl font-extrabold">Customer details</legend>
            <p className="mt-1 text-xs text-forest-900/50">So we know who the nest belongs to.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField
                id="firstName"
                label="First name"
                value={form.firstName}
                onChange={(value) => update("firstName", value)}
                error={errors.firstName}
                autoComplete="given-name"
                placeholder="Maya"
              />
              <TextField
                id="lastName"
                label="Last name"
                value={form.lastName}
                onChange={(value) => update("lastName", value)}
                error={errors.lastName}
                autoComplete="family-name"
                placeholder="Patel"
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => update("email", value)}
                error={errors.email}
                autoComplete="email"
                placeholder="maya@example.com"
              />
              <TextField
                id="phone"
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(value) => update("phone", value)}
                error={errors.phone}
                autoComplete="tel"
                placeholder="+1 555 123 4567"
              />
            </div>
          </fieldset>

          <fieldset className="card p-5 sm:p-6">
            <legend className="font-display text-xl font-extrabold">Delivery address</legend>
            <p className="mt-1 text-xs text-forest-900/50">Where the meadow should land.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <TextField
                  id="address1"
                  label="Street address"
                  value={form.address1}
                  onChange={(value) => update("address1", value)}
                  error={errors.address1}
                  autoComplete="address-line1"
                  placeholder="24 Fernwood Lane"
                />
              </div>
              <div className="sm:col-span-2">
                <TextField
                  id="address2"
                  label="Apartment, suite, etc. (optional)"
                  value={form.address2}
                  onChange={(value) => update("address2", value)}
                  error={errors.address2}
                  autoComplete="address-line2"
                  placeholder="Apt 3B"
                />
              </div>
              <TextField
                id="city"
                label="City"
                value={form.city}
                onChange={(value) => update("city", value)}
                error={errors.city}
                autoComplete="address-level2"
                placeholder="Portland"
              />
              <TextField
                id="state"
                label="State / region"
                value={form.state}
                onChange={(value) => update("state", value)}
                error={errors.state}
                autoComplete="address-level1"
                placeholder="Oregon"
              />
              <TextField
                id="postalCode"
                label="Postal code"
                value={form.postalCode}
                onChange={(value) => update("postalCode", value)}
                error={errors.postalCode}
                autoComplete="postal-code"
                placeholder="97205"
              />
              <TextField
                id="country"
                label="Country"
                value={form.country}
                onChange={(value) => update("country", value)}
                error={errors.country}
                autoComplete="country-name"
                placeholder="United States"
              />
            </div>
          </fieldset>

          <fieldset className="card p-5 sm:p-6">
            <legend className="font-display text-xl font-extrabold">Delivery method</legend>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {(
                [
                  {
                    value: "standard" as DeliveryMethod,
                    title: "Standard",
                    detail: "3–5 working days",
                    price: subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : formatPrice(900),
                  },
                  {
                    value: "express" as DeliveryMethod,
                    title: "Express",
                    detail: "1–2 working days",
                    price: formatPrice(1500),
                  },
                ] as const
              ).map((option) => {
                const active = form.method === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3.5 transition-all ${
                      active ? "border-forest-800 bg-forest-50" : "border-forest-900/10 bg-cream-50 hover:border-forest-800/30"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="method"
                        value={option.value}
                        checked={active}
                        onChange={() => update("method", option.value)}
                        className="h-4 w-4 accent-forest-700"
                      />
                      <span>
                        <span className="block text-sm font-extrabold">{option.title}</span>
                        <span className="block text-[11px] text-forest-900/50">{option.detail}</span>
                      </span>
                    </span>
                    <span className="text-xs font-extrabold text-forest-700">{option.price}</span>
                  </label>
                );
              })}
            </div>
            {errors.method && <p className="mt-2 text-xs font-bold text-clay-600">{errors.method}</p>}
          </fieldset>

          <fieldset className="card p-5 sm:p-6">
            <legend className="font-display text-xl font-extrabold">Anything we should know?</legend>
            <p className="mt-1 text-xs text-forest-900/50">
              Gate codes, a dog who digs with enthusiasm, a gift note — optional.
            </p>
            <div className="mt-4">
              <label htmlFor="notes" className="field-label">Order notes (optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={(event) => update("notes", event.target.value.slice(0, 500))}
                rows={3}
                className="field resize-none"
                placeholder="Leave with the neighbour if we're out…"
              />
              <div className="mt-1 flex justify-between text-[11px] text-forest-900/45">
                <span>{errors.notes ?? "Max 500 characters."}</span>
                <span>{form.notes.length}/500</span>
              </div>
            </div>
          </fieldset>

          <fieldset className="card p-5 sm:p-6">
            <legend className="font-display text-xl font-extrabold">Payment & confirmation</legend>
            <div className="mt-3 rounded-2xl bg-cream-200/60 px-4 py-3 text-xs leading-relaxed text-forest-900/65">
              <strong className="text-forest-900">No card details are collected online.</strong>{" "}
              You pay on delivery. Placing the order sends your details to our order API,
              where they are validated and stored with a unique order number.
            </div>
            <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(event) => update("agree", event.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-forest-700"
                aria-invalid={Boolean(errors.agree)}
              />
              <span className="text-forest-900/70">
                I confirm my customer and delivery details are correct, and I understand
                this is a real order with payment on delivery.
              </span>
            </label>
            {errors.agree && <p className="mt-2 text-xs font-bold text-clay-600">{errors.agree}</p>}
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold">Your order</h2>
              <Link href="/cart" className="text-xs font-extrabold text-forest-700 underline underline-offset-4">
                Edit
              </Link>
            </div>
            <ul className="mt-4 max-h-72 divide-y divide-forest-900/10 overflow-y-auto pr-1">
              {items.map((line) => (
                <li key={line.key} className="flex items-center gap-3 py-3">
                  <CartThumb line={line} className="h-14 w-14 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-extrabold">{line.name}</p>
                    <p className="text-[11px] text-forest-900/50">
                      {line.quantity} × {formatPrice(line.price)}
                    </p>
                  </div>
                  <p className="text-xs font-extrabold">{formatPrice(line.price * line.quantity)}</p>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 border-t border-forest-900/10 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-forest-900/60">Subtotal</dt>
                <dd className="font-extrabold">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-forest-900/60">
                  Shipping ({form.method === "express" ? "express" : "standard"})
                </dt>
                <dd className="font-extrabold">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-forest-900/10 pt-3">
                <dt className="text-base font-extrabold">Total</dt>
                <dd className="font-display text-2xl font-extrabold">{formatPrice(total)}</dd>
              </div>
            </dl>

            <button type="submit" disabled={submitting} className="btn-primary mt-5 h-14 w-full text-base">
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream-100/40 border-t-cream-50" />
                  Placing your order…
                </>
              ) : (
                <>Place order · {formatPrice(total)}</>
              )}
            </button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-forest-900/45">
              Server-validated order · Instant confirmation · Pay on delivery
            </p>
          </div>

          <ul className="mt-4 space-y-2 px-1 text-xs font-bold text-forest-900/55">
            <li>Order total is recalculated on the server</li>
            <li>Confirmation includes your unique order number</li>
            <li>Questions? hello@wildnest.studio</li>
          </ul>
        </aside>
      </form>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field ${error ? "field-error" : ""}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-bold text-clay-600">
          {error}
        </p>
      )}
    </div>
  );
}
