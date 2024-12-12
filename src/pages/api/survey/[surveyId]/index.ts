// path: src/pages/api/survey/[surveyId]/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { withMethods } from '@/lib/apiMiddlewares/withMethods';
import { withSurvey } from '@/lib/apiMiddlewares/withSurvey';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { surveyId } = req.query;

    try {
      const survey = await prisma.survey.findUnique({
        where: { id: surveyId as string },
      });

      if (!survey) {
        res.status(404).json({ error: 'Survey not found' });
        return;
      }

      // Füge Cache-Header hinzu
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
      res.status(200).json(survey);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    const { surveyId } = req.query;
    const { name, userId } = req.body;

    try {
      const updatedsurvey = await prisma.survey.update({
        where: { id: surveyId as string },
        data: { name, userId },
      });

      res.status(200).json(updatedsurvey);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    const surveyId = req.query.surveyId as string;

    try {
      const deleteSurvey = await prisma.survey.delete({
        where: { id: surveyId as string },
      });

      res.status(204).end();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).end();
  }
}

export default withMethods(['GET', 'PUT', 'DELETE'], withSurvey(handler));
