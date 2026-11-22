import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Add your customer and delivery details to place a WILDNEST order.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
