import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SurveyCompletedPage() {
  return (
    <div className="container max-w-2xl py-20">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Vielen Dank für Ihre Teilnahme!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Ihre Antworten wurden erfolgreich gespeichert.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Wir schätzen Ihre Beteiligung an dieser Umfrage. Ihre Rückmeldung ist für uns sehr
            wertvoll und hilft uns dabei, unsere Dienstleistungen kontinuierlich zu verbessern.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard">
            <Button variant="default" className="w-full sm:w-auto">
              Zum Dashboard
            </Button>
          </Link>
          <Link href="/student/surveys">
            <Button variant="outline" className="w-full sm:w-auto">
              Weitere Umfragen anzeigen
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
