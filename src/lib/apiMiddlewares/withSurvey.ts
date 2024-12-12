// path: src/lib/apiMiddlewares/withSurvey.ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export function withSurvey(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getServerSession(req, res, authOptions);
      console.log('Session:', session);
      console.log('SurveyId:', req.query.surveyId);

      const survey = await prisma.survey.findFirst({
        where: {
          id: req.query.surveyId as string,
          userId: session?.user.id,
        },
        include: {
          questions: true,
        },
      });
      console.log('Found survey:', survey);

      if (!survey) {
        return res.status(403).end();
      }

      // Füge Cache-Header hinzu
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

      return handler(req, res);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }

      return res.status(500).end();
    }
  };
}
