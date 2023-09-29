"use client";
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
import { useForm, FormProps, partialQuestion } from "@/helper/formHandling";

export default function CreateQuestionForm({}: FormProps) {
  const initialState: partialQuestion = {
    name: "",
    description: "",
    min: "",
    steps: 0,
    max: "",
  };

  const { questionData, setQuestionData, handleSave } = useForm(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSave();
    // Weitere Aktionen nach dem Speichern hier ausführen
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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="name" className="flex">
                Frage
              </Label>
              <Input
                id="name"
                name="name"
                value={questionData.name}
                onChange={handleChange}
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
                value={questionData.description}
                onChange={handleChange}
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
                value={questionData.min}
                onChange={handleChange}
                placeholder="text"
              />
            </div>
            <div className="flex-col">
              <Label>Stepps</Label>
              <Input
                name="steps"
                value={questionData.steps.toString()}
                onChange={handleChange}
                placeholder="zahl"
              />
            </div>
            <div className="flex-col">
              <Label>Maximum</Label>
              <Input
                name="max"
                value={questionData.max}
                onChange={handleChange}
                placeholder="text"
              />
            </div>
          </div>
          <div>
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

//         <div className="grid gap-4 py-4">
//           <div className="grid w-full max-w-sm items-center gap-2">
//             <Label htmlFor="name" className="flex">
//               Frage
//             </Label>
//             <Input
//               id="name"
//               placeholder="for example, how is it outside "
//               className="col-span-3"
//             />
//           </div>
//           <div>
//             <Label htmlFor="name" className=" flex-3">
//               Fragestellung
//             </Label>
//             <Textarea
//               id="name"
//               placeholder="for example, describe here?"
//               className="col-span-3"
//             ></Textarea>
//           </div>
//         </div>
//         <div className="mb-6 flex flex-row gap-4 ">
//           <div className=" flex-col">
//             <Label>Minimum</Label>
//             <Input type="text" placeholder="text"></Input>
//           </div>
//           <div className=" flex-col">
//             <Label>Stepps</Label>
//             <Input type="number" placeholder="zahl"></Input>
//           </div>
//           <div className=" flex-col">
//             <Label>Maximum</Label>
//             <Input type="text" placeholder="text"></Input>
//           </div>
//         </div>
