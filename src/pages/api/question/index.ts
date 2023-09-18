import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
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
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default handler;
