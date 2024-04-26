import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function About() {
  return (
    <main className="p-24">
      <Card>
        <CardHeader>
          <h1 className="text-2xl lg:text-3xl font-bold text-center mb-4">
            Likert-to-Mat - Die perfekte App zur Umfrageerstellung für
            Vorlesungsinhalte
          </h1>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            Likert-to-Mat ist die ideale Anwendung für Pädagogen, Dozenten und
            Kursleiter, die hochwertige Umfragen zur Bewertung von
            Vorlesungsinhalten erstellen möchten. Mit unserer
            benutzerfreundlichen und leistungsstarken Plattform können Sie in
            wenigen Schritten detaillierte Umfragen erstellen, um das Feedback
            und die Meinungen Ihrer Studenten zu erfassen.
          </CardDescription>
          <div className="mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Hauptmerkmale:</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Anpassbare Likert-Skalen: Erstellen Sie Umfragen, die auf der
                Likert-Skala basieren, und passen Sie die Antwortmöglichkeiten
                an, um genau die Informationen zu sammeln, die Sie benötigen.
              </li>
              <li>
                Multimedia-Integration: Fügen Sie Bilder, Videos und andere
                Medien in Ihre Umfragen ein, um den Lernprozess zu bereichern
                und präzises Feedback zu erhalten.
              </li>
              <li>
                Zeitgesteuerte Umfragen: Legen Sie Zeitpläne fest, um Umfragen
                automatisch zu starten und zu beenden, und verfolgen Sie die
                Ergebnisse in Echtzeit.
              </li>
              <li>
                Analytik und Berichte: Nutzen Sie leistungsstarke
                Analysewerkzeuge, um die Umfrageergebnisse zu verstehen und
                Muster in den Daten zu erkennen.
              </li>
              <li>
                Benutzerfreundliche Oberfläche: Unsere App wurde entwickelt, um
                die Erstellung und Verwaltung von Umfragen so einfach wie
                möglich zu gestalten, sodass Sie Zeit sparen und sich auf das
                Wesentliche konzentrieren können.
              </li>
            </ul>
          </div>
          <div>
            <CardDescription>
              Mit Likert-to-Mat können Sie wertvolle Einblicke in die Lehr- und
              Lernprozesse gewinnen, Ihre Vorlesungsinhalte kontinuierlich
              verbessern und auf die Bedürfnisse Ihrer Studenten eingehen.
              Beginnen Sie noch heute und optimieren Sie Ihre
              Unterrichtsmethoden mit präzisem Feedback dank Likert-to-Mat.
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
