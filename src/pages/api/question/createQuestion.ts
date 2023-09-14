import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createQuestion(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // GET-Methode
    const { questionId } = req.query;

    try {
      const question = await prisma.question.findUnique({
        where: { id: questionId as string },
      });

      if (!question) {
        res.status(404).json({ error: "Frage nicht gefunden" });
        return;
      }

      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Serverfehler" });
    }
  } else if (req.method === "POST") {
    // POST-Methode
    const { name, description, min, steps, max, surveyId } = req.body;

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
      res.status(500).json({ error: "Serverfehler" });
    }
  } else if (req.method === "PUT") {
    // PUT-Methode
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
      res.status(500).json({ error: "Serverfehler" });
    }
  } else if (req.method === "DELETE") {
    // DELETE-Methode
    const { questionId } = req.query;

    try {
      await prisma.question.delete({
        where: { id: questionId as string },
      });

      res.status(204).end(); // Erfolgreiche Löschung, keine Antwortinhalt
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Serverfehler" });
    }
  } else {
    // Wenn die Methode nicht erlaubt ist
    res.status(405).end(); // Methode nicht erlaubt
  }
}

export default createQuestion;
