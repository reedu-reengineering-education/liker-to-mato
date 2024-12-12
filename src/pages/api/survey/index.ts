import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  console.log('Session in /api/survey:', session);

  if (!session || !session.user || !session.user.id) {
    console.log('No valid session found, returning 401');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, startDate, endDate } = req.body;

    try {
      // Hole den Benutzer mit Plan-Informationen
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { plan: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Überprüfe das Umfragen-Limit basierend auf dem Plan
      const surveyCount = await prisma.survey.count({
        where: { userId: user.id },
      });

      // Wenn kein Plan (Free) oder Free Plan, dann max 1 Umfrage
      if (!user.plan || user.plan.name === 'Free') {
        if (surveyCount >= 1) {
          return res.status(403).json({
            error: 'Upgrade to Professional or Enterprise plan to create more surveys',
          });
        }
      }

      const survey = await prisma.survey.create({
        data: {
          name,
          userId: session.user.id,
          status: 'draft',
          ...(startDate && { startDate: new Date(startDate) }),
          ...(endDate && { endDate: new Date(endDate) }),
        },
      });

      res.status(201).json(survey);
    } catch (error) {
      console.error('Error creating survey:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const surveys = await prisma.survey.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          questions: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json(surveys);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
