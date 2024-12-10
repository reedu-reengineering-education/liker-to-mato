import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { surveyId: string } }) {
  try {
    const { answers } = await request.json();
    const { surveyId } = params;

    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid answers format' }, { status: 400 });
    }

    // Speichere alle Antworten in einer Transaktion
    const savedAnswers = await prisma.$transaction(async (tx) => {
      const results = [];
      for (const answer of answers) {
        // Prüfe, ob eine Antwort bereits existiert
        const existingAnswer = await tx.answer.findFirst({
          where: {
            questionId: answer.questionId,
            surveyId: surveyId,
          },
        });

        let result;
        if (existingAnswer) {
          // Update existierende Antwort
          result = await tx.answer.update({
            where: {
              id: existingAnswer.id,
            },
            data: {
              value: answer.value,
            },
          });
        } else {
          // Erstelle neue Antwort
          result = await tx.answer.create({
            data: {
              value: answer.value,
              question: {
                connect: {
                  id: answer.questionId,
                },
              },
              survey: {
                connect: {
                  id: surveyId,
                },
              },
            },
          });
        }

        // Aktualisiere die Frage-Statistiken
        const questionAnswers = await tx.answer.findMany({
          where: {
            questionId: answer.questionId,
          },
        });

        const averageValue =
          questionAnswers.reduce((sum, ans) => sum + ans.value, 0) / questionAnswers.length;

        await tx.question.update({
          where: {
            id: answer.questionId,
          },
          data: {
            responseCount: questionAnswers.length,
            averageValue: averageValue,
          },
        });

        results.push(result);
      }
      return results;
    });

    // Aktualisiere den Survey-Status
    const surveyAnswers = await prisma.answer.findMany({
      where: {
        surveyId: surveyId,
      },
      select: {
        questionId: true,
      },
      distinct: ['questionId'],
    });

    await prisma.survey.update({
      where: {
        id: surveyId,
      },
      data: {
        responseCount: surveyAnswers.length,
      },
    });

    return NextResponse.json(savedAnswers);
  } catch (error) {
    console.error('Error submitting survey answers:', error);
    return NextResponse.json({ error: 'Failed to submit survey answers' }, { status: 500 });
  }
}
