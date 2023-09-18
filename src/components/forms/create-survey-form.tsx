"use client";
import React from "react";
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
import createSurveyData from "@/utils/surveyApiClient";
import { useState } from "react";

export function CreateSurveyDialog() {
  const [name, setName] = useState<string>(""); // Zustand für den Namen
  const [userId] = useState<string>(""); // Zustand für den Benutzer-ID

  // Funktion zum Speichern der Umfrage
  async function saveSurveyData() {
    try {
      // Rufe die createSurveyData-Funktion auf
      const surveyData = await createSurveyData(name, userId); // Hier solltest du userId setzen
      console.log("Umfrage erstellt:", surveyData);
      // Hier kannst du die Umfrage-Daten weiter verarbeiten
    } catch (error) {
      console.error("Fehler beim Erstellen der Umfrage:", error);
      // Hier kannst du den Fehler behandeln
    }
  }
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
          Erstelle eine neue Umfrage
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Erstelle eine neue Umfrage</DialogTitle>
          <DialogDescription>
            Gib einen Namen für eine neue Umfrage ein.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name" className="ml-3">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onClick={handleNameChange}
              placeholder="Name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={saveSurveyData}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
