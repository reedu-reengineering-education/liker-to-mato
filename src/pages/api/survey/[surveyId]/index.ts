import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // GET-Methode
    const { surveyId } = req.query;

    try {
      const survey = await prisma.survey.findUnique({
        where: { id: surveyId as string },
      });

      if (!survey) {
        res.status(404).json({ error: "Survey not found" });
        return;
      }

      res.status(200).json(survey);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "PUT") {
    const { surveyId } = req.query;
    const { name, userId } = req.body;

    try {
      const updatedsurvey = await prisma.survey.update({
        where: { id: surveyId as string },
        data: { name, userId },
      });

      res.status(200).json(updatedsurvey);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "DELETE") {
    const { surveyId } = req.query;
   

    try {
      await prisma.survey.delete({
        where: { id: surveyId as string },
      });

      res.status(204).end(); // Delete successful, no survey content
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}

export default handler;
