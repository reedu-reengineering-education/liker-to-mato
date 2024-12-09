"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Question } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Trash, Edit, Code, MoreVertical } from "lucide-react";
import { surveyQuestions } from "@/lib/api/surveyClient";
import { deleteQuestion } from "@/lib/api/questionClient";
import CreateQuestionDialog from "../create-question-form";
import EditQuestionDialog from "@/components/buttons/edit-question-button";

export function ListQuestions({ surveyId }: { surveyId: string }) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedQuestions = await surveyQuestions(surveyId);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [surveyId, toast]);

  useEffect(() => {
    loadQuestions();
  }, [surveyId, loadQuestions]);

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion(questionId);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId),
      );
      toast({
        title: "Question deleted",
        description: "The question has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error when deleting the question:", error);
      toast({
        title: "Error",
        description: "Failed to delete the question. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onQuestionCreated = () => {
    loadQuestions();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-[300px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <CreateQuestionDialog
          surveyId={surveyId}
          handleQuestionCreated={onQuestionCreated}
        />
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {questions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle>{question.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {question.description}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
              <div>Min: {question.min}</div>
              <div>Max: {question.max}</div>
              <div>Steps: {question.steps}</div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <EditQuestionDialog
              question={question}
              surveyId={surveyId}
              handleQuestionUpdated={onQuestionCreated}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Embed clicked")}>
                  <Code className="mr-2 h-4 w-4" />
                  Embed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(question.id)}
                  className="text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
