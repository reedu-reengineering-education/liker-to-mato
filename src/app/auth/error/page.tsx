"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams ? searchParams.get("error") : "Unbekannter Fehler";

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Authentifizierungsfehler</CardTitle>
        <CardDescription>
          Es ist ein Fehler bei der Anmeldung aufgetreten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Fehlermeldung: {error}</p>
        <p>
          Bitte versuchen Sie es erneut oder kontaktieren Sie den Support, wenn
          das Problem weiterhin besteht.
        </p>
      </CardContent>
    </Card>
  );
}
