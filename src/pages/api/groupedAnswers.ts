// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { action } = req.query;

//   if (action === "average-answer-value") {
//     const result = await prisma.answer.aggregate({
//       _avg: {
//         value: true,
//       },
//     });
//     res.json(result);
//   } else if (action === "group-by-question") {
//     const result = await prisma.answer.groupBy({
//       by: ["questionId"],
//       _avg: {
//         value: true,
//       },
//       _count: {
//         id: true,
//       },
//     });
//     res.json(result);
//   } else {
//     res.status(400).json({ error: "Invalid action" });
//   }
// }

// pages/api/groupedAnswers.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { questionId } = req.query;
  console.log(questionId);

  if (typeof questionId !== "string") {
    res.status(400).json({ error: "Invalid questionId" });
    return;
  }

  try {
    const answers = await prisma.answer.findMany({
      where: { questionId },
    });
    console.log(answers);
    const groupedAnswers = await prisma.answer.groupBy({
      by: ["value"],
      where: { questionId },
      _count: {
        value: true,
      },
    });
    res.status(200).json(groupedAnswers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching grouped answers" });
  }
}
