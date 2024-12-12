export type QuestionType = 'likert' | 'text' | 'multiple' | 'single';

export interface Question {
  id: string;
  type: QuestionType;
  name: string;
  description: string;
  text: string;
  required: boolean;
  options?: string[];
  scale?: number; // Für Likert-Skala
  position: number;
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
