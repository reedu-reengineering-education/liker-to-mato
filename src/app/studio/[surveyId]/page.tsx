 feat/create-survey-list-for-users
import React from "react";
import { ListQuestions } from "@/components/forms/lists/questionList";
import { EditSurveyName } from "@/components/buttons/edit-survey-option";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function Studio({ params }: { params: { surveyId: string } }) {
  return (
    <main className="p-24">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <EditSurveyName surveyId={params.surveyId} />
            </CardTitle>
            <CardFooter></CardFooter>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <ListQuestions surveyId={params.surveyId} />
          </CardContent>
        </Card>
      </div>
    </main>
  );

}





