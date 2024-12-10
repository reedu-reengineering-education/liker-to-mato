import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { answerId } = req.query;
    try {
      const answer = await prisma.answer.findFirst({
        where: { id: answerId as string },
      });

      if (!answer) {
        res.status(404).json({ error: 'Answer not found' });
        return;
      }

      res.status(200).json(answer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    const { answerId } = req.query;
    const { value } = req.body;

    try {
      const updateAnswer = await prisma.answer.update({
        where: { id: answerId as string },
        data: { value },
      });
      res.status(200).json(updateAnswer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    const { answerId } = req.query;

    try {
      const deleteAnswer = await prisma.answer.delete({
        where: { id: answerId as string },
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).end();
  }
}

export default handler;
