"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Survey, Question, Answer } from "@prisma/client";
import CreateAnswerDialog from "./create-answer-form";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function StudentSurveyView({ surveyId }: { surveyId: string }) {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const progress =
    questions.length > 0
      ? (Object.keys(answers).length / questions.length) * 100
      : 0;

  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) return;

      setIsLoading(true);
      try {
        // Fetch survey data
        const surveyResponse = await axios.get(`/api/survey/${surveyId}`);
        if (!surveyResponse.data) {
          throw new Error("Survey not found");
        }
        setSurvey(surveyResponse.data);

        // Fetch questions
        const questionsResponse = await axios.get(
          `/api/question/survey/${surveyId}`,
        );
        setQuestions(questionsResponse.data || []);

        // Fetch existing answers
        const answersResponse = await axios.get(
          `/api/answer/question/${surveyId}`,
        );
        const answersMap = (answersResponse.data || []).reduce(
          (acc: Record<string, Answer>, answer: Answer) => {
            acc[answer.questionId] = answer;
            return acc;
          },
          {},
        );
        setAnswers(answersMap);
      } catch (error) {
        console.error("Error fetching survey data:", error);
        toast({
          title: "Fehler",
          description:
            "Die Umfragedaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyData();
  }, [surveyId, toast]);

  const handleAnswerSubmit = async (questionId: string, answer: Answer) => {
    try {
      const response = await axios.post(`/api/answer`, {
        questionId,
        value: answer.value,
      });

      setAnswers((prev) => ({
        ...prev,
        [questionId]: response.data,
      }));

      toast({
        title: "Erfolg",
        description: "Ihre Antwort wurde gespeichert.",
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast({
        title: "Fehler",
        description: "Ihre Antwort konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  const handleSurveySubmit = async () => {
    if (questions.length !== Object.keys(answers).length) {
      toast({
        title: "Achtung",
        description:
          "Bitte beantworten Sie alle Fragen, bevor Sie die Umfrage abschließen.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Zeige eine "Wird gespeichert" Nachricht
      toast({
        title: "Wird gespeichert",
        description: "Ihre Antworten werden gespeichert...",
      });

      // Sende alle Antworten an den Server
      const answersArray = Object.values(answers);
      await axios.post(`/api/answer/survey/${surveyId}/submit`, {
        answers: answersArray,
        surveyId: surveyId,
      });

      // Aktualisiere die Statistiken
      await axios.post(`/api/survey/${surveyId}/stats/update`);

      toast({
        title: "Erfolg",
        description:
          "Vielen Dank! Ihre Antworten wurden erfolgreich gespeichert.",
      });

      // Warte kurz, bevor zur Bestätigungsseite weitergeleitet wird
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Weiterleitung zur Bestätigungsseite mit sanftem Übergang
      document.body.style.opacity = "0";
      document.body.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        window.location.href = "/surveys/completed";
      }, 500);
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast({
        title: "Fehler",
        description:
          "Beim Speichern Ihrer Antworten ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
      document.body.style.opacity = "1";
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="text-center py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Umfrage nicht gefunden</AlertTitle>
          <AlertDescription>
            Die angeforderte Umfrage konnte nicht gefunden werden.
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Zurück
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{survey.name}</CardTitle>
          <CardDescription>
            Bitte beantworten Sie alle Fragen der Umfrage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Fortschritt</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {questions.length > 0 ? (
        questions.map((question) => (
          <Card
            key={question.id}
            className={answers[question.id] ? "border-green-200" : ""}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{question.name}</CardTitle>
                {answers[question.id] && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{question.description}</p>
              <CreateAnswerDialog
                questionId={question.id}
                steps={question.steps}
                min={question.min}
                max={question.max}
                questionText={question.name}
                onAnswerSubmit={handleAnswerSubmit}
                initialValue={answers[question.id]?.value}
              />
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-lg font-semibold text-gray-700">
              Keine Fragen verfügbar
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {Object.keys(answers).length} von {questions.length} Fragen
          beantwortet
        </div>
        <Button
          onClick={handleSurveySubmit}
          disabled={
            isSubmitting || questions.length !== Object.keys(answers).length
          }
        >
          {isSubmitting ? "Wird gespeichert..." : "Umfrage abschließen"}
        </Button>
      </div>
    </div>
  );
}

export default StudentSurveyView;
