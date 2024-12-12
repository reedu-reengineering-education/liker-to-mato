'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createAnswer } from '@/lib/api/answerClient';
import { Answer } from '@prisma/client';

interface CreateAnswerDialogProps {
  questionId: string;
  steps: number;
  min: string;
  max: string;
  questionText: string;
  onAnswerSubmit?: (questionId: string, answer: Answer) => void;
  initialValue?: number;
}

export function CreateAnswerDialog({
  questionId,
  steps,
  min,
  max,
  questionText,
  onAnswerSubmit,
  initialValue,
}: CreateAnswerDialogProps) {
  const [value, setValue] = useState<number>(initialValue || Math.floor(steps / 2));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const onSubmitCreate = async () => {
    try {
      setIsSubmitting(true);
      const answer = await createAnswer(value, questionId);

      if (onAnswerSubmit) {
        onAnswerSubmit(questionId, answer);
      }

      toast({
        title: 'Erfolg',
        description: 'Ihre Antwort wurde gespeichert.',
      });
    } catch (error) {
      console.error('Error when creating the answer:', error);
      toast({
        title: 'Fehler',
        description: 'Beim Speichern Ihrer Antwort ist ein Fehler aufgetreten.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <Slider
        id="value"
        disabled={isSubmitting}
        value={[value]}
        onValueChange={(values: number[]) => {
          setValue(values[0]);
        }}
        min={1}
        max={steps}
        className="my-4"
      />

      <div className="text-center text-sm text-gray-600">Ausgewählter Wert: {value}</div>

      <Button className="w-full" disabled={isSubmitting} onClick={onSubmitCreate}>
        {isSubmitting ? 'Wird gespeichert...' : 'Antwort speichern'}
      </Button>
    </div>
  );
}

export default CreateAnswerDialog;
