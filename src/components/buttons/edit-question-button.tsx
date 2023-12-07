import { updateQuestion } from "@/lib/api/questionClient";
import { Question as QuestionData } from "@prisma/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PencilIcon } from "@heroicons/react/20/solid";

type EditQuestionProps = {
  surveyId: string;
  question: QuestionData;
  handleQuestionUpdated: () => void;
};

export function EditQuestionDialog(props: EditQuestionProps) {
  const [name, setName] = useState<string>(props.question.name);
  const [description, setDescription] = useState<string>(
    props.question.description
  );
  const [min, setMinimum] = useState<string>(props.question.min);
  const [steps, setStep] = useState<number | undefined>(props.question.steps);
  const [max, setMaximum] = useState<string>(props.question.max);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // ... (weitere Zustandsvariablen für min, max, steps)

  const onSubmitEdit = async () => {
    // Logik zum Senden der aktualisierten Frage an den Server
    try {
      await updateQuestion(
        props.question.id,
        props.question.name,
        props.question.description,
        props.question.min,
        props.question.steps,
        props.question.max,
        props.surveyId
      );
      console.log("Question updated");
      props.handleQuestionUpdated();
    } catch (error) {
      console.error("Error when updating the question:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        <Button variant="outline">
          <PencilIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Frage bearbeiten</DialogTitle>
          <DialogDescription>
            Ändern Sie die Details der Frage und speichern Sie die Änderungen.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name" className="flex">
              Frage
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div>
            <Label htmlFor="name" className="flex-3">
              Fragestellung
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-row gap-4">
          <div className="flex-col">
            <Label>Minimum</Label>
            <Input value={min} onChange={(e) => setMinimum(e.target.value)} />
          </div>
          <div className="flex-col">
            <Label>Steps</Label>
            <Input
              type="number"
              value={steps}
              onChange={(e) => setStep(parseInt(e.target.value))}
            />
          </div>
          <div className="flex-col">
            <Label>Maximum</Label>
            <Input
              id="max"
              value={max}
              onChange={(e) => setMaximum(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <div>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Abbrechen
            </Button>
          </div>
          <div>
            <Button onClick={onSubmitEdit}>Speichern</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditQuestionDialog;
