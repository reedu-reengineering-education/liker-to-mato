import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Dialog } from "../ui/dialog";
import { Slider } from "../ui/slider";

import { Survey, Question } from "@prisma/client";
import CreateAnswerDialog from "./create-answer-form";

export function StudentSurveyView({ surveyId }: { surveyId: string }) {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (surveyId) {
      axios
        .get(`/api/survey/${surveyId}`)
        .then((response) => {
          setSurvey(response.data);
        })
        .catch((error) => {
          console.error("Error requesting the survey data", error);
        });
    }
  }, [surveyId]);

  useEffect(() => {
    if (surveyId) {
      axios
        .get(`/api/question/survey/${surveyId}`)
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error("Error requesting the survey data", error);
        });
    }
  }, [surveyId]);

  if (!surveyId || !survey) {
    return <div>Loading survey data...</div>;
  } else if (!questions) {
    return <div>Loading questions data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="mb-4 text-lg font-semibold">{survey.name}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription></CardDescription>
          <div>
            {questions.length > 0 ? (
              questions.map((question) => (
                <div key={question.id} className="">
                  <p className="mb-4 text-lg font-semibold">
                    {question.name},{question.description},{question.min},
                    {question.steps},{question.max}
                  </p>
                  <div className="space-y-6">
                    <CreateAnswerDialog questionId={question.id} />
                  </div>
                </div>
              ))
            ) : (
              <p>No questions</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentSurveyView;
