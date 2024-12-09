// path: src/lib/apiMiddlewares/withSurvey.ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export function withSurvey(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getServerSession(req, res, authOptions);

      const surveys = await prisma.survey.findUnique({
        where: {
          id: req.query.surveyId as string,
          userId: session?.user.id,
        },
        include: {
          questions: true,
        },
      });

      if (!surveys) {
        return res.status(403).end();
      }

      return handler(req, res);
    } catch (error) {
      console.error(error);

      return res.status(500).end();
    }
  };
}
