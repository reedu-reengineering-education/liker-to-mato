'use client';

import React from 'react';
import { SurveyEditor } from '@/components/forms/edit/SurveyEditor';
import { SurveyAnalytics } from '@/components/analytics/SurveyAnalytics';
import { EditSurveyName } from '@/components/buttons/edit-survey-option';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container } from '@/components/ui/layout/Container';
import { CreateQuestionDialog } from '@/components/forms/create-question-form';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { getQuestionsForSurvey } from '@/lib/api/questionClient';

export default function Studio({ params }: { params: { surveyId: string; surveyName: string } }) {
  const [questions, setQuestions] = React.useState([]);
  const { toast } = useToast();
  const { data: session } = useSession();

  const loadQuestions = React.useCallback(async () => {
    if (!session) {
      toast({
        title: 'Fehler',
        description: 'Bitte melden Sie sich an.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const data = await getQuestionsForSurvey(params.surveyId);
      setQuestions(data);
    } catch (error: any) {
      console.error('Error loading questions:', error);
      toast({
        title: 'Fehler',
        description: error.message || 'Die Fragen konnten nicht geladen werden.',
        variant: 'destructive',
      });
    }
  }, [params.surveyId, session, toast]);

  const handleQuestionCreated = React.useCallback(() => {
    console.log('Question created, reloading questions...');
    loadQuestions();
  }, [loadQuestions]);

  React.useEffect(() => {
    if (session) {
      loadQuestions(); // Initial laden
    }
  }, [session, loadQuestions]);

  if (!session) {
    return (
      <Container>
        <div className="py-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Bitte melden Sie sich an, um die Umfrage zu bearbeiten.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <EditSurveyName surveyId={params.surveyId} />
            </CardTitle>
          </CardHeader>
        </Card>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Umfrage bearbeiten</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-0">
            <div className="flex justify-end mb-4">
              <CreateQuestionDialog
                surveyId={params.surveyId}
                handleQuestionCreated={handleQuestionCreated}
              />
            </div>
            <SurveyEditor
              surveyId={params.surveyId}
              initialQuestions={questions}
              onSave={() => loadQuestions()}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <SurveyAnalytics surveyId={params.surveyId} />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Einstellungen werden bald verfügbar sein...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
