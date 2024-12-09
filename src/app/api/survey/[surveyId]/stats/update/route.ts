import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { surveyId: string } }
) {
  try {
    const { surveyId } = params;

    // Hole alle Antworten für diese Umfrage
    const answers = await prisma.answer.findMany({
      where: {
        survey: {
          id: surveyId
        }
      },
      include: {
        question: true,
      },
    });

    // Berechne die Statistiken
    const questionStats = answers.reduce((acc: Record<string, any>, answer) => {
      const questionId = answer.questionId;
      if (!acc[questionId]) {
        acc[questionId] = {
          totalResponses: 0,
          averageValue: 0,
          values: [] as number[],
        };
      }
      
      acc[questionId].totalResponses++;
      acc[questionId].values.push(answer.value);
      acc[questionId].averageValue =
        acc[questionId].values.reduce((a: number, b: number) => a + b, 0) /
        acc[questionId].values.length;
      
      return acc;
    }, {});

    // Speichere die Statistiken für jede Frage
    await prisma.$transaction(
      Object.entries(questionStats).map(([questionId, stats]: [string, any]) => {
        return prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            responseCount: stats.totalResponses,
            averageValue: stats.averageValue,
          },
        });
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating survey stats:", error);
    return NextResponse.json(
      { error: "Failed to update survey statistics" },
      { status: 500 }
    );
  }
}
