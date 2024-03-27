import React, { useEffect, useState, useRef } from "react";
import { Question } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/20/solid";
import { surveyQuestions } from "@/lib/api/surveyClient";
import { deleteQuestion } from "@/lib/api/questionClient";
import CreateQuestionDialog from "../create-question-form";
import EditQuestionDialog from "@/components/buttons/edit-question-button";

export function ListQuestions({ surveyId }: { surveyId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const loadQuestionsRef = useRef(() => {});

  loadQuestionsRef.current = () => {
    surveyQuestions(surveyId)
      .then(setQuestions)
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    loadQuestionsRef.current();
  }, [surveyId]);

  useEffect(() => {
    surveyQuestions(surveyId)
      .then(setQuestions)
      .catch((error) => console.error(error));
  }, [surveyId]);

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion(questionId);
      setQuestions((questions) =>
        questions.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.error("Error when deleting the question:", error);
    }
  };

  const onQuestionCreated = () => {
    loadQuestionsRef.current();
  };

  return (
    <div>
      <CreateQuestionDialog
        surveyId={surveyId}
        handleQuestionCreated={onQuestionCreated}
      />
      <div>
        {questions.map((question) => (
          <div
            key={question.id}
            className="mt-4 p-4 shadow rounded-lg bg-white"
          >
            <li className="mb-4 text-lg font-semibold"></li>
            <p className="mb-4 text-lg font-semibold">{question.name}</p>
            <p className="mb-4 text-lg font-semibold">
              {" "}
              {question.description}
            </p>
            <p className="mb-4 text-lg font-semibold"> {question.max}</p>
            <p className="mb-4 text-lg font-semibold"> {question.steps}</p>
            <p className="mb-4 text-lg font-semibold"> {question.min}</p>
            <div className="flex space-x-2 mt-3">
              <EditQuestionDialog
                question={question}
                surveyId={surveyId}
                handleQuestionUpdated={onQuestionCreated}
              />

              <Button
                variant="destructive"
                onClick={() => handleDelete(question.id)}
              >
                <TrashIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
