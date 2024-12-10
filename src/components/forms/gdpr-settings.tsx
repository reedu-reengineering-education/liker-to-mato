'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

const gdprSchema = z.object({
  dataRetentionPeriod: z.number().min(1, {
    message: 'Die Aufbewahrungsfrist muss mindestens 1 Tag betragen.',
  }),
  privacyPolicy: z.string().min(10, {
    message: 'Die Datenschutzerklärung muss mindestens 10 Zeichen lang sein.',
  }),
  anonymizeResponses: z.boolean(),
  encryptData: z.boolean(),
});

type GDPRFormValues = z.infer<typeof gdprSchema>;

type GDPRSettingsProps = {
  surveyId: string;
};

export function GDPRSettings({ surveyId }: GDPRSettingsProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GDPRFormValues>({
    resolver: zodResolver(gdprSchema),
    defaultValues: {
      dataRetentionPeriod: 30,
      privacyPolicy: '',
      anonymizeResponses: false,
      encryptData: true,
    },
  });

  useEffect(() => {
    const fetchGDPRSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/survey/${surveyId}/gdpr`);
        if (!response.ok) {
          throw new Error('Fehler beim Laden der DSGVO-Einstellungen');
        }
        const result = await response.json();
        form.reset(result);
      } catch (error) {
        console.error('Fehler beim Laden der DSGVO-Einstellungen:', error);
        toast({
          title: 'Fehler',
          description: 'Die DSGVO-Einstellungen konnten nicht geladen werden.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGDPRSettings();
  }, [surveyId, form, toast]);

  const onSubmit = async (values: GDPRFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/survey/${surveyId}/gdpr`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren der DSGVO-Einstellungen');
      }

      toast({
        title: 'Einstellungen gespeichert',
        description: 'Die DSGVO-Einstellungen wurden erfolgreich aktualisiert.',
      });
    } catch (error) {
      console.error('Fehler beim Aktualisieren der DSGVO-Einstellungen:', error);
      toast({
        title: 'Fehler',
        description: 'Die DSGVO-Einstellungen konnten nicht aktualisiert werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>DSGVO-Einstellungen</CardTitle>
        <CardDescription>
          Verwalten Sie hier die Datenschutzeinstellungen für Ihre Umfrage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="dataRetentionPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aufbewahrungsfrist der Daten (in Tagen)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                    />
                  </FormControl>
                  <FormDescription>
                    Geben Sie an, wie lange die Umfragedaten aufbewahrt werden sollen.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datenschutzerklärung</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormDescription>Fügen Sie hier Ihre Datenschutzerklärung ein.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anonymizeResponses"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Antworten anonymisieren</FormLabel>
                    <FormDescription>
                      Aktivieren Sie diese Option, um alle Antworten zu anonymisieren.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="encryptData"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Daten verschlüsseln</FormLabel>
                    <FormDescription>
                      Aktivieren Sie diese Option, um alle gespeicherten Daten zu verschlüsseln.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? 'Wird gespeichert...' : 'Einstellungen speichern'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default GDPRSettings;
