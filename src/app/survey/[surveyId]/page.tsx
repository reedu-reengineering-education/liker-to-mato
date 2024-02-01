import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Slider } from "@/components/ui/slider";
import React from "react";
import { SurveyPage } from "@/components/forms/student-survey-view";

export function Student({ params }: { params: { surveyId: string } }) {
  return (
    <main className="p-24">
      <div className="space-y-6">
        <SurveyPage surveyId={params.surveyId} />
      </div>
    </main>
  );
}

export default Student;
