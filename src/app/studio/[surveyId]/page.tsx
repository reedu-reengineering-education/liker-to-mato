// path: src/app/studio/%5BsurveyId%5D/page.tsx
"use client";

import React from "react";
import { SurveyEditor } from "@/components/forms/edit/SurveyEditor";
import { SurveyAnalytics } from "@/components/analytics/SurveyAnalytics";
import { EditSurveyName } from "@/components/buttons/edit-survey-option";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/layout/Container";

export default function Studio({ params }: { params: { surveyId: string } }) {
  return (
    <Container>
      <div className="py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <EditSurveyName surveyId={params.surveyId} />
            </CardTitle>
          </CardHeader>
        </Card>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Umfrage bearbeiten</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-0">
            <SurveyEditor surveyId={params.surveyId} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <SurveyAnalytics surveyId={params.surveyId} />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Einstellungen werden bald verfügbar sein...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
