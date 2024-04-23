import React from "react";
import { CreateSurveyDialog } from "@/components/forms/create-survey-form";
import { ListSurvey } from "@/components/forms/lists/surveyList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Studio() {
  return (
    <main className="p-24">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <h4 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
                Meine Umfragen
              </h4>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListSurvey />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <h4 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
                Neue Umfrage erstellen
              </h4>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CreateSurveyDialog />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}







