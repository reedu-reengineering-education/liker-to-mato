import React, { useEffect, useState } from "react";
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

import { createAnswer } from "@/lib/api/answerClient";

// export function CreateAnswerDialog({ questionId }: { questionId: string }) {
//   const [value, setValue] = useState<string>("");
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
//     null
//   );

//   const onSubmitCreate = async () => {
//     const handleOpenDialog = (questionId: string) => {
//       setSelectedQuestionId(questionId);
//       setIsDialogOpen(false);
//     };

//     try {
//       const answerData = await createAnswer(value, questionId);
//       console.log("Answer created:", answerData);
//       handleOpenDialog;
//       // setIsDialogOpen(false); // Schließt den Dialog nach erfolgreicher Antwort-Erstellung
//     } catch (error) {
//       console.error("Error when creating the answer:", error);
//     }
//   };

//   return (
//     {isDialogOpen && selectedQuestionId && <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
//           <PlusIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
//           Your answer
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         {/* Dialog-Inhalte und Input-Felder */}
//         <DialogFooter>
//           <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
//             Cancel
//           </Button>
//           <Button onClick={() => onSubmitCreate()}>Save</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>)

//   );

// }

export function CreateAnswerDialog({ questionId }: { questionId: string }) {
  const [value, setValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onSubmitCreate = async () => {
    try {
      const answerData = await createAnswer(value, questionId);
      console.log("Answer created:", answerData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error when creating the answer:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
          Your answer
        </Button>
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
              Antwort
            </Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="for example, how is it outside "
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <div>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
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
