import { Resend } from 'resend';

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

  try {
    await resend.emails.send({
      from: 'Likert-O-Mat <noreply@likert-o-mat.com>',
      to: identifier,
      subject: 'Sign in to Likert-O-Mat',
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
                  margin-bottom: 10px !important;
                }
                table.body p,
                table.body ul,
                table.body ol,
                table.body td,
                table.body span,
                table.body a {
                  font-size: 16px !important;
                }
                table.body .wrapper,
                table.body .article {
                  padding: 10px !important;
                }
                table.body .content {
                  padding: 0 !important;
                }
                table.body .container {
                  padding: 0 !important;
                  width: 100% !important;
                }
                table.body .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important;
                }
                table.body .btn table {
                  width: 100% !important;
                }
                table.body .btn a {
                  width: 100% !important;
                }
              }
            </style>
          </head>
          <body style="background-color: #f6f9fc; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; width: 100%; background-color: #f6f9fc;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;">
                  <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                    <table role="presentation" class="main" style="border-collapse: separate; width: 100%; background: #ffffff; border-radius: 3px;">
                      <tr>
                        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%;">
                            <tr>
                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                <h1 style="color: #000000; font-family: sans-serif; font-weight: 300; line-height: 1.4; margin: 0; margin-bottom: 30px; font-size: 35px; text-align: center;">Sign in to Likert-O-Mat</h1>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Click the button below to sign in to Likert-O-Mat. This link will expire in 24 hours and can only be used once.</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; width: 100%; box-sizing: border-box;">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: auto;">
                                          <tbody>
                                            <tr>
                                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #0070f3;">
                                                <a href="${url}" target="_blank" style="border: solid 1px #0070f3; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #0070f3; border-color: #0070f3; color: #ffffff;">Sign in to Likert-O-Mat</a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Or copy and paste this URL into your browser:</p>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"><a href="${url}" style="color: #0070f3; text-decoration: underline;">${url}</a></p>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">If you didn't request this email, you can safely ignore it.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%;">
                        <tr>
                          <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;">
                            <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Likert-O-Mat Inc, 123 Street, City, Country</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
  } catch (error) {
    throw new Error('Failed to send verification email');
  }
};
