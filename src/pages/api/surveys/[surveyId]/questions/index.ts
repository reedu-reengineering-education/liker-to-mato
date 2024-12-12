import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { surveyId } = req.query;
    // console.log('Loading questions for surveyId:', surveyId);

    try {
      const questions = await prisma.question.findMany({
        where: { surveyId: surveyId as string },
        orderBy: {
          position: 'asc',
        },
        select: {
          id: true,
          name: true,
          description: true,
          min: true,
          steps: true,
          max: true,
          surveyId: true,
          position: true,
          createdAt: true,
          updatedAt: true,
          responseCount: true,
          averageValue: true,
          scaleType: true,
          scaleOptions: true,
        },
      });

      // Setze Cache-Control auf no-cache, damit der Browser immer neue Daten anfordert
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      res.status(200).json(questions);
    } catch (error) {
      console.error('Error when requesting the questions:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).end();
  }
}
