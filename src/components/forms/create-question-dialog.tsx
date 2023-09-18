"as client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { PlusIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import createQuestionData from "@/utils/questionApiClient";

export function CreateQuestionDialog() {
  const [name, setName] = useState<string>(""); // Zustand für den Namen
  const [description, setDescription] = useState<string>(""); // Zustand für den Benutzer-ID
  const [min, setMinimum] = useState<string>("");
  const [steps, setStep] = useState<number | undefined>(undefined);
  const [max, setMaximum] = useState<string>("");
  const [surveyId, setSurveyId] = useState<string>("");

  const handleSaveClick = async () => {
    try {
      // Rufe die createQuestionData-Funktion auf, um die Frage zu erstellen
      const questionData = await createQuestionData(
        name,
        description,
        min,
        steps,
        max,
        surveyId
      );
      console.log("Frage erstellt:", questionData);
      // Hier kannst du die Daten der erstellten Frage weiter verarbeiten
    } catch (error) {
      console.error("Fehler beim Erstellen der Frage:", error);
      // Hier kannst du den Fehler behandeln
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
          Frage hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stell eine Frage</DialogTitle>
          <DialogDescription>
            Gib einen Namen für eine neue Umfrage ein.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name" className="flex">
              Frage
            </Label>
            <Input
              id="name"
              placeholder="for example, how is it outside "
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="name" className=" flex-3">
              Fragestellung
            </Label>
            <Textarea
              id="name"
              placeholder="for example, describe here?"
              className="col-span-3"
            ></Textarea>
          </div>
        </div>
        <div className="mb-6 flex flex-row gap-4 ">
          <div className=" flex-col">
            <Label>Minimum</Label>
            <Input type="text" placeholder="text"></Input>
          </div>
          <div className=" flex-col">
            <Label>Stepps</Label>
            <Input type="number" placeholder="zahl"></Input>
          </div>
          <div className=" flex-col">
            <Label>Maximum</Label>
            <Input type="text" placeholder="text"></Input>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="secondary" type="submit">
              Cancel
            </Button>
          </div>
          <div>
            <Button onClick={handleSaveClick}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
