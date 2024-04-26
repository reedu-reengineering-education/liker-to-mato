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
    props.question.description,
  );
  const [min, setMinimum] = useState<string>(props.question.min);
  const [steps, setStep] = useState<number | undefined>(props.question.steps);
  const [max, setMaximum] = useState<string>(props.question.max);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onSubmitUpdate = async () => {
    const stepsValue = steps !== undefined ? steps : 0;
    try {
      await updateQuestion(
        props.question.id,
        name,
        description,
        min,
        stepsValue,
        max,
        props.surveyId,
      );
      console.log("Question updated");
      setIsDialogOpen(false);
      props.handleQuestionUpdated();
      // props.onQuestionUpdated();
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
              id="steps"
              value={steps === undefined ? "" : steps}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setStep(isNaN(newValue) ? undefined : newValue);
              }}
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
            <Button onClick={onSubmitUpdate}>Speichern</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditQuestionDialog;
