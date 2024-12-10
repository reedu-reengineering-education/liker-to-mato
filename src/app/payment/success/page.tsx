'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Hier können wir die Subscription im Backend aktualisieren
    // und den User-Status synchronisieren
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold">Zahlung erfolgreich!</h1>
        <p className="text-muted-foreground">
          Vielen Dank für Ihren Einkauf. Ihr Account wurde erfolgreich aktualisiert.
        </p>
        <div className="space-y-4">
          <Button onClick={() => router.push('/dashboard')} className="w-full">
            Zum Dashboard
          </Button>
          <Button variant="outline" onClick={() => router.push('/account')} className="w-full">
            Account-Einstellungen
          </Button>
        </div>
      </Card>
    </div>
  );
}
