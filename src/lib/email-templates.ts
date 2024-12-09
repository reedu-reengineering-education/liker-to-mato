// export function generateEmailContent(host: string, url: string) {
//   return {
//     subject: `Anmeldung für ${host}`,
//     text: `Melden Sie sich an, indem Sie auf diesen Link klicken: ${url}`,
//     html: `
//         <!DOCTYPE html>
//         <html lang="de">
//           <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Anmeldung für ${host}</title>
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
//               .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
//               h1 { color: #2c3e50; }
//               .button { display: inline-block; background-color: #3498db; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; }
//               .footer { margin-top: 20px; font-size: 0.8em; color: #7f8c8d; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h1>Anmeldung für ${host}</h1>
//               <p>Vielen Dank für Ihr Interesse an unserem Service. Um sich anzumelden, klicken Sie bitte auf den folgenden Button:</p>
//               <a href="${url}" class="button">Jetzt anmelden</a>
//               <p>Wenn der Button nicht funktioniert, kopieren Sie bitte diesen Link in Ihren Browser:</p>
//               <p>${url}</p>
//               <div class="footer">
//                 <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht darauf.</p>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//   };
// }
export function generateEmailContent(host: string, url: string) {
  const token = new URL(url).searchParams.get("token");

  const dashboardUrl = `${host}/dashboard?token=${token}`;

  return {
    subject: `Anmeldung für ${host}`,
    text: `Melden Sie sich an, indem Sie auf diesen Link klicken: ${dashboardUrl}`,
    html: `
      <!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Anmeldung für ${host}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
            
            body, html {
              font-family: 'Roboto', Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .wrapper {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              box-sizing: border-box;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .logo {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo img {
              max-width: 150px;
              height: auto;
            }
            h1 {
              color: #2c3e50;
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 20px;
              text-align: center;
            }
            p {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background-color: #3498db;
              color: #ffffff !important;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 5px;
              font-weight: 700;
              text-align: center;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #2980b9;
            }
            .button-container {
              text-align: center;
              margin: 30px 0;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 14px;
              color: #7f8c8d;
            }
            @media only screen and (max-width: 600px) {
              .container {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="logo">
                <img src="https://example.com/logo.png" alt="${host} Logo" />
              </div>
              <h1>Willkommen bei ${host}</h1>
              <p>Vielen Dank für Ihr Interesse an unserem Service. Um Ihre Anmeldung abzuschließen und Zugang zu Ihrem Konto zu erhalten, klicken Sie bitte auf den folgenden Button:</p>
              <div class="button-container">
                <a href="${dashboardUrl}" class="button">Anmeldung bestätigen</a>
              </div>
              <p>Wenn der Button nicht funktioniert, kopieren Sie bitte diesen Link in Ihren Browser:</p>
              <p style="word-break: break-all;">${dashboardUrl}</p>
              <p>Aus Sicherheitsgründen ist dieser Link nur für begrenzte Zeit gültig. Sollte er ablaufen, können Sie jederzeit einen neuen Anmeldelink anfordern.</p>
              <div class="footer">
                <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht darauf.</p>
                <p>&copy; 2024 ${host}. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}
