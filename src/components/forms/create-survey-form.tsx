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
import createSurvey from "@/lib/api/createSurvey";
import { useState } from "react";

export function CreateSurveyDialog() {
  const [name, setName] = useState<string>("");

  async function saveSurvey() {
    try {
      const surveyData = await createSurvey(name);
      console.log("Survey created:", surveyData);
    } catch (error) {
      console.error("Error when creating the survey:", error);
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
                onChange={handleNameChange}
                placeholder="Name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveSurvey}>Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
