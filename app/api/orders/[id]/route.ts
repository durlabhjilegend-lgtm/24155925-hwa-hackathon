import { NextResponse } from "next/server";
import { findOrder } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const order = findOrder(params.id);

  if (!order) {
    return NextResponse.json(
      {
        ok: false,
        error: "Order not found on this instance. Keep the order number from your confirmation and contact us if needed.",
      },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { ok: true, order },
    { headers: { "Cache-Control": "no-store" } }
  );
}
