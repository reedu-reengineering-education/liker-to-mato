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

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { PlusIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { createAnswer } from "@/lib/api/answerClient";
import { useSession } from "next-auth/react";

type CreateAnserProps = {
  questionId: string;
  handleAnswerCreated: () => void;
};

export function CreateAnswerDialog(props: CreateAnserProps) {
  const [value, stepsValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const onSubmitCreate = async () => {
    try {
      const answerData = await createAnswer(value, props.questionId);
      console.log("Answer created:", answerData);
      setIsDialogOpen(false);
      props.handleAnswerCreated();
    } catch (error) {
      console.error("Error when creating the answer:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        {session && (
          <Button variant="outline">
            <PlusIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
            Your answer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add your answer</DialogTitle>
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
              id="value"
              value={value}
              // onChange={(e) => setName(e.target.value)}
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
              value={value}
              // onChange={(e) => setDescription(e.target.value)}
              placeholder="for example, describe here?"
              className="col-span-3"
            ></Textarea>
          </div>
        </div>
        <div className="mb-6 flex flex-row gap-4 ">
          <div className=" flex-col">
            <Label>Minimum</Label>
            <Input placeholder="text"></Input>
          </div>
          <div className=" flex-col">
            <Label>Steps</Label>
            <Input placeholder="zahl"></Input>
          </div>
          <div className=" flex-col">
            <Label>Maximum</Label>
            <Input></Input>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="secondary">Cancel</Button>
          </div>
          <div>
            <Button onClick={() => onSubmitCreate()}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAnswerDialog;
