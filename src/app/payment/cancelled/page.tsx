"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function PaymentCancelledPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 text-center space-y-6">
        <div className="flex justify-center">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold">Zahlung abgebrochen</h1>
        <p className="text-muted-foreground">
          Die Zahlung wurde abgebrochen. Keine Sorge, es wurde nichts berechnet.
        </p>
        <div className="space-y-4">
          <Button onClick={() => router.push("/pricing")} className="w-full">
            Zurück zur Preisübersicht
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/support")}
            className="w-full"
          >
            Support kontaktieren
          </Button>
        </div>
      </Card>
    </div>
  );
}
