import { NextResponse } from "next/server";
import { createOrder, capturePayment } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const order = await createOrder(amount);
    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { orderId } = await request.json();
    const captureData = await capturePayment(orderId);
    return NextResponse.json(captureData);
  } catch (error) {
    console.error("Error capturing PayPal payment:", error);
    return NextResponse.json(
      { error: "Failed to capture payment" },
      { status: 500 },
    );
  }
}
