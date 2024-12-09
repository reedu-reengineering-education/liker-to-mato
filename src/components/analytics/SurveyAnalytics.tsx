"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "@/components/ui/layout/Grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleLineChart from "@/components/ui/charts/SimpleLineChart";
import SimpleBarChart from "@/components/ui/charts/SimpleBarChart";
import SimplePieChart from "@/components/ui/charts/SimplePieChart";
import CustomBarChart from "@/components/ui/barchart";
import CustomPieChart from "@/components/ui/piechart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, BarChart, PieChart } from "lucide-react";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/layout/Container";
import { useToast } from "@/hooks/use-toast";
import { surveyQuestions } from "@/lib/api/surveyClient";
import { Question } from "@prisma/client";

interface SurveyAnalyticsProps {
  surveyId: string;
}

// Beispieldaten
const responseData = {
  daily: [
    { date: "2023-12-01", responses: 45 },
    { date: "2023-12-02", responses: 52 },
    { date: "2023-12-03", responses: 38 },
    { date: "2023-12-04", responses: 65 },
    { date: "2023-12-05", responses: 41 },
    { date: "2023-12-06", responses: 58 },
    { date: "2023-12-07", responses: 43 },
  ],
  questionTypes: [
    { type: "Likert", count: 45 },
    { type: "Multiple Choice", count: 30 },
    { type: "Text", count: 15 },
    { type: "Single Choice", count: 10 },
  ],
  completionRates: [
    { status: "Vollständig", count: 85 },
    { status: "Unvollständig", count: 15 },
  ],
};

export function SurveyAnalytics({ surveyId }: SurveyAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("7d");
  const [activeView, setActiveView] = useState("overview");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await surveyQuestions(surveyId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Fehler beim Laden der Fragen:", error);
        toast({
          title: "Fehler",
          description: "Die Fragen konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [surveyId, toast]);

  return (
    <Container>
      <div className="py-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Analytics Dashboard</CardTitle>
                <CardDescription>
                  Detaillierte Einblicke in Ihre Umfrageergebnisse
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Zeitraum wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Letzte 7 Tage</SelectItem>
                    <SelectItem value="30d">Letzte 30 Tage</SelectItem>
                    <SelectItem value="90d">Letzte 90 Tage</SelectItem>
                    <SelectItem value="all">Alle Zeit</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
            <TabsTrigger value="responses">Antworten</TabsTrigger>
            <TabsTrigger value="demographics">Demographie</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Gesamtantworten
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,853</div>
                  <p className="text-xs text-muted-foreground">
                    +12.3% gegenüber letztem Monat
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Durchschnittliche Zeit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2 Min</div>
                  <p className="text-xs text-muted-foreground">
                    -0.3 Min gegenüber letztem Monat
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Abschlussrate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.4%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% gegenüber letztem Monat
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Aktive Fragen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Keine Änderung
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <Card className="md:col-span-8">
                <CardHeader>
                  <CardTitle>Antworten über Zeit</CardTitle>
                  <CardDescription>
                    Tägliche Anzahl der Umfrageantworten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <SimpleLineChart
                      data={responseData.daily}
                      className="h-full w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Abschlussrate</CardTitle>
                  <CardDescription>
                    Verhältnis vollständiger zu unvollständigen Antworten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <SimplePieChart
                      data={responseData.completionRates}
                      className="h-full w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-12">
                <CardHeader>
                  <CardTitle>Fragetypen-Verteilung</CardTitle>
                  <CardDescription>
                    Verteilung der verschiedenen Fragetypen in der Umfrage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <SimpleBarChart
                      data={responseData.questionTypes}
                      className="h-full w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="md:col-span-6 lg:col-span-4">
                  <CardHeader>
                    <CardTitle className="text-base">Frage {index + 1}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {question.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="bar" className="w-full">
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="bar">
                          <BarChart className="w-4 h-4 mr-2" />
                          Balken
                        </TabsTrigger>
                        <TabsTrigger value="pie">
                          <PieChart className="w-4 h-4 mr-2" />
                          Kreis
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="bar" className="mt-2">
                        <div className="aspect-[4/3]">
                          <CustomBarChart
                            questionId={question.id}
                            questionName={question.name}
                            min={question.min}
                            max={question.max}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="pie" className="mt-2">
                        <div className="aspect-[4/3]">
                          <CustomPieChart
                            questionId={question.id}
                            questionName={question.name}
                            min={question.min}
                            max={question.max}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="demographics">
            <Card>
              <CardHeader>
                <CardTitle>Demographische Daten</CardTitle>
                <CardDescription>
                  Analyse der Teilnehmerdemographie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Demographische Analyse wird bald verfügbar sein...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
