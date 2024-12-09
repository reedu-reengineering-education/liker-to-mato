import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/send-verification-email";
import nodemailer from "nodemailer";

console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("NEXTAUTH_SECRET is set:", !!process.env.NEXTAUTH_SECRET);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
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
      from: process.env.EMAIL_FROM,
      maxAge: 5 * 60, // Magic links sind 5 Minuten gültig
      async sendVerificationRequest({ identifier: email, url, provider }) {
        console.log("Sending verification email to:", email);
        console.log("Verification URL:", url);
        console.log("Email server config:", provider.server);
        console.log("From address:", provider.from);

        try {
          const transport = nodemailer.createTransport(provider.server);
          const result = await transport.sendMail({
            to: email,
            from: provider.from,
            subject: `Sign in to ${process.env.NEXT_PUBLIC_APP_NAME}`,
            text: `Click this link to sign in: ${url}`,
            html: `
              <body>
                <h1>Sign in to ${process.env.NEXT_PUBLIC_APP_NAME}</h1>
                <p>Click this link to sign in:</p>
                <a href="${url}">${url}</a>
              </body>
            `,
          });
          console.log("Email sent result:", result);
        } catch (error) {
          console.error("Error sending email:", error);
          throw new Error("SEND_VERIFICATION_EMAIL_ERROR", { cause: error });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.email) {
        await prisma.user.update({
          where: { email: user.email },
          data: { lastLogin: new Date() },
        });
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
// export default NextAuth(authOptions);
// import NextAuth, { NextAuthOptions } from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import nodemailer from "nodemailer";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),

//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     EmailProvider({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: Number(process.env.EMAIL_SERVER_PORT),
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//       maxAge: 5 * 60, // 5 minutes
//       async sendVerificationRequest({ identifier: email, url, provider }) {
//         const { host } = new URL(url);
//         const transport = nodemailer.createTransport(provider.server);
//         await transport.sendMail({
//           to: email,
//           from: provider.from,
//           subject: `Anmeldung für ${host}`,
//           text: `Melden Sie sich an, indem Sie auf diesen Link klicken: ${url}`,
//           html: `
//             <!DOCTYPE html>
//             <html lang="de">
//               <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Anmeldung für ${host}</title>
//                 <style>
//                   body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
//                   .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
//                   h1 { color: #2c3e50; }
//                   .button { display: inline-block; background-color: #3498db; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; }
//                   .footer { margin-top: 20px; font-size: 0.8em; color: #7f8c8d; }
//                 </style>
//               </head>
//               <body>
//                 <div class="container">
//                   <h1>Anmeldung für ${host}</h1>
//                   <p>Vielen Dank für Ihr Interesse an unserem Service. Um sich anzumelden, klicken Sie bitte auf den folgenden Button:</p>
//                   <a href="${url}" class="button">Jetzt anmelden</a>
//                   <p>Wenn der Button nicht funktioniert, kopieren Sie bitte diesen Link in Ihren Browser:</p>
//                   <p>${url}</p>
//                   <div class="footer">
//                     <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht darauf.</p>
//                   </div>
//                 </div>
//               </body>
//             </html>
//           `,
//         });
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//     verifyRequest: "/auth/verify-request",
//     error: "/auth/error",
//   },
//   callbacks: {
//     async session({ token, session }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//       }

//       return session;
//     },
//     async jwt({ token, user }) {
//       const prismaUser = await prisma.user.findFirst({
//         where: {
//           email: token.email,
//         },
//       });

//       if (!prismaUser) {
//         if (user) {
//           token.id = user.id;
//         }
//         return token;
//       }

//       return {
//         id: prismaUser.id,
//         name: prismaUser.name,
//         email: prismaUser.email,
//         picture: prismaUser.image,
//       };
//     },
//   },
//   events: {
//     async signIn({ user }) {
//       // Aktualisieren des letzten Anmeldezeitpunkts
//       await prisma.user.update({
//         where: { id: user.id },
//         data: { lastLogin: new Date() },
//       });

//       // Überprüfen, ob es sich um einen neuen Benutzer handelt
//       const existingUser = await prisma.user.findUnique({
//         where: { id: user.id },
//         select: { createdAt: true },
//       });

//       if (existingUser && new Date().getTime() - existingUser.createdAt.getTime() < 5 * 60 * 1000) {
//         // Wenn der Benutzer in den letzten 5 Minuten erstellt wurde, senden Sie eine Willkommens-E-Mail
//         await sendWelcomeEmail(user.email);
//       }

//       console.log(`User ${user.email} logged in at ${new Date().toISOString()}`);
//     },
//   },
// };

// export default NextAuth(authOptions);

// async function sendWelcomeEmail(email: string) {
//   const transport = nodemailer.createTransport({
//     host: process.env.EMAIL_SERVER_HOST,
//     port: Number(process.env.EMAIL_SERVER_PORT),
//     auth: {
//       user: process.env.EMAIL_SERVER_USER,
//       pass: process.env.EMAIL_SERVER_PASSWORD,
//     },
//   });

//   await transport.sendMail({
//     to: email,
//     from: process.env.EMAIL_FROM,
//     subject: "Willkommen bei Likert-to-Mat",
//     text: "Vielen Dank für Ihre Anmeldung bei Likert-to-Mat. Wir freuen uns, Sie an Bord zu haben!",
//     html: `
//       <!DOCTYPE html>
//       <html lang="de">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Willkommen bei Likert-to-Mat</title>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
//             .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
//             h1 { color: #2c3e50; }
//             .footer { margin-top: 20px; font-size: 0.8em; color: #7f8c8d; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>Willkommen bei Likert-to-Mat</h1>
//             <p>Vielen Dank für Ihre Anmeldung bei Likert-to-Mat. Wir freuen uns, Sie an Bord zu haben!</p>
//             <p>Mit Likert-to-Mat können Sie ganz einfach Umfragen erstellen, durchführen und auswerten.</p>
//             <p>Bei Fragen stehen wir Ihnen jederzeit zur Verfügung.</p>
//             <div class="footer">
//               <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht darauf.</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `,
//   });
// }
