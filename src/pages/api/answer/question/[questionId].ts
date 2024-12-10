import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { questionId } = req.query;
    try {
      const answers = await prisma.answer.findMany({
        where: { questionId: questionId as string },
      });
      res.status(200).json(answers);
    } catch (error) {
      console.error('Error fetching answers:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
