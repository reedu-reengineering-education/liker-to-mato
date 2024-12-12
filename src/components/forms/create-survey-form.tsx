'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PlusIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createSurvey } from '@/lib/api/surveyClient';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const surveySchema = z.object({
  name: z.string().min(3, {
    message: 'Der Umfragename muss mindestens 3 Zeichen lang sein.',
  }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

export function CreateSurveyDialog() {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
    },
  });

  const onSubmit = async (values: SurveyFormValues) => {
    try {
      const surveyData = await createSurvey(values.name, values.startDate, values.endDate);
      toast({
        title: 'Umfrage erstellt',

        description: 'Die Umfrage wurde erfolgreich erstellt.',
      });
      setIsDialogOpen(false);
      router.push(`/studio/${surveyData.id}`);
    } catch (error) {
      console.error('Fehler beim Erstellen der Umfrage:', error);
      toast({
        title: 'Fehler',
        description: 'Die Umfrage konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {session && (
          <Button variant="outline">
            <PlusIcon className="mr-2 h-4 w-4" />
            Neue Umfrage erstellen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neue Umfrage erstellen</DialogTitle>
          <DialogDescription>
            Geben Sie einen Namen für Ihre neue Umfrage ein und legen Sie optional Start- und
            Enddatum fest.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Meine neue Umfrage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Startdatum (optional)</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enddatum (optional)</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">Erstellen</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSurveyDialog;
