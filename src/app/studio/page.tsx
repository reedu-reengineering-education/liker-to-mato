"use client";

import { Container } from "@/components/ui/layout/Container";
import { Grid } from "@/components/ui/layout/Grid";
import { CreateSurveyDialog } from "@/components/forms/create-survey-form";
import { ListSurvey } from "@/components/forms/lists/surveyList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BarChart2, FileText, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateList } from "@/components/templates/TemplateList";
import { SurveyAnalytics } from "@/components/analytics/SurveyAnalytics";

export default function Studio() {
  return (
    <Container size="xl" className="py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Studio</h1>
            <p className="text-muted-foreground mt-2">
              Erstelle und verwalte deine Umfragen
            </p>
          </div>
          <CreateSurveyDialog />
        </div>

        <Tabs defaultValue="surveys" className="space-y-6">
          <TabsList>
            <TabsTrigger value="surveys">Meine Umfragen</TabsTrigger>
            <TabsTrigger value="templates">Vorlagen</TabsTrigger>
            <TabsTrigger value="analytics">Analysen</TabsTrigger>
          </TabsList>

          <TabsContent value="surveys" className="space-y-6">
            <Grid>
              <Card className="col-span-12">
                <CardHeader>
                  <CardTitle>Aktive Umfragen</CardTitle>
                  <CardDescription>
                    Verwalte deine laufenden Umfragen und siehe dir die
                    Ergebnisse an
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ListSurvey />
                </CardContent>
              </Card>
            </Grid>
          </TabsContent>

          <TabsContent value="templates">
            <TemplateList />
          </TabsContent>

          <TabsContent value="analytics">
            <SurveyAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
