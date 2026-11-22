"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "@/lib/catalog";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "btn-primary w-full",
  label = "Add to nest",
  disabled = false,
}: {
  product: Product;
  quantity?: number;
  className?: string;
  label?: string;
  disabled?: boolean;
}) {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={() => {
        addProduct(product, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
      aria-label={`${label}: ${product.name}`}
    >
      {added ? (
        <>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Added to nest
        </>
      ) : (
        label
      )}
    </button>
  );
}
