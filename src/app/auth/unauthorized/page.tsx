"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <Shield className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Zugriff verweigert
        </h1>
        <p className="text-gray-600 mb-6">
          Sie haben keine Berechtigung, auf diese Seite zuzugreifen. Bitte
          melden Sie sich mit einem Konto an, das über die erforderlichen
          Berechtigungen verfügt.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full"
          >
            Zurück zur Startseite
          </Button>
          <Button
            onClick={() => router.push("/auth/signin")}
            className="w-full"
          >
            Anmelden
          </Button>
        </div>
      </div>
    </div>
  );
}
