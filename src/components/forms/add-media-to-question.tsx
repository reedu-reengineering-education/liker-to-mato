"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mediaSchema = z.object({
  type: z.enum(["image", "video", "audio"]),
  url: z.string().url({ message: "Bitte geben Sie eine gültige URL ein." }),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

type AddMediaProps = {
  questionId: string;
  onMediaAdded: (media: MediaFormValues) => void;
};

export function AddMediaToQuestion({
  questionId,
  onMediaAdded,
}: AddMediaProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      type: "image",
      url: "",
    },
  });

  const onSubmit = async (values: MediaFormValues) => {
    try {
      // Hier würden Sie normalerweise die Medien zu Ihrer API hochladen
      // Für dieses Beispiel nehmen wir an, dass dies erfolgreich war
      onMediaAdded(values);
      toast({
        title: "Medium hinzugefügt",
        description: "Das Medium wurde erfolgreich zur Frage hinzugefügt.",
      });
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Mediums:", error);
      toast({
        title: "Fehler",
        description:
          "Das Medium konnte nicht hinzugefügt werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4" />
          Medium hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Medium zur Frage hinzufügen</DialogTitle>
          <DialogDescription>
            Fügen Sie hier ein Bild, Video oder Audio zu Ihrer Frage hinzu.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medientyp</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded">
                      <option value="image">Bild</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/media.jpg"
                      {...field}
                    />
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
              <Button type="submit">Hinzufügen</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddMediaToQuestion;
