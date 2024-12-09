import { NextResponse } from "next/server"
import { createPayment, getPayment } from "@/lib/mollie"

export async function POST(req: Request) {
  try {
    const { amount, description } = await req.json()

    const payment = await createPayment({
      amount,
      description,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mollie`,
    })

    return NextResponse.json({ url: payment.getCheckoutUrl() })
  } catch (error) {
    console.error("Error creating Mollie payment:", error)
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const paymentId = searchParams.get("id")

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      )
    }

    const payment = await getPayment(paymentId)
    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error getting Mollie payment:", error)
    return NextResponse.json(
      { error: "Failed to get payment" },
      { status: 500 }
    )
  }
}
