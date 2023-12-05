"use client";
import React, { useEffect, useState } from "react";
import { Question } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/20/solid";
import { surveyQuestions } from "@/lib/api/surveyClient";
import { deleteQuestion } from "@/lib/api/questionClient";

export function ListQuestions({ surveyId }: { surveyId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    surveyQuestions(surveyId)
      .then(setQuestions)
      .catch((error) => console.error(error));
  }, [surveyId]);

  const handleEdit = (questionId: string) => {
    // Logik für das Bearbeiten einer Frage
  };

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion(questionId);
      setQuestions((questions) =>
        questions.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.error("Fehler beim Löschen der Frage:", error);
    }
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id} className="mt-4 p-4 shadow rounded-lg bg-white">
          <li className="mb-4 text-lg font-semibold"></li>
          <p className="mb-4 text-lg font-semibold">{question.name}</p>
          <p className="mb-4 text-lg font-semibold"> {question.description}</p>
          <p className="mb-4 text-lg font-semibold"> {question.max}</p>
          <p className="mb-4 text-lg font-semibold"> {question.steps}</p>
          <p className="mb-4 text-lg font-semibold"> {question.min}</p>
          <div className="flex space-x-2 mt-3">
            <Button variant="outline" onClick={() => handleEdit(question.id)}>
              <PencilIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Edit
            </Button>
            <Button variant="outline">
              <PlusIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Edit
            </Button>
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
  );
}
