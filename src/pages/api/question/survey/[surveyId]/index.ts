import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { surveyId } = req.query;

    try {
      const questions = await prisma.question.findMany({
        where: { surveyId: surveyId as string },
        orderBy: {
          createdAt: "asc",
        },
      });
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error when requesting the questions:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).end();
  }
}
