import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your nest",
  description: "Review your WILDNEST cart, adjust quantities and continue to checkout.",
};

export default function CartPage() {
  return <CartView />;
}
