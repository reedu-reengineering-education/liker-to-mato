// import nodemailer from "nodemailer";
// import { generateEmailContent } from "./email-templates";

// export async function sendVerificationEmail(
//   email: string,
//   url: string,
//   provider: any,
//   from: string
// ) {
//   const { host } = new URL(url);
//   const { subject, text, html } = generateEmailContent(host, url);

//   const transport = nodemailer.createTransport(provider.server);

//   await transport.sendMail({
//     to: email,
//     from: provider.from,
//     subject,
//     text,
//     html,
//   });
// }
import { createTransport } from "nodemailer";

export async function sendVerificationEmail(
  email: string,
  url: string,
  provider: any,
) {
  const { host, port, auth } = provider.server;

  const transport = createTransport({
    host,
    port,
    auth: auth.user ? auth : null,
    secure: port === 465,
  });

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

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}
