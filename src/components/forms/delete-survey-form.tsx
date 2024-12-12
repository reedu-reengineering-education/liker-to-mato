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
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { deleteSurvey } from '@/lib/api/surveyClient';

const deleteSchema = z.object({
  surveyId: z.string().min(1, { message: 'Bitte geben Sie eine Umfrage-ID ein.' }),
});

type DeleteFormValues = z.infer<typeof deleteSchema>;

export function DeleteSurveyDialog() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<DeleteFormValues>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {
      surveyId: '',
    },
  });

  const onSubmit = async (values: DeleteFormValues) => {
    try {
      await deleteSurvey(values.surveyId);
      toast({
        title: 'Umfrage gelöscht',
        description: 'Die Umfrage wurde erfolgreich gelöscht.',
      });
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error('Fehler beim Löschen der Umfrage:', error);
      toast({
        title: 'Fehler',
        description:
          'Die Umfrage konnte nicht gelöscht werden. Bitte überprüfen Sie die Umfrage-ID und versuchen Sie es erneut.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-red-500 hover:text-red-700">
          <Trash2 className="mr-2 h-4 w-4" />
          Umfrage löschen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Umfrage löschen</DialogTitle>
          <DialogDescription>
            Bitte geben Sie die ID der Umfrage ein, die Sie löschen möchten. Diese Aktion kann nicht
            rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="surveyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Umfrage-ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Geben Sie die Umfrage-ID ein" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit" variant="destructive">
                Umfrage löschen
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSurveyDialog;
