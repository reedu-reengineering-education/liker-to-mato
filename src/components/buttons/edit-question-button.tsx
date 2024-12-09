// import { updateQuestion } from "@/lib/api/questionClient";
// import { Question as QuestionData } from "@prisma/client";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "../ui/dialog";
// import { Label } from "../ui/label";
// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { DialogHeader, DialogFooter } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Edit } from "lucide-react";

// type EditQuestionProps = {
//   surveyId: string;
//   question: QuestionData;
//   handleQuestionUpdated: () => void;
// };

// export function EditQuestionDialog(props: EditQuestionProps) {
//   const [name, setName] = useState<string>(props.question.name);
//   const [description, setDescription] = useState<string>(
//     props.question.description
//   );
//   const [min, setMinimum] = useState<string>(props.question.min);
//   const [steps, setStep] = useState<number | undefined>(props.question.steps);
//   const [max, setMaximum] = useState<string>(props.question.max);
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

//   const onSubmitUpdate = async () => {
//     const stepsValue = steps !== undefined ? steps : 0;
//     try {
//       await updateQuestion(
//         props.question.id,
//         name,
//         description,
//         min,
//         stepsValue,
//         max,
//         props.surveyId
//       );
//       console.log("Question updated");
//       setIsDialogOpen(false);
//       props.handleQuestionUpdated();
//       // props.onQuestionUpdated();
//     } catch (error) {
//       console.error("Error when updating the question:", error);
//     }
//   };

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
//         <Button variant="outline" size="icon">
//           <Edit className="h-4 w-4" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Frage bearbeiten</DialogTitle>
//           <DialogDescription>
//             Ändern Sie die Details der Frage und speichern Sie die Änderungen.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid w-full max-w-sm items-center gap-2">
//             <Label htmlFor="name" className="flex">
//               Frage
//             </Label>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="col-span-3"
//             />
//           </div>

//           <div>
//             <Label htmlFor="name" className="flex-3">
//               Fragestellung
//             </Label>
//             <Textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <div className="mb-6 flex flex-row gap-4">
//           <div className="flex-col">
//             <Label>Minimum</Label>
//             <Input value={min} onChange={(e) => setMinimum(e.target.value)} />
//           </div>
//           <div className="flex-col">
//             <Label>Steps</Label>
//             <Input
//               type="number"
//               id="steps"
//               value={steps === undefined ? "" : steps}
//               onChange={(e) => {
//                 const newValue = parseInt(e.target.value);
//                 setStep(isNaN(newValue) ? undefined : newValue);
//               }}
//             />
//           </div>
//           <div className="flex-col">
//             <Label>Maximum</Label>
//             <Input
//               id="max"
//               value={max}
//               onChange={(e) => setMaximum(e.target.value)}
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <div>
//             <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
//               Abbrechen
//             </Button>
//           </div>
//           <div>
//             <Button onClick={onSubmitUpdate}>Speichern</Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default EditQuestionDialog;
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateQuestion } from "@/lib/api/questionClient";
import { Question as QuestionData } from "@prisma/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const questionSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Die Frage muss mindestens 3 Zeichen lang sein." }),
  description: z.string().min(10, {
    message: "Die Beschreibung muss mindestens 10 Zeichen lang sein.",
  }),
  min: z.string().min(1, { message: "Bitte geben Sie einen Minimalwert ein." }),
  steps: z
    .number()
    .int()
    .min(2, { message: "Es müssen mindestens 2 Schritte vorhanden sein." }),
  max: z.string().min(1, { message: "Bitte geben Sie einen Maximalwert ein." }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

type EditQuestionProps = {
  surveyId: string;
  question: QuestionData;
  handleQuestionUpdated: () => void;
};

export function EditQuestionDialog({
  surveyId,
  question,
  handleQuestionUpdated,
}: EditQuestionProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      name: question.name,
      description: question.description,
      min: question.min,
      steps: question.steps,
      max: question.max,
    },
  });

  const onSubmit = async (values: QuestionFormValues) => {
    try {
      await updateQuestion(
        question.id,
        values.name,
        values.description,
        values.min,
        values.steps,
        values.max,
        surveyId
      );
      setIsDialogOpen(false);
      handleQuestionUpdated();
      toast({
        title: "Frage aktualisiert",
        description: "Die Frage wurde erfolgreich aktualisiert.",
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Frage:", error);
      toast({
        title: "Fehler",
        description:
          "Die Frage konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Frage bearbeiten</DialogTitle>
          <DialogDescription>
            Ändern Sie die Details der Frage und speichern Sie die Änderungen.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frage</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fragestellung</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schritte</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Abbrechen
              </Button>
              <Button type="submit">Speichern</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditQuestionDialog;
