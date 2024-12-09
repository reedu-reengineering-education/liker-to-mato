"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}

function ErrorContent() {
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
        {error === "Configuration" && (
          <>
            Es gab ein Problem mit der Authentifizierungskonfiguration.
            Bitte kontaktieren Sie den Administrator.
          </>
        )}
        {error === "AccessDenied" && (
          <>
            Der Zugriff wurde verweigert.
            Sie haben keine Berechtigung, auf diese Ressource zuzugreifen.
          </>
        )}
        {error === "Verification" && (
          <>
            Der Verifizierungslink ist ungültig oder wurde bereits verwendet.
            Bitte fordern Sie einen neuen Link an.
          </>
        )}
        {error && error !== "Configuration" && error !== "AccessDenied" && error !== "Verification" && (
          <p>
            Bitte versuchen Sie es erneut oder kontaktieren Sie den Support, wenn
            das Problem weiterhin besteht.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
