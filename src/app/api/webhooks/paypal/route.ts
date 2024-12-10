import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const paypalWebhookId = process.env.PAYPAL_WEBHOOK_SECRET;

    // Verify the webhook signature (optional but recommended)
    const paypalSignature = headersList.get('paypal-transmission-sig');
    const paypalCertUrl = headersList.get('paypal-cert-url');
    const paypalTransmissionId = headersList.get('paypal-transmission-id');
    const paypalTransmissionTime = headersList.get('paypal-transmission-time');

    const event = await req.json();

    // Handle different event types
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Payment was captured successfully
        const paymentId = event.resource.id;
        const orderId = event.resource.supplementary_data.related_ids.order_id;

        // Here you can update your database, send confirmation emails, etc.
        console.log(`Payment ${paymentId} for order ${orderId} was successful`);
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        // Payment was denied
        console.log('Payment was denied:', event.resource.id);
        break;

      // Add more cases as needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}
