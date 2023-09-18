import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import createSurveyData from "@/utils/surveyApiClient";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, userId } = req.body;

    try {
      const survey = await prisma.survey.create({
        data: {
          name,
          userId,
        },
      });

      res.status(200).json(survey);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default handler;


