import { withAuth } from 'next-auth/middleware';

// Geschützte Routen definieren
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/surveys/:path*',
    '/profile/:path*',
    '/plans/:path*',
  ],
};

// Einfache Middleware, die nur prüft, ob der Benutzer angemeldet ist
export default withAuth(
  function middleware(req) {
    return null; // Lässt NextAuth.js die Standard-Authentifizierung handhaben
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
