import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
      {/* <p className="mb-4 text-lg font-semibold">{survey.name}</p> */}

      <div>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.id} className="">
              <p className="mb-4 text-lg font-extrabold ">{question.name}</p>
              <CardContent className="text-lg font-semibold">
                {question.description}
              </CardContent>
              <div className="space-y-6">
                <CreateAnswerDialog
                  questionId={question.id}
                  steps={question.steps}
                  min={question.min}
                  max={question.max}
                />
              </div>
              <div className="space-y-6"></div>
            </div>
          ))
        ) : (
          <p>No questions</p>
        )}
      </div>
    </div>
  );
}

export default StudentSurveyView;
