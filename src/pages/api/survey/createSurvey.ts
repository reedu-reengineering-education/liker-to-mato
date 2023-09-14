import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createSurvey(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { name } = req.query;

    try {
      const survey = await prisma.survey.findUnique({
        where: { id: name as string },
      });

      if (!survey) {
        res.status(404).json({ error: "Umfrage nicht gefunden" });
        return;
      }

      res.status(200).json(survey);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Serverfehler" });
    }
  } else if (req.method === "POST") {
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  } else {
    res.status(405).end();
  }
}

export default createSurvey;
