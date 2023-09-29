"use client";
import * as React from "react";
// import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { createQuestion } from "@/lib/api/questionClient";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface FormData {
  name: string;
  description: string;
  min: string;
  steps: number;
  max: string;
  surveyId: string;
}

export interface CreateQuestionFormProps {
  onSubmit: () => void;
}

export async function CreateQuestionDialog({
  onSubmit,
}: CreateQuestionFormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    description: "",
    min: "",
    steps: 0,
    max: "",
    surveyId: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "steps" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, description, min, steps, max, surveyId } = formData;

    try {
      await createQuestion(name, description, min, steps, max, surveyId);
      onSubmit();
    } catch (error) {
      console.error("Error when creating the question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="name" className="flex">
            Frage
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="for example, how is it outside"
            className="col-span-3"
          />
        </div>
        <div>
          <Label htmlFor="description" className="flex-3">
            Fragestellung
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="for example, describe here?"
            className="col-span-3"
          />
        </div>
      </div>
      <div className="mb-6 flex flex-row gap-4">
        <div className="flex-col">
          <Label>Minimum</Label>
          <Input
            name="min"
            value={formData.min}
            onChange={handleInputChange}
            placeholder="text"
          />
        </div>
        <div className="flex-col">
          <Label>Stepps</Label>
          <Input
            name="steps"
            value={formData.steps.toString()}
            onChange={handleInputChange}
            placeholder="zahl"
          />
        </div>
        <div className="flex-col">
          <Label>Maximum</Label>
          <Input
            name="max"
            value={formData.max}
            onChange={handleInputChange}
            placeholder="text"
          />
        </div>
      </div>
      <div>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}



// "use client";
// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";
// import { Button } from "../ui/button";
// import { Label } from "../ui/label";
// import { PlusIcon } from "lucide-react";
// import { createSurvey } from "@/lib/api/surveyClient";
// import { useState } from "react";

// export async function CreateSurveyDialog() {
//   const [name, setName] = useState<string>("");

//   async function createSurvey() {
//     try {
//       const surveyData = await createSurvey();
//       console.log("Survey created:", surveyData);
//     } catch (error) {
//       console.error("Error when creating the survey:", error);
//     }
//     const handleNameChange = (e: any) => {
//       setName(e.target.value);
//     };

//     return (
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="outline">
//             <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
//             Erstelle eine neue Umfrage
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Erstelle eine neue Umfrage</DialogTitle>
//             <DialogDescription>
//               Gib einen Namen für eine neue Umfrage ein.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid w-full max-w-sm items-center gap-2">
//               <Label htmlFor="name" className="ml-3">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 value={name}
//                 onChange={handleNameChange}
//                 placeholder="Name"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button>Speichern</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     );
//   }
// }
