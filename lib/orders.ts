import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import {
  CUSTOM_MAT_ID,
  DEFAULT_CUSTOM_MAT,
  PRODUCT_MAP,
  type CustomMatConfig,
  type DeliveryMethod,
  customMatDetail,
  customMatName,
  isCustomMatConfig,
  priceCustomMat,
  shippingFor,
} from "./catalog";
import type { Order, OrderIssue, OrderItem } from "./order-types";

export type { Order, OrderCustomer, OrderDelivery, OrderIssue, OrderItem } from "./order-types";

export type ValidationResult =
  | { ok: true; order: Order }
  | { ok: false; issues: OrderIssue[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[+]?[0-9][0-9 ()\-.]{6,19}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function inRange(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

function newOrderId(existing: Map<string, Order>): string {
  let id = "";
  do {
    id = `WN-${randomBytes(4).toString("hex").toUpperCase()}`;
  } while (existing.has(id));
  return id;
}

export function validateOrder(input: unknown): ValidationResult {
  const issues: OrderIssue[] = [];
  const body = asRecord(input);

  /* ---------------------------------- items ---------------------------------- */
  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length === 0) {
    issues.push({ field: "items", message: "Your nest is empty — add at least one item." });
  }
  if (rawItems.length > 25) {
    issues.push({ field: "items", message: "Orders can hold a maximum of 25 lines." });
  }

  const items: OrderItem[] = [];
  rawItems.slice(0, 25).forEach((raw, index) => {
    const item = asRecord(raw);
    const productId = str(item.productId);
    const quantityRaw = item.quantity;
    const quantity = typeof quantityRaw === "number" ? Math.floor(quantityRaw) : NaN;

    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 10) {
      issues.push({
        field: `items[${index}].quantity`,
        message: "Quantity must be a whole number between 1 and 10.",
      });
      return;
    }

    if (productId === CUSTOM_MAT_ID) {
      const rawConfig = item.config ?? DEFAULT_CUSTOM_MAT;
      if (!isCustomMatConfig(rawConfig)) {
        issues.push({
          field: `items[${index}].config`,
          message: "That playzone configuration isn't valid.",
        });
        return;
      }
      const config: CustomMatConfig = { ...rawConfig };
      const unitPrice = priceCustomMat(config);
      items.push({
        productId: CUSTOM_MAT_ID,
        name: customMatName(config),
        detail: customMatDetail(config),
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
        config,
      });
      return;
    }

    const product = PRODUCT_MAP[productId];
    if (!product) {
      issues.push({
        field: `items[${index}].productId`,
        message: "One of the items in your cart is no longer available.",
      });
      return;
    }
    items.push({
      productId: product.id,
      name: product.name,
      detail: product.tagline,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price * quantity,
    });
  });

  /* --------------------------------- customer --------------------------------- */
  const customerRaw = asRecord(body.customer);
  const firstName = str(customerRaw.firstName);
  const lastName = str(customerRaw.lastName);
  const email = str(customerRaw.email);
  const phone = str(customerRaw.phone);

  if (!inRange(firstName, 2, 60)) {
    issues.push({ field: "customer.firstName", message: "Please enter a first name (2+ characters)." });
  }
  if (!inRange(lastName, 2, 60)) {
    issues.push({ field: "customer.lastName", message: "Please enter a last name (2+ characters)." });
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    issues.push({ field: "customer.email", message: "Please enter a valid email address." });
  }
  if (!PHONE_RE.test(phone)) {
    issues.push({ field: "customer.phone", message: "Please enter a valid phone number." });
  }

  /* --------------------------------- delivery --------------------------------- */
  const deliveryRaw = asRecord(body.delivery);
  const address1 = str(deliveryRaw.address1);
  const address2 = str(deliveryRaw.address2);
  const city = str(deliveryRaw.city);
  const state = str(deliveryRaw.state);
  const postalCode = str(deliveryRaw.postalCode);
  const country = str(deliveryRaw.country);
  const methodRaw = str(deliveryRaw.method);
  const method: DeliveryMethod = methodRaw === "express" ? "express" : "standard";

  if (!inRange(address1, 4, 120)) {
    issues.push({ field: "delivery.address1", message: "Please enter a street address." });
  }
  if (address2.length > 120) {
    issues.push({ field: "delivery.address2", message: "Address line 2 is too long." });
  }
  if (!inRange(city, 2, 60)) {
    issues.push({ field: "delivery.city", message: "Please enter a city." });
  }
  if (!inRange(state, 2, 60)) {
    issues.push({ field: "delivery.state", message: "Please enter a state or region." });
  }
  if (!inRange(postalCode, 2, 16)) {
    issues.push({ field: "delivery.postalCode", message: "Please enter a postal code." });
  }
  if (!inRange(country, 2, 60)) {
    issues.push({ field: "delivery.country", message: "Please enter a country." });
  }
  if (methodRaw && methodRaw !== "standard" && methodRaw !== "express") {
    issues.push({ field: "delivery.method", message: "Choose a delivery method." });
  }

  const notes = str(body.notes);
  if (notes.length > 500) {
    issues.push({ field: "notes", message: "Notes must be under 500 characters." });
  }

  if (issues.length > 0) return { ok: false, issues };

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = shippingFor(subtotal, method);

  const store = getOrderStore();
  const order: Order = {
    id: newOrderId(store),
    createdAt: new Date().toISOString(),
    status: "confirmed",
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    customer: { firstName, lastName, email, phone },
    delivery: {
      address1,
      address2,
      city,
      state,
      postalCode,
      country,
      method,
    },
    notes,
    currency: "USD",
  };

  return { ok: true, order };
}

/* --------------------------------- order store --------------------------------- */

type OrderGlobal = typeof globalThis & { __wildnestOrderStore?: Map<string, Order> };

function storeFilePath(): string {
  const base = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), ".data");
  return path.join(base, "wildnest-orders.json");
}

function loadStore(): Map<string, Order> {
  const map = new Map<string, Order>();
  try {
    const file = storeFilePath();
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as unknown;
      if (parsed && typeof parsed === "object") {
        for (const value of Object.values(parsed as Record<string, Order>)) {
          if (value && typeof value === "object" && typeof value.id === "string") {
            map.set(value.id, value);
          }
        }
      }
    }
  } catch {
    /* A missing or unreadable store should never block an order. */
  }
  return map;
}

export function getOrderStore(): Map<string, Order> {
  const g = globalThis as OrderGlobal;
  if (!g.__wildnestOrderStore) {
    g.__wildnestOrderStore = loadStore();
  }
  return g.__wildnestOrderStore;
}

export function saveOrder(order: Order): void {
  const store = getOrderStore();
  store.set(order.id, order);
  try {
    const file = storeFilePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const plain: Record<string, Order> = {};
    store.forEach((value, key) => {
      plain[key] = value;
    });
    fs.writeFileSync(file, JSON.stringify(plain, null, 2), "utf8");
  } catch {
    /* The in-memory store still holds the order for this instance. */
  }
}

export function findOrder(id: string): Order | undefined {
  return getOrderStore().get(id.trim().toUpperCase());
}

export function orderCount(): number {
  return getOrderStore().size;
}
