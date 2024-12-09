import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="py-16 flex flex-col items-center text-center"
    >
      <div className="space-y-4 mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">
            Seite nicht gefunden
          </h2>
        </div>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Entschuldigung, die von Ihnen gesuchte Seite konnte nicht gefunden
          werden. Möglicherweise wurde sie verschoben oder gelöscht.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline" size="lg">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Zur Startseite
          </Link>
        </Button>
      </div>
    </Container>
  );
}
