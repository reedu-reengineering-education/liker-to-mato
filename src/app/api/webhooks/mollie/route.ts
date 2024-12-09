import { NextResponse } from "next/server"
import { getPayment } from "@/lib/mollie"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const paymentId = data.id

    const payment = await getPayment(paymentId)

    // Hier kannst du je nach Zahlungsstatus verschiedene Aktionen ausführen
    switch (payment.status) {
      case "paid":
        // Zahlung war erfolgreich
        console.log(`Payment ${paymentId} was successful`)
        // Hier könntest du z.B. die Datenbank aktualisieren
        break
      case "failed":
        // Zahlung ist fehlgeschlagen
        console.log(`Payment ${paymentId} failed`)
        break
      case "expired":
        // Zahlung ist abgelaufen
        console.log(`Payment ${paymentId} expired`)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing Mollie webhook:", error)
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    )
  }
}
