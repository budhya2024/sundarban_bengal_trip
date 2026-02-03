"use server";

import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendMail = async (data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  console.log(process.env.NODEMAILER_USER, process.env.NODEMAILER_PASS);
  const html = getContactEmailTemplate(data);
  try {
    const info = await transporter.sendMail({
      from: `"${data.name}" <${process.env.NODEMAILER_USER}>`,
      to: process.env.SITE_OWNER_EMAIL || process.env.NODEMAILER_USER,
      replyTo: data.email,
      subject: `[Website Inquiry] ${data.subject}`,
      html: html,
      connectionTimeout: 10000,
    });

    console.log("📧 Email sent: %s", info.messageId);

    return { success: true, info };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

function getContactEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">

            <div style="background-color: #064e3b; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 20px;">New Inquiry: ${data.subject}</h1>
            </div>

            <div style="padding: 30px; background-color: #ffffff;">
              <p style="color: #374151; font-size: 16px;">Hello Team,</p>
              <p style="color: #374151; font-size: 16px;">You have received a new message from the <b>Sundarban Bengal Trip</b> contact form.</p>

              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px; border-bottom: 1px solid #f3f4f6;">Guest Name:</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #f3f4f6;">Email:</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; border-bottom: 1px solid #f3f4f6;">
                    <a href="mailto:${data.email}" style="color: #064e3b; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-bottom: 1px solid #f3f4f6;">Phone:</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; border-bottom: 1px solid #f3f4f6;">
                    <a href="tel:${data.phone}" style="color: #064e3b; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 20px; background-color: #f9fafb; border-left: 4px solid #d97706; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold; color: #111827; margin-bottom: 8px;">Message Content:</p>
                <p style="margin: 0; color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>

            <div style="background-color: #f3f4f6; padding: 16px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb;">
              Sent via the Official Sundarban Bengal Trip Contact Form.
            </div>
          </div>
        </body>
    </html>`;
}
