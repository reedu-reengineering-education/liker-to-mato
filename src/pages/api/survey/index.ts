// // path: src/pages/api/survey/index.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const session = await getServerSession(req, res, authOptions);

//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     console.log(session);
//     const { name } = req.body;

//     try {
//       const survey = await prisma.survey.create({
//         data: {
//           name,
//           userId: session.user.id,
//         },
//       });

//       res.status(200).json(survey);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
//   if (req.method === "GET") {
//     console.log("Attempting to get server session");
//     const session = await getServerSession(req, res, authOptions);
//     console.log(session);

//     if (!session) {
//       console.log("No session found, returning 401");
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     try {
//       console.log("Fetching surveys for user:", session.user.id);
//       const surveys = await prisma.survey.findMany({
//         where: {
//           userId: session.user.id,
//         },
//       });
//       console.log("Surveys fetched:", surveys);
//       res.status(200).json(surveys);
//     } catch (error) {
//       console.error("Error fetching surveys", error);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// }

// export default handler;
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  console.log('Session in /api/survey:', session);

  if (!session || !session.user || !session.user.id) {
    console.log('No valid session found, returning 401');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const surveys = await prisma.survey.findMany({
        where: {
          userId: session.user.id,
        },
      });

      res.status(200).json(surveys);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    const { name } = req.body;

    try {
      const survey = await prisma.survey.create({
        data: {
          name,
          userId: session.user.id,
        },
      });

      res.status(201).json(survey);
    } catch (error) {
      console.error('Error creating survey:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
