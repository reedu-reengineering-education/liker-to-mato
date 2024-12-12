import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { surveyId } = req.query;
  const questions = req.body;

  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    // Update each question's position in a transaction
    await prisma.$transaction(
      questions.map((question, index) =>
        prisma.question.update({
          where: { id: question.id },
          data: { position: index },
        })
      )
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error reordering questions:', error);
    res.status(500).json({ error: 'Failed to reorder questions' });
  }
}
