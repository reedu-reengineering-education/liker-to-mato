import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(session);
    const { name } = req.body;

    try {
      const survey = await prisma.survey.create({
        data: {
          name,
          userId: session.user.id,
        },
      });

      res.status(200).json(survey);
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
      const surveys = await prisma.survey.findMany({
        where: {
          userId: session.user.id,
        },
      });

      res.status(200).json(surveys);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default handler;
