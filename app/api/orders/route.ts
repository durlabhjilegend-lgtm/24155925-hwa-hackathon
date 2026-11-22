import { NextResponse } from "next/server";
import { orderCount, saveOrder, validateOrder } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Send a JSON body with items, customer and delivery." },
      { status: 400 }
    );
  }

  const result = validateOrder(body);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Order validation failed. Please check the highlighted fields.",
        issues: result.issues,
      },
      { status: 422 }
    );
  }

  saveOrder(result.order);

  return NextResponse.json(
    {
      ok: true,
      order: result.order,
      message: `Order ${result.order.id} confirmed.`,
    },
    { status: 201, headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "WILDNEST order API",
      description:
        "POST a JSON order to this endpoint. Orders are validated and priced on the server, stored, and returned with a WILDNEST order number.",
      endpoints: {
        create: "POST /api/orders",
        retrieve: "GET /api/orders/{orderId}",
      },
      ordersReceived: orderCount(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
