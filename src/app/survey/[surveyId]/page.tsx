"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { StudentSurveyView } from "@/components/forms/student-survey-view";

export function Student({ params }: { params: { surveyId: string } }) {
  return (
    <main className="p-24">
      <Card>
        <CardContent>
          <CardHeader>
            <div className="space-y-6">
              <StudentSurveyView surveyId={params.surveyId} />
            </div>
          </CardHeader>
        </CardContent>
      </Card>
    </main>
  );
}

export default Student;
