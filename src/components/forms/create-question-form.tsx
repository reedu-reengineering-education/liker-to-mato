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
} from "@/components/ui/dialog";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { PlusIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import createQuestion from "@/lib/api/createQuestion";

export function CreateQuestionDialog(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [min, setMinimum] = useState<string>("");
  const [steps, setStep] = useState<number | undefined>(undefined);
  const [max, setMaximum] = useState<string>("");
  const [survey, setSurvey] = useState<string>("");

  const onSubmit = async () => {
    const stepsValue = steps !== undefined ? steps : 0;
    try {
      const questionData = await createQuestion(
        name,
        description,
        min,
        stepsValue,
        max,
        survey
      );
      console.log("Question created:", questionData);
    } catch (error) {
      console.error("Error when creating the question:", error);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="for example, how is it outside "
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="name" className=" flex-3">
              Fragestellung
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="for example, describe here?"
              className="col-span-3"
            ></Textarea>
          </div>
        </div>
        <div className="mb-6 flex flex-row gap-4 ">
          <div className=" flex-col">
            <Label>Minimum</Label>
            <Input
              value={min}
              onChange={(e) => setMinimum(e.target.value)}
              placeholder="text"
            ></Input>
          </div>
          <div className=" flex-col">
            <Label>Stepps</Label>
            <Input
              value={steps === undefined ? "" : steps.toString()}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setStep(isNaN(newValue) ? undefined : newValue);
              }}
              placeholder="zahl"
            ></Input>
          </div>
          <div className=" flex-col">
            <Label>Maximum</Label>
            <Input
              value={max}
              onChange={(e) => setMaximum(e.target.value)}
              placeholder="text"
            ></Input>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="secondary">Cancel</Button>
          </div>
          <div>
            <Button onClick={onSubmit}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateQuestionDialog;
