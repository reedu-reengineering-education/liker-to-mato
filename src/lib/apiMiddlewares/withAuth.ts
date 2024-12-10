import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserRole, Permission, rolePermissions } from "@/lib/auth/roles";

// Extend NextApiRequest to include user context
declare module "next" {
  interface NextApiRequest {
    user?: {
      id: string;
      role: UserRole;
      email: string;
    };
  }
}

export function withAuthentication(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user) {
        return res.status(401).json({
          error: "Nicht authentifiziert",
          code: "UNAUTHORIZED",
        });
      }

      // Benutzerkontext zur Anfrage hinzufügen
      req.user = {
        id: session.user.id,
        role: session.user.role as UserRole,
        email: session.user.email!,
      };

      return handler(req, res);
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(500).json({
        error: "Interner Server-Fehler",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };
}

export function withPermission(permission: Permission) {
  return function (handler: NextApiHandler) {
    return withAuthentication(async function (
      req: NextApiRequest,
      res: NextApiResponse,
    ) {
      const userRole = req.user?.role || UserRole.USER;
      const userPermissions = rolePermissions[userRole];

      const hasPermission = userPermissions.some(
        (p) =>
          (p.action === "*" && p.subject === "*") ||
          (p.action === permission.action && p.subject === permission.subject),
      );

      if (!hasPermission) {
        return res.status(403).json({
          error: "Keine Berechtigung",
          code: "FORBIDDEN",
        });
      }

      return handler(req, res);
    });
  };
}
