import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const prisma = new PrismaClient();

export function withSurvey(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session || !session.user) {
        return res.status(401).end();
      }
      const surveys = await prisma.survey.findMany({
        where: {
          // id: req.query.surveyId as string,
          userId: session?.user.id,
        },
      });

      if (!surveys.length) {
        return res.status(403).end();
      }

      return handler(req, res);
    } catch (error) {
      console.error(error);

      return res.status(500).end();
    }
  };
}
