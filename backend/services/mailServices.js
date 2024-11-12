import nodemailer from "nodemailer";
import { google } from "googleapis";
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const {
  SMTP_USER,
  // SMTP_PASS,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
} = process.env;

// console.log({
//   SMTP_USER,
//   // SMTP_PASS,
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI,
//   REFRESH_TOKEN,
// });

// OAuth2 configuration
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI // Redirect URL (if you used OAuth Playground)
);

// // Set the refresh token you generated
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(mailTo) {
  console.log(mailTo);
  try {
    // generate accesstoken if expires
    const ACCESS_TOKEN = await oauth2Client.getAccessToken();

    // send mail with defined transport object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SMTP_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN, // Use the newly generated access token
      },
      tls: {
        rejectUnauthorized: true,
      },
      debug: true,
    });

    // Define the email options
    const mailOptions = {
      from: SMTP_USER,
      to: mailTo,
      subject: "Test Email",
      text: "This is a test email sent using OAuth2!",
      html: "<b>Hello world?</b>", // html body
    };

    const result = await transporter.sendMail(mailOptions);

    console.log("Email sent:", result);

    return result;
  } catch (error) {
    console.log(error);
  }
}
