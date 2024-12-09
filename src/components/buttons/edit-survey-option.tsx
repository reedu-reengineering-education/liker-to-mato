// "use client";
// import React, { useState, useEffect } from "react";
// import { readSurvey, updateSurvey } from "@/lib/api/surveyClient";
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
// import { PencilIcon } from "@heroicons/react/20/solid";

// export function EditSurveyName({ surveyId }: { surveyId: string }) {
//   const [surveyName, setSurveyName] = useState<string>("");
//   const [newName, setNewName] = useState<string>("");
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

//   useEffect(() => {
//     readSurvey(surveyId)
//       .then((survey) => {
//         setSurveyName(survey.name);
//         setNewName(survey.name);
//       })
//       .catch((error) => console.error(error));
//   }, [surveyId]);

//   const handleSave = async () => {
//     try {
//       await updateSurvey(surveyId, newName);
//       setSurveyName(newName);
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error("Error when updating the survey name", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between">
//       <div>
//         <h4>{surveyName}</h4>
//       </div>
//       <div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button variant="outline">
//               <PencilIcon className="mr-2 h-4 w-4" aria-hidden="true" />
//               Name ändern
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle>Umfrage umbenennen</DialogTitle>
//               <DialogDescription>
//                 Ändern Sie den Namen der Umfrage und speichern Sie die
//                 Änderungen.
//               </DialogDescription>
//             </DialogHeader>
//             <Label htmlFor="name">Neuer Name</Label>
//             <Input
//               id="name"
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//               placeholder="Neuer Name der Umfrage"
//             />
//             <DialogFooter>
//               <Button onClick={handleSave}>Speichern</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }

// export default EditSurveyName;
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Der Umfragename muss mindestens 3 Zeichen lang sein.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function EditSurveyName({ surveyId }: { surveyId: string }) {
  const [surveyName, setSurveyName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchSurveyName = async () => {
      try {
        setIsLoading(true);
        const survey = await readSurvey(surveyId);
        setSurveyName(survey.name);
        form.reset({ name: survey.name });
      } catch (error) {
        console.error("Fehler beim Laden des Umfragenamens:", error);
        toast({
          title: "Fehler",
          description: "Der Umfragename konnte nicht geladen werden.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyName();
  }, [surveyId, form, toast]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSurvey(surveyId, values.name);
      setSurveyName(values.name);
      setIsDialogOpen(false);
      toast({
        title: "Erfolg",
        description: "Der Umfragename wurde erfolgreich aktualisiert.",
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Umfragenamens:", error);
      toast({
        title: "Fehler",
        description: "Der Umfragename konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-6 w-48 bg-gray-200 rounded"></div>;
  }

  return (
    <div className="flex items-center justify-between">
      <h4 className="text-xl font-semibold">{surveyName}</h4>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
            Name ändern
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Umfrage umbenennen</DialogTitle>
            <DialogDescription>
              Ändern Sie den Namen der Umfrage und speichern Sie die Änderungen.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Neuer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Neuer Name der Umfrage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
    </div>
  );
}

export default EditSurveyName;
