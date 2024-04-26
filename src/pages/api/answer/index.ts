import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { value, questionId } = req.body;
  console.log(value, questionId);

  const existingQuestion = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!existingQuestion) {
    return res.status(404).json({ error: "Question not found" });
  }

  try {
    const answer = await prisma.answer.create({
      data: {
        value,
        questionId,
      },
    });
    res.status(201).json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create answer" });
  }
}
