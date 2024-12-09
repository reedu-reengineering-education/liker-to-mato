import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

// Diese Funktion erstellt einen PayPal-Client basierend auf dem Environment
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be defined"
    );
  }

  return process.env.PAYPAL_MODE === "live"
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

// PayPal-Client für Server-seitige Calls
export const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
};

// Formatiert den Preis für PayPal (z.B. "10.99" -> "10.99")
export function formatPrice(amount: number): string {
  return amount.toFixed(2);
}

// Erstellt eine neue Bestellung
export async function createOrder(amount: number) {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: formatPrice(amount),
        },
      },
    ],
  });

  const order = await client().execute(request);
  return order.result;
}

// Erfasst eine Zahlung
export async function capturePayment(orderId: string) {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  const response = await client().execute(request);
  return response.result;
}
