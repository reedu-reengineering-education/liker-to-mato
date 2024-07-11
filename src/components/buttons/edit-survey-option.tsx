"use client";
import React, { useState, useEffect } from "react";
import { readSurvey, updateSurvey } from "@/lib/api/surveyClient";
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
import { PencilIcon } from "@heroicons/react/20/solid";

export function EditSurveyName({ surveyId }: { surveyId: string }) {
  const [surveyName, setSurveyName] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    readSurvey(surveyId)
      .then((survey) => {
        setSurveyName(survey.name);
        setNewName(survey.name);
      })
      .catch((error) => console.error(error));
  }, [surveyId]);

  const handleSave = async () => {
    try {
      await updateSurvey(surveyId, newName);
      setSurveyName(newName);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error when updating the survey name", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h4>{surveyName}</h4>
      </div>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PencilIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Name ändern
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Umfrage umbenennen</DialogTitle>
              <DialogDescription>
                Ändern Sie den Namen der Umfrage und speichern Sie die
                Änderungen.
              </DialogDescription>
            </DialogHeader>
            <Label htmlFor="name">Neuer Name</Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Neuer Name der Umfrage"
            />
            <DialogFooter>
              <Button onClick={handleSave}>Speichern</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default EditSurveyName;
