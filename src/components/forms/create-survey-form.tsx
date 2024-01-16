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
import { createSurvey, deleteSurvey } from "@/lib/api/surveyClient";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function CreateSurveyDialog() {
  const { data: session } = useSession();
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const onSubmitCreate = async () => {
    try {
      const surveyData = await createSurvey(name);
      console.log("Survey created:", surveyData);
      router.push(`/studio/${surveyData.id}`);
    } catch (error) {
      console.error("Error when creating the survey:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {session && (
          <Button variant="outline">
            <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
            Neue Umfrage erstellen
          </Button>
        )}
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button onClick={onSubmitCreate}>Speichern</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default CreateSurveyDialog;

