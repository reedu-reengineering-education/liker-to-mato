'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Search, ArrowLeft, Edit, Trash } from 'lucide-react';
import { surveyQuestions } from '@/lib/api/surveyClient';
import { deleteQuestion } from '@/lib/api/questionClient';
import CreateQuestionDialog from '@/components/forms/create-question-form';
import EditQuestionDialog from '@/components/buttons/edit-question-button';

export default function SurveyQuestionsDashboard({ surveyId }: { surveyId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const loadQuestions = useCallback(async () => {
    try {
      const response = await fetch(`/api/question/survey/${surveyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load questions. Please try again.',
        variant: 'destructive',
      });
    }
  }, [surveyId, toast]);

  useEffect(() => {
    loadQuestions();
  }, [surveyId, loadQuestions]);

  useEffect(() => {
    const filtered = questions.filter(
      (question) =>
        question.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchTerm, questions]);

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion(questionId);
      setQuestions(questions.filter((question) => question.id !== questionId));
      toast({
        title: 'Question deleted',
        description: 'The question has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error when deleting the question:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the question. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 rounded-lg">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="relative flex items-center w-full max-w-md">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <CreateQuestionDialog surveyId={surveyId} handleQuestionCreated={loadQuestions} />
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuestions.map((question) => (
            <Card
              key={question.id}
              className="bg-gradient-to-r from-blue-100 to-blue-200 hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-blue-300/50 rounded-lg group relative"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{question.name}</CardTitle>
                <CardDescription>Question title</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{question.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-4">
                  <div>
                    <p className="text-lg font-bold">{question.min}</p>
                    <p className="text-xs text-gray-600">Min</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{question.steps}</p>
                    <p className="text-xs text-gray-600">Steps</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{question.max}</p>
                    <p className="text-xs text-gray-600">Max</p>
                  </div>
                </div>
              </CardFooter>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditQuestionDialog
                  question={question}
                  surveyId={surveyId}
                  handleQuestionUpdated={loadQuestions}
                />
                {/* <Button variant="secondary" size="icon">
                  <Edit className="h-4 w-4" />
                </Button> */}
                <Button variant="destructive" size="icon" onClick={() => handleDelete(question.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
