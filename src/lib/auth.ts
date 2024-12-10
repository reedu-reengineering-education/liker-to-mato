import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { UserRole } from './auth/roles';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 Stunden
    updateAge: 60 * 60, // 1 Stunde
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || 'noreply@likert-o-mat.com',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.id = user.id;
        // Überprüfe, ob Benutzer bereits in der Datenbank existiert
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!dbUser) {
          // Erstelle neuen Benutzer mit Standardrolle
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              role: UserRole.RESEARCHER,
            },
          });
          token.id = newUser.id;
          token.role = newUser.role;
        } else {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      // Protokolliere erfolgreiche Anmeldungen
      console.log(`Benutzer angemeldet: ${user.email}`);
    },
    async signOut({ session }) {
      // Protokolliere Abmeldungen
      console.log(`Benutzer abgemeldet: ${session?.user?.email}`);
    },
  },
};
