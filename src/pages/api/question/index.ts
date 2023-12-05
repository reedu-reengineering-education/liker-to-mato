import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(session);

    const { name, description, min, steps, max, surveyId } = req.body;
    const existingSurvey = await prisma.survey.findUnique({
      where: {
        id: surveyId,
      },
    });

    if (!existingSurvey) {
      return res.status(400).json({ error: "Invalid surveyId" });
    }

    try {
      const question = await prisma.question.create({
        data: {
          name,
          description,
          min,
          steps,
          max,
          surveyId,
        },
      });

      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const questions = await prisma.question.findMany({
        where: {
          surveyId: req.query.surveyId as string,
        },
      });

      res.status(200).json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default handler;
