import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Definiere geschützte Routen und ihre erforderlichen Rollen
const protectedRoutes = {
  "/dashboard": ["USER", "ADMIN", "RESEARCHER"],
  "/account": ["USER", "ADMIN", "RESEARCHER"],
  "/surveys": ["USER", "ADMIN", "RESEARCHER"],
  "/admin": ["ADMIN"],
  "/researcher": ["RESEARCHER", "ADMIN"],
};

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const path = req.nextUrl.pathname;

    // Prüfe, ob die Route geschützt ist
    const isProtectedRoute = Object.keys(protectedRoutes).some((route) =>
      path.startsWith(route),
    );

    if (!isProtectedRoute) {
      return NextResponse.next();
    }

    // Wenn nicht authentifiziert, zur Login-Seite weiterleiten
    if (!isAuth) {
      const searchParams = new URLSearchParams({
        error: "Unauthorized",
        returnUrl: path,
      });

      return NextResponse.redirect(
        new URL(`/auth/signin?${searchParams.toString()}`, req.url),
      );
    }

    // Prüfe rollenbasierte Berechtigungen
    const userRole = token.role as string;
    const requiredRoles = Object.entries(protectedRoutes).find(([route]) =>
      path.startsWith(route),
    )?.[1];

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }

    // CSRF-Schutz Header
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    );

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/surveys/:path*",
    "/admin/:path*",
    "/researcher/:path*",
    "/api/protected/:path*",
  ],
};
