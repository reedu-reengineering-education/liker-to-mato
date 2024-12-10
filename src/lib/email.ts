import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationRequest = async ({
  identifier,
  url,
  provider,
}: {
  identifier: string;
  url: string;
  provider: any;
}) => {
  const { host } = new URL(url);

  console.log("Attempting to send verification email:", {
    to: identifier,
    host,
    resendKey: process.env.RESEND_API_KEY ? "Present" : "Missing",
  });

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: identifier,
      subject: "Sign in to Likert-O-Mat",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Sign in to Likert-O-Mat</title>
            <style>
              @media only screen and (max-width: 620px) {
                table.body h1 {
                  font-size: 28px !important;
                }
              }
            </style>
          </head>
          <body>
            <h1>Sign in to Likert-O-Mat</h1>
            <p>Click the link below to sign in:</p>
            <p><a href="${url}">${url}</a></p>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
