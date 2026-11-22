import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your WILDNEST order confirmation.",
  robots: { index: false, follow: false },
};

export default function OrderPage({ params }: { params: { id: string } }) {
  return <OrderConfirmation id={params.id} />;
}
