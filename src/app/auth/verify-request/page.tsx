import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VerifyRequest() {
  return (
    <Container size="sm" className="py-16 flex flex-col items-center">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Fast geschafft!
        </h1>
        <p className="text-muted-foreground">
          Wir haben Ihnen einen sicheren Anmeldelink zugesendet
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Überprüfen Sie Ihre E-Mails</CardTitle>
          <CardDescription>
            Ein Anmeldelink wurde an Ihre E-Mail-Adresse gesendet. Klicken Sie
            auf den Link in der E-Mail, um sich anzumelden.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Tipps:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • Der Link ist aus Sicherheitsgründen nur 10 Minuten gültig
              </li>
              <li>• Überprüfen Sie auch Ihren Spam-Ordner</li>
              <li>
                • Stellen Sie sicher, dass Sie die richtige E-Mail-Adresse
                angegeben haben
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/auth/signin" className="w-full">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Anmeldung
            </Button>
          </Link>
          <p className="text-sm text-center text-muted-foreground">
            Benötigen Sie Hilfe?{" "}
            <Link href="/support" className="text-primary hover:underline">
              Kontaktieren Sie uns
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Container>
  );
}
