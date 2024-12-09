import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface MiddlewareRequest extends NextRequest {
  url: string;
}

export async function middleware(
  req: MiddlewareRequest,
): Promise<NextResponse> {
  console.log("Middleware executing for:", req.url);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token in middleware:", token);

  if (!token) {
    console.log("No token found, redirecting to signin");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/survey", "/api/question", "/dashboard"],
};
