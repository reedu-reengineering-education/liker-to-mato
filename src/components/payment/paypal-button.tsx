'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Check } from 'lucide-react';

interface PayPalButtonProps {
  amount: number;
  planId?: string;
  planName?: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

export function PayPalButton({
  amount,
  planId,
  planName = 'Premium',
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async (data: any, actions: any) => {
    try {
      setIsProcessing(true);
      const details = await actions.order.capture();

      if (planId) {
        const response = await fetch('/api/plans/activate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId,
            paymentDetails: details,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to activate plan');
        }
      }

      toast({
        title: 'Zahlung erfolgreich',
        description: 'Dein Plan wurde erfolgreich aktiviert!',
      });

      setIsProcessing(false);
      setIsOpen(false);
      onSuccess?.(details);
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      toast({
        title: 'Fehler',
        description: 'Die Zahlung konnte nicht abgeschlossen werden.',
        variant: 'destructive',
      });
      onError?.(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Jetzt upgraden
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-gradient-to-b from-white to-gray-50">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Upgrade auf {planName}
          </DialogTitle>
          <div className="text-center space-y-2 mb-4">
            <p className="text-4xl font-bold text-blue-600">
              €{amount}
              <span className="text-base font-normal text-gray-500">/Monat</span>
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="text-gray-600">Sofortiger Zugang zu allen Features</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="text-gray-600">Sichere Zahlung mit PayPal</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="text-gray-600">Jederzeit kündbar</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 pt-0">
          <AnimatePresence>
            {isProcessing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                  <p className="text-gray-600">Verarbeite Zahlung...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg overflow-hidden"
              >
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    currency: 'EUR',
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'blue',
                      shape: 'rect',
                      label: 'pay',
                    }}
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
                    onApprove={handleApprove}
                    onError={(err) => {
                      console.error('PayPal error:', err);
                      toast({
                        title: 'Fehler',
                        description: 'Es gab einen Fehler mit PayPal.',
                        variant: 'destructive',
                      });
                      onError?.(err);
                    }}
                  />
                </PayPalScriptProvider>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-center text-gray-500 mt-4">
            Mit deiner Zahlung akzeptierst du unsere Nutzungsbedingungen und Datenschutzerklärung.
            Du kannst dein Abonnement jederzeit in deinen Kontoeinstellungen kündigen.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
