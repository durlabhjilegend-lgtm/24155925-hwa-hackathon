"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CUSTOM_MAT_ID,
  customMatDetail,
  customMatName,
  priceCustomMat,
  type CustomMatConfig,
  type Product,
} from "@/lib/catalog";

export interface CartLine {
  key: string;
  productId: string;
  name: string;
  detail?: string;
  price: number;
  quantity: number;
  art: string;
  accent: string;
  config?: CustomMatConfig;
}

interface AddLineInput {
  productId: string;
  name: string;
  detail?: string;
  price: number;
  art: string;
  accent: string;
  quantity?: number;
  config?: CustomMatConfig;
}

interface CartContextValue {
  items: CartLine[];
  hydrated: boolean;
  isOpen: boolean;
  count: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addLine: (input: AddLineInput) => void;
  addProduct: (product: Product, quantity?: number) => void;
  addCustomMat: (config: CustomMatConfig) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "wildnest-cart-v1";

function clampQty(value: number): number {
  return Math.max(1, Math.min(10, Math.round(value)));
}

function isLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.key === "string" &&
    typeof line.productId === "string" &&
    typeof line.name === "string" &&
    typeof line.price === "number" &&
    typeof line.quantity === "number" &&
    typeof line.art === "string" &&
    typeof line.accent === "string"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setItems(parsed.filter(isLine).map((line) => ({ ...line, quantity: clampQty(line.quantity) })));
        }
      }
    } catch {
      /* A corrupt cart should just start empty. */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Private mode may block storage; the cart still works this session. */
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addLine = useCallback((input: AddLineInput) => {
    const quantity = clampQty(input.quantity ?? 1);
    const isCustom = input.productId === CUSTOM_MAT_ID || Boolean(input.config);
    setItems((current) => {
      if (!isCustom) {
        const existing = current.find((line) => line.productId === input.productId && !line.config);
        if (existing) {
          return current.map((line) =>
            line.key === existing.key
              ? { ...line, quantity: clampQty(line.quantity + quantity) }
              : line
          );
        }
      }
      const key = isCustom
        ? `custom:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
        : `product:${input.productId}`;
      return [
        ...current,
        {
          key,
          productId: input.productId,
          name: input.name,
          detail: input.detail,
          price: input.price,
          quantity,
          art: input.art,
          accent: input.accent,
          config: input.config,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const addProduct = useCallback(
    (product: Product, quantity = 1) => {
      addLine({
        productId: product.id,
        name: product.name,
        detail: product.tagline,
        price: product.price,
        art: product.art,
        accent: product.accent,
        quantity,
      });
    },
    [addLine]
  );

  const addCustomMat = useCallback(
    (config: CustomMatConfig) => {
      addLine({
        productId: CUSTOM_MAT_ID,
        name: customMatName(config),
        detail: customMatDetail(config),
        price: priceCustomMat(config),
        art: "custom-mat",
        accent: "#2C6E49",
        config: { ...config },
      });
    },
    [addLine]
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      current.map((line) => (line.key === key ? { ...line, quantity: clampQty(quantity) } : line))
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setItems((current) => current.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, line) => sum + line.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      isOpen,
      count,
      subtotal,
      openCart,
      closeCart,
      addLine,
      addProduct,
      addCustomMat,
      setQuantity,
      removeLine,
      clearCart,
    }),
    [
      items,
      hydrated,
      isOpen,
      count,
      subtotal,
      openCart,
      closeCart,
      addLine,
      addProduct,
      addCustomMat,
      setQuantity,
      removeLine,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
