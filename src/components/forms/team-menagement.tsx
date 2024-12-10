'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const teamMemberSchema = z.object({
  email: z.string().email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }),
  role: z.enum(['editor', 'viewer']),
});

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

type TeamMember = {
  id: string;
  email: string;
  role: 'editor' | 'viewer';
};

type TeamManagementProps = {
  surveyId: string;
};

export function TeamManagement({ surveyId }: TeamManagementProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { toast } = useToast();

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      email: '',
      role: 'viewer',
    },
  });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // Hier würden Sie normalerweise Ihre API aufrufen
        // Für dieses Beispiel verwenden wir Mock-Daten
        const response = await fetch(`/api/survey/${surveyId}/team`);
        const result = await response.json();
        setTeamMembers(result);
      } catch (error) {
        console.error('Fehler beim Laden der Teammitglieder:', error);
        toast({
          title: 'Fehler',
          description: 'Die Teammitglieder konnten nicht geladen werden.',
          variant: 'destructive',
        });
      }
    };

    fetchTeamMembers();
  }, [surveyId, toast]);

  const onSubmit = async (values: TeamMemberFormValues) => {
    try {
      // Hier würden Sie normalerweise Ihre API aufrufen
      // Für dieses Beispiel fügen wir das Mitglied direkt zum State hinzu
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...values,
      };
      setTeamMembers([...teamMembers, newMember]);
      toast({
        title: 'Teammitglied hinzugefügt',
        description: 'Das Teammitglied wurde erfolgreich hinzugefügt.',
      });
      form.reset();
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Teammitglieds:', error);
      toast({
        title: 'Fehler',
        description: 'Das Teammitglied konnte nicht hinzugefügt werden.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="teammitglied@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rolle</FormLabel>
                <FormControl>
                  <select {...field} className="w-full p-2 border rounded">
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Teammitglied hinzufügen</Button>
        </form>
      </Form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>E-Mail</TableHead>
            <TableHead>Rolle</TableHead>
            <TableHead>Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Hier würden Sie normalerweise Ihre API aufrufen
                    setTeamMembers(teamMembers.filter((m) => m.id !== member.id));
                  }}
                >
                  Entfernen
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TeamManagement;
