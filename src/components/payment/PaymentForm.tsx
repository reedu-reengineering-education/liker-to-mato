'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/ui/icons';

// Stripe Promise initialisieren
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  amount: number;
  planId: string;
  interval: 'monthly' | 'yearly';
}

export function PaymentForm({ amount, planId, interval }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStripePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: planId,
          interval,
          paymentMethod: 'stripe',
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Die Zahlung konnte nicht initiiert werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalPayment = async (data: any) => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: planId,
          interval,
          paymentMethod: 'paypal',
          paypalOrderId: data.orderID,
        }),
      });

      if (!response.ok) {
        throw new Error('PayPal payment failed');
      }

      toast({
        title: 'Erfolg',
        description: 'Die Zahlung wurde erfolgreich verarbeitet.',
      });
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Die PayPal-Zahlung konnte nicht verarbeitet werden.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Zahlungsmethode auswählen</CardTitle>
        <CardDescription>Wählen Sie Ihre bevorzugte Zahlungsmethode</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stripe" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stripe">
              <Icons.stripe className="mr-2 h-4 w-4" />
              Kreditkarte
            </TabsTrigger>
            <TabsTrigger value="paypal">
              <Icons.paypal className="mr-2 h-4 w-4" />
              PayPal
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stripe">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">
                  Sie werden zu Stripe weitergeleitet, um die Zahlung sicher abzuschließen.
                </div>
              </div>
              <Button onClick={handleStripePayment} className="w-full" disabled={loading}>
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {amount}€ mit Stripe zahlen
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="paypal">
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: 'EUR',
              }}
            >
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount.toString(),
                          currency_code: 'EUR',
                        },
                      },
                    ],
                    intent: 'CAPTURE',
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order!.capture().then((details) => {
                    handlePayPalPayment(data);
                  });
                }}
              />
            </PayPalScriptProvider>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icons.lock className="h-4 w-4" />
          <span>Sichere Zahlung via Stripe & PayPal</span>
        </div>
      </CardFooter>
    </Card>
  );
}
