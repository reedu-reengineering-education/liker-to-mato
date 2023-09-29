"use client";
import axios from "axios";
import { createQuestion } from "@/lib/api/questionClient";
import { Question } from "@prisma/client"; // Importieren Sie die Question-Struktur
import { useState } from "react";
export type partialQuestion = Pick<
  Question,
  "name" | "description" | "min" | "steps" | "max"
>;

export interface FormProps {
  questionData: partialQuestion;
  setQuestionData: React.Dispatch<React.SetStateAction<partialQuestion>>;
  handleSave: () => Promise<void>;
}

export function useForm(initialState: partialQuestion): FormProps {
  const [questionData, setQuestionData] =
    useState<partialQuestion>(initialState);

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/question", questionData);
      console.log("Frage erfolgreich erstellt:", response.data);
    } catch (error) {
      console.error("Fehler beim Erstellen der Frage:", error);
    }
  };

  return {
    questionData,
    setQuestionData,
    handleSave,
  };
}
