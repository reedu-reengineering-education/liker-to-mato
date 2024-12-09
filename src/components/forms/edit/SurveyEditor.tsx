"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Grid } from "@/components/ui/layout/Grid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PlusCircle, GripVertical, Trash2, Settings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Question } from "@/types/templates";
import { useToast } from "@/hooks/use-toast";

interface SurveyEditorProps {
  surveyId: string;
  initialQuestions?: Question[];
  onSave?: (questions: Question[]) => void;
}

export function SurveyEditor({
  surveyId,
  initialQuestions = [],
  onSave,
}: SurveyEditorProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`/api/surveys/${surveyId}/questions`);
        if (!response.ok) throw new Error("Failed to load questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Fehler",
          description: "Die Fragen konnten nicht geladen werden.",
          variant: "destructive",
        });
      }
    };

    loadQuestions();
  }, [surveyId]);

  const saveQuestions = async (updatedQuestions: Question[]) => {
    try {
      const response = await fetch(`/api/surveys/${surveyId}/questions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestions),
      });

      if (!response.ok) throw new Error("Failed to save questions");

      toast({
        title: "Erfolg",
        description: "Die Änderungen wurden gespeichert.",
      });

      onSave?.(updatedQuestions);
    } catch (error) {
      console.error("Error saving questions:", error);
      toast({
        title: "Fehler",
        description: "Die Änderungen konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      type: "likert",
      text: "",
      required: true,
      scale: 5,
    };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setEditingQuestion(newQuestion);
    saveQuestions(updatedQuestions);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
    setEditingQuestion(null);
    saveQuestions(updatedQuestions);
  };

  const deleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
    saveQuestions(items);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Umfrage bearbeiten</CardTitle>
              <CardDescription>
                Erstelle und organisiere deine Fragen durch Drag & Drop
              </CardDescription>
            </div>
            <Button onClick={addQuestion} size="lg">
              <PlusCircle className="mr-2 h-5 w-5" />
              Neue Frage
            </Button>
          </div>
        </CardHeader>
      </Card>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-all duration-200 ${
                        snapshot.isDragging ? "scale-[1.02] shadow-lg" : ""
                      }`}
                    >
                      <Card className="border-2 hover:border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div className="flex items-center space-x-4">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-move p-2 hover:bg-muted rounded-md transition-colors"
                            >
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-base font-medium">
                                Frage {index + 1}
                              </CardTitle>
                              <CardDescription className="mt-1 line-clamp-1">
                                {question.text || "Keine Frage eingegeben"}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center space-x-2"
                                  onClick={() => setEditingQuestion(question)}
                                >
                                  <Settings2 className="h-4 w-4" />
                                  <span>Bearbeiten</span>
                                </Button>
                              </DialogTrigger>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => deleteQuestion(question.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {questions.length === 0 && (
                <Card className="border-dashed">
                  <CardHeader className="flex flex-col items-center justify-center py-8">
                    <CardDescription>
                      Noch keine Fragen vorhanden. Klicke auf "Neue Frage" um zu
                      beginnen.
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingQuestion && (
        <Dialog
          open={!!editingQuestion}
          onOpenChange={() => setEditingQuestion(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Frage bearbeiten</DialogTitle>
              <DialogDescription>
                Passe die Eigenschaften der Frage an
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fragetext</label>
                <Textarea
                  value={editingQuestion.text}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      text: e.target.value,
                    })
                  }
                  placeholder="Gib hier deine Frage ein..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fragetyp</label>
                <Select
                  value={editingQuestion.type}
                  onValueChange={(value: any) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="likert">Likert-Skala</SelectItem>
                    <SelectItem value="text">Textantwort</SelectItem>
                    <SelectItem value="multiple">Multiple Choice</SelectItem>
                    <SelectItem value="single">Single Choice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Pflichtfeld</label>
                <Switch
                  checked={editingQuestion.required}
                  onCheckedChange={(checked) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      required: checked,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingQuestion(null)}
              >
                Abbrechen
              </Button>
              <Button onClick={() => updateQuestion(editingQuestion)}>
                Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
