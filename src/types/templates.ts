export type QuestionType = "likert" | "text" | "multiple" | "single";

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[];
  scale?: number; // Für Likert-Skala
}

export interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}
