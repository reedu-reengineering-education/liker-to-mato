// // path: src/lib/apiMiddlewares/withAuth.ts
// import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";

// import authOptions from "@/pages/api/auth/[...nextauth]";

// export function withAuthentication(handler: NextApiHandler) {
//   return async function (req: NextApiRequest, res: NextApiResponse) {
//     const session = await getServerSession(req, res, authOptions);

//     if (!session) {
//       return res.status(403).end();
//     }

//     return handler(req, res);
//   };
// }
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// Extend NextApiRequest to include userId
declare module "next" {
  interface NextApiRequest {
    userId?: string;
  }
}
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export function withAuthentication(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      // Überprüfen Sie, ob ein Token in der Anfrage vorhanden ist
      const token = req.query.token || req.body.token;

      if (token) {
        // Wenn ein Token vorhanden ist, leiten Sie zur Dashboard-Seite weiter
        return res.redirect(`/dashboard?token=${token}`);
      }

      // Wenn kein Token und keine Session vorhanden ist, verweigern Sie den Zugriff
      return res.status(403).json({ error: "Nicht authentifiziert" });
    }

    // Fügen Sie die Benutzer-ID zur Anfrage hinzu
    req.userId = session.user.id;

    return handler(req, res);
  };
}
