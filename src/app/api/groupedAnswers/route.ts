import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Markiere die Route als dynamisch
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 },
      );
    }

    const groupedAnswers = await prisma.answer.groupBy({
      by: ["value"],
      where: {
        questionId: questionId,
      },
      _count: {
        value: true,
      },
      orderBy: {
        value: "asc",
      },
    });

    return NextResponse.json(groupedAnswers);
  } catch (error) {
    console.error("Error fetching grouped answers:", error);
    return NextResponse.json(
      { error: "Failed to fetch grouped answers" },
      { status: 500 },
    );
  }
}
