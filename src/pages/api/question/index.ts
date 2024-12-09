// path: src/pages/api/question/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(session);

    const { name, description, min, steps, max, surveyId, scaleType, scaleOptions } = req.body;
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
          scaleType: scaleType || "default",
          scaleOptions: scaleOptions || [],
        },
      });

      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { questionId } = req.query;
    const { name, description, min, steps, max, surveyId, scaleType, scaleOptions } = req.body;

    try {
      const updatedQuestion = await prisma.question.update({
        where: { id: questionId as string },
        data: {
          name,
          description,
          min,
          steps,
          max,
          surveyId,
          scaleType: scaleType || "default",
          scaleOptions: scaleOptions || [],
        },
      });

      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "GET") {
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
