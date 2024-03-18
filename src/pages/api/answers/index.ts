import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value, questionId } = req.body;
  if (typeof value !== "string" || value.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing value" });
  }

  if (typeof questionId !== "string" || questionId.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing questionId" });
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
    res.status(500).json({ error: "Unable to create answer" });
  }
}
