import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { surveyId: string } },
) {
  try {
    const { surveyId } = params;

    const questions = await prisma.question.findMany({
      where: {
        surveyId: surveyId,
      },
      select: {
        id: true,
        name: true,
        averageValue: true,
        responseCount: true,
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching survey stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey statistics" },
      { status: 500 },
    );
  }
}
