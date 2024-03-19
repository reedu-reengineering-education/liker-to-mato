"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React, { useState } from "react";
import { SurveyPage } from "@/components/forms/student-survey-view";
import CreateAnswerDialog from "@/components/forms/create-answer-form";

export function Student({ params }: { params: { surveyId: string } }) {
  const [questioId] = useState<string>("");
  const handleAnswerCreated = () => {
    console.log("Answer succesful");
  };
  return (
    <main className="p-24">
      <Card>
        <CardContent>
          <CardHeader>
            <div className="space-y-6">
              <SurveyPage surveyId={params.surveyId} />
            </div>
          </CardHeader>

          <div className="space-y-6">
            <CreateAnswerDialog
              questionId={questioId}
              handleAnswerCreated={handleAnswerCreated}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Student;
