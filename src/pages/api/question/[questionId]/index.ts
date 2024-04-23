import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // GET-Methode
    const { questionId } = req.query;

    try {
      const question = await prisma.question.findUnique({
        where: { id: questionId as string },
      });

      if (!question) {
        res.status(404).json({ error: "Question not found" });
        return;
      }

      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "PUT") {
    const { questionId } = req.query;
    const { name, description, min, steps, max, surveyId } = req.body;

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
        },
      });

      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "DELETE") {
    const { questionId } = req.query;

    try {
       const deleteQuestion = await prisma.question.delete({
         where: { id: questionId as string },
       });

      res.status(204).end(); // Delete successful, no response content
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}

export default handler;
