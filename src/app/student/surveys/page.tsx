import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Verfügbare Umfragen",
  description: "Übersicht aller verfügbaren Umfragen für Studenten",
};

async function getAvailableSurveys() {
  try {
    return await prisma.survey.findMany({
      where: {
        status: "active",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return [];
  }
}

export default async function StudentSurveysPage() {
  const surveys = await getAvailableSurveys();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Verfügbare Umfragen
          </h1>
          <p className="text-muted-foreground mt-2">
            Hier finden Sie alle aktuell verfügbaren Umfragen. Wählen Sie eine
            Umfrage aus, um teilzunehmen.
          </p>
        </div>

        {surveys.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <Card key={survey.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{survey.name}</CardTitle>
                  <CardDescription>
                    Erstellt am{" "}
                    {new Date(survey.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <div className="p-6 pt-0">
                  <Link href={`/student/survey/${survey.id}`}>
                    <Button className="w-full gap-2">
                      Teilnehmen
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Keine Umfragen verfügbar</CardTitle>
              <CardDescription>
                Zurzeit sind keine aktiven Umfragen verfügbar. Bitte versuchen
                Sie es später erneut.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
