"use server";

import { BookingValues } from "@/schemas/booking.schema";
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

const sendBaseEmail = async ({
  to,
  subject,
  html,
  replyTo,
  name,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  name?: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"${name || "Sundarban Trips"}" <${process.env.NODEMAILER_USER}>`,
      to: to,
      replyTo: replyTo,
      subject: subject,
      html: html,
      connectionTimeout: 10000,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("📧 Email Error:", error);
    return { success: false };
  }
};

/**
 * Function 1: Contact Form (Your existing logic)
 */
export const sendContactInquiry = async (data: any) => {
  const html = getContactEmailTemplate(data);
  return await sendBaseEmail({
    to: process.env.SITE_OWNER_EMAIL || process.env.NODEMAILER_USER!,
    subject: `[Website Inquiry] ${data.subject}`,
    html: html,
    replyTo: data.email,
    name: data.name,
  });
};

/**
 * Function 2: Admin OTP Reset (New logic)
 */
export const sendOtpMail = async (email: string, otp: string) => {
  const html = getOtpEmailTemplate(otp);
  return await sendBaseEmail({
    to: email,
    subject: `[Verification Code] Password Reset`,
    html: html,
    name: "Sundarban Security",
  });
};

export const sendBookingInquiry = async (data: BookingValues) => {
  const html = getBookingEmailTemplate(data);

  return await sendBaseEmail({
    to: process.env.SITE_OWNER_EMAIL || process.env.NODEMAILER_USER!,
    subject: `[New Booking] ${data.package} - ${data.name}`,
    html: html,
    replyTo: data.email,
    name: data.name,
  });
};

// --- Templates ---

function getOtpEmailTemplate(otp: string) {
  return `
    <div style="max-width: 500px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; font-family: sans-serif; overflow: hidden;">
        <div style="background-color: #064e3b; padding: 25px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Admin Reset Code</h1>
        </div>
        <div style="padding: 40px; text-align: center;">
          <p style="color: #4b5563; font-size: 16px;">Use this code to reset your CMS password. It expires in 10 minutes.</p>
          <div style="background-color: #f9fafb; border: 2px dashed #d1d5db; padding: 15px 30px; border-radius: 12px; display: inline-block; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #064e3b; font-family: monospace;">${otp}</span>
          </div>
        </div>
    </div>`;
}

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

function getBookingEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  package: string;
  status?: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">

            <div style="background-color: #064e3b; padding: 32px 24px; text-align: center;">
              <div style="display: inline-block; background-color: #d97706; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
                ${data.status || "Pending"} Request
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Booking Inquiry</h1>
              <p style="color: #a7f3d0; margin-top: 8px; font-size: 14px;">Sundarban Bengal Trip</p>
            </div>

            <div style="padding: 32px;">
              <p style="color: #1f2937; font-size: 16px; margin-bottom: 24px;">Hello Admin,</p>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.5;">A new guest has requested a booking. Here are the tour details:</p>

              <div style="background-color: #f8fafc; border: 1px solid #edf2f7; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding-bottom: 12px; color: #64748b; font-size: 13px; width: 40%;">Selected Package</td>
                    <td style="padding-bottom: 12px; color: #064e3b; font-size: 14px; font-weight: bold; text-align: right;">${data.package}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #64748b; font-size: 13px; border-top: 1px solid #e2e8f0;">Travel Date</td>
                    <td style="padding: 12px 0; color: #1f2937; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #e2e8f0;">${data.date}</td>
                  </tr>
                  <tr>
                    <td style="padding-top: 12px; color: #64748b; font-size: 13px; border-top: 1px solid #e2e8f0;">Number of Guests</td>
                    <td style="padding-top: 12px; color: #1f2937; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #e2e8f0;">${data.guests} Person(s)</td>
                  </tr>
                </table>
              </div>

              <h3 style="color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; border-bottom: 2px solid #064e3b; display: inline-block; padding-bottom: 4px;">Guest Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #4b5563; font-size: 14px;">Name:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4b5563; font-size: 14px;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    <a href="tel:${data.phone}" style="color: #064e3b; text-decoration: none; font-weight: 500;">${data.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4b5563; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                    <a href="mailto:${data.email}" style="color: #064e3b; text-decoration: none; font-weight: 500;">${data.email}</a>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 32px; text-align: center;">
                <a href="https://sundarbanbengaltrip.com/admin/inquiry" style="background-color: #064e3b; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">Manage Booking</a>
              </div>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 11px; border-top: 1px solid #e5e7eb;">
              This is an automated notification from the Sundarban Bengal Trip booking engine. 
              <br>© 2026 Sundarban Bengal Trip. All Rights Reserved.
            </div>
          </div>
        </body>
    </html>`;
}
