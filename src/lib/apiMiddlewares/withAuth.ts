import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@/lib/auth/roles';

// Extend NextApiRequest to include user context
declare module 'next' {
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
          error: 'Nicht authentifiziert',
          code: 'UNAUTHORIZED',
        });
      }

      // Benutzerkontext zur Anfrage hinzufügen
      req.user = {
        id: session.user.id,
        role: UserRole.RESEARCHER, // Immer RESEARCHER
        email: session.user.email!,
      };

      return handler(req, res);
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return res.status(500).json({
        error: 'Interner Server-Fehler',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  };
}

// Vereinfachte Middleware für Berechtigungen - erlaubt immer Zugriff für authentifizierte Benutzer
export function withPermission(permission: { action: string; subject: string }) {
  return function (handler: NextApiHandler) {
    return withAuthentication(async function (req: NextApiRequest, res: NextApiResponse) {
      return handler(req, res);
    });
  };
}
