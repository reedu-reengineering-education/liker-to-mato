"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { PlusIcon } from "lucide-react";
import { deleteSurvey } from "@/lib/api/surveyClient";

export function DeleteSurveyDialog() {
  const [name, setName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmitDelete = async () => {
    try {
      const surveyData = await deleteSurvey(name); //
      console.log("Survey deleted:", surveyData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error when deleting the survey:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
          Lösche eine Umfrage
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lösche eine Umfrage.</DialogTitle>
          <DialogDescription>
            Gib den Namen der Umfrage ein, die du löschen möchtest.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name" className="ml-3">
              Umfrage-Id eingeben
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button onClick={onSubmitDelete}>Löschen</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSurveyDialog;
