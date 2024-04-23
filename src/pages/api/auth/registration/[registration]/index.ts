import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId as string },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "PUT") {
    const { userId } = req.query;
    const { email } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId as string },
        data: {
          email,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "DELETE") {
    const { userId } = req.query;

    try {
      await prisma.user.delete({
        where: { id: userId as string },
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).end();
  }
}
