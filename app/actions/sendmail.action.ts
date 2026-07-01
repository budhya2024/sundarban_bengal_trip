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
      from: `"${name || "Sundarban Bengal Trip"}" <${process.env.NODEMAILER_USER}>`,
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

// ─────────────────────────────────────────────────────────────────────────────
// Function 1: Contact Form — notify admin + send client confirmation
// ─────────────────────────────────────────────────────────────────────────────
export const sendContactInquiry = async (data: any) => {
  // 1️⃣ Email to admin
  await sendBaseEmail({
    to: process.env.SITE_OWNER_EMAIL || process.env.NODEMAILER_USER!,
    subject: `[Website Inquiry] ${data.subject}`,
    html: getContactEmailTemplate(data),
    replyTo: data.email,
    name: data.name,
  });

  // 2️⃣ Confirmation email to client
  return await sendBaseEmail({
    to: data.email,
    subject: `We've Received Your Message — Sundarban Bengal Trip`,
    html: getContactClientConfirmationTemplate(data),
    replyTo: process.env.SITE_OWNER_EMAIL || process.env.NODEMAILER_USER!,
    name: "Sundarban Bengal Trip",
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Function 2: Admin OTP Reset
// ─────────────────────────────────────────────────────────────────────────────
export const sendOtpMail = async (email: string, otp: string) => {
  const html = getOtpEmailTemplate(otp);
  return await sendBaseEmail({
    to: email,
    subject: `[Verification Code] Password Reset`,
    html: html,
    name: "Sundarban Security",
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Function 3: Booking Inquiry — notify admin + send client confirmation
// ─────────────────────────────────────────────────────────────────────────────
export const sendBookingInquiry = async (data: BookingValues) => {
  // 1️⃣ Email to admin
  return await sendBaseEmail({
    to: process.env.SITE_OWNER_EMAIL || process.env.NODEMAILER_USER!,
    subject: `[New Booking] ${data.package} - ${data.name}`,
    html: getBookingEmailTemplate(data),
    replyTo: data.email,
    name: data.name,
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Function 4: Newsletter Welcome Email
// ─────────────────────────────────────────────────────────────────────────────
export const sendNewsletterWelcome = async (email: string) => {
  return await sendBaseEmail({
    to: email,
    subject: `Welcome to Sundarban Bengal Trip — You're In! 🌿`,
    html: getNewsletterWelcomeTemplate(email),
    replyTo: process.env.SITE_OWNER_EMAIL || process.env.NODEMAILER_USER!,
    name: "Sundarban Bengal Trip",
  });
};

// =============================================================================
// EMAIL TEMPLATES
// =============================================================================

// ─── Shared Header & Footer Partials ─────────────────────────────────────────
const emailHeader = (title: string, subtitle?: string) => `
  <div style="background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%); padding: 40px 32px; text-align: center;">
    <div style="margin-bottom: 16px;">
      <span style="display: inline-block; background-color: rgba(255,255,255,0.15); color: #a7f3d0; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(167,243,208,0.3);">
        🌿 Sundarban Bengal Trip
      </span>
    </div>
    <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 26px; font-weight: 700; line-height: 1.3;">${title}</h1>
    ${subtitle ? `<p style="color: #a7f3d0; margin: 0; font-size: 14px; line-height: 1.5;">${subtitle}</p>` : ""}
  </div>
`;

const emailFooter = () => `
  <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 28px 32px; text-align: center;">
    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px;">
      Questions? Reach us at
      <a href="mailto:${process.env.NODEMAILER_USER}" style="color: #064e3b; text-decoration: none; font-weight: 600;">${process.env.NODEMAILER_USER}</a>
    </p>
    <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 12px;">
      Sundarban Bengal Trip · West Bengal, India
    </p>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 8px;">
      <p style="margin: 0; color: #cbd5e1; font-size: 11px;">
        © ${new Date().getFullYear()} Sundarban Bengal Trip. All Rights Reserved.
      </p>
    </div>
  </div>
`;

const emailWrapper = (content: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sundarban Bengal Trip</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 620px; margin: 32px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      ${content}
    </div>
    <p style="text-align: center; color: #cbd5e1; font-size: 11px; margin-top: 16px; font-family: sans-serif;">
      This email was sent by Sundarban Bengal Trip's automated system.
    </p>
  </body>
  </html>
`;

// ─── OTP Template ─────────────────────────────────────────────────────────────
function getOtpEmailTemplate(otp: string) {
  return emailWrapper(`
    ${emailHeader("Admin Security Code", "Use this code to reset your CMS password")}
    <div style="padding: 40px 32px; text-align: center;">
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
        Your one-time password expires in <strong style="color: #064e3b;">10 minutes</strong>. Do not share this code with anyone.
      </p>
      <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 2px dashed #86efac; padding: 24px 40px; border-radius: 14px; display: inline-block; margin: 0 auto;">
        <p style="margin: 0 0 6px 0; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Your OTP Code</p>
        <span style="font-size: 40px; font-weight: 800; letter-spacing: 10px; color: #064e3b; font-family: 'Courier New', monospace;">${otp}</span>
      </div>
      <p style="color: #94a3b8; font-size: 13px; margin: 24px 0 0 0;">
        If you did not request this code, please ignore this email.
      </p>
    </div>
    ${emailFooter()}
  `);
}

// ─── Admin: Contact Inquiry Template ─────────────────────────────────────────
function getContactEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return emailWrapper(`
    ${emailHeader(`New Inquiry: ${data.subject}`, "A visitor has sent a message via the contact form")}
    <div style="padding: 32px;">
      <p style="color: #1e293b; font-size: 15px; margin: 0 0 24px 0;">Hello Team,</p>
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 28px 0;">
        A new message has been received from the <strong style="color: #064e3b;">Sundarban Bengal Trip</strong> contact form. Please respond promptly.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
        <div style="background-color: #064e3b; padding: 10px 20px;">
          <p style="color: #a7f3d0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">Sender Information</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; width: 110px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Name</td>
            <td style="padding: 14px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Email</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9;">
              <a href="mailto:${data.email}" style="color: #064e3b; font-size: 14px; text-decoration: none; font-weight: 600;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; font-weight: 600;">Phone</td>
            <td style="padding: 14px 20px;">
              <a href="tel:${data.phone}" style="color: #064e3b; font-size: 14px; text-decoration: none; font-weight: 600;">${data.phone}</a>
            </td>
          </tr>
        </table>
      </div>

      <div style="background: linear-gradient(135deg, #fffbeb, #fef3c7); border-left: 4px solid #d97706; padding: 20px 24px; border-radius: 0 10px 10px 0; margin-bottom: 28px;">
        <p style="margin: 0 0 8px 0; font-weight: 700; color: #92400e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
        <p style="margin: 0; color: #78350f; line-height: 1.7; font-size: 15px; white-space: pre-wrap;">${data.message}</p>
      </div>

      <div style="text-align: center;">
        <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #064e3b, #047857); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">
          Reply to ${data.name}
        </a>
      </div>
    </div>
    ${emailFooter()}
  `);
}

// ─── Client: Contact Confirmation Template ────────────────────────────────────
function getContactClientConfirmationTemplate(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return emailWrapper(`
    ${emailHeader("Thank You for Reaching Out! 🙏", "We've received your message and will get back to you shortly")}
    <div style="padding: 32px;">
      <p style="color: #1e293b; font-size: 16px; margin: 0 0 16px 0; font-weight: 600;">Dear ${data.name},</p>
      <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
        Thank you for contacting <strong style="color: #064e3b;">Sundarban Bengal Trip</strong>. We have successfully received your inquiry and our team will respond to you within <strong>24–48 hours</strong>.
      </p>

      <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
        <p style="margin: 0 0 14px 0; color: #064e3b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Your Message Summary</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 7px 0; color: #64748b; font-size: 13px; width: 90px; font-weight: 600;">Subject</td>
            <td style="padding: 7px 0; color: #1e293b; font-size: 13px; font-weight: 600;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #64748b; font-size: 13px; font-weight: 600; vertical-align: top;">Message</td>
            <td style="padding: 7px 0; color: #374151; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
        <p style="margin: 0 0 16px 0; color: #1e293b; font-size: 14px; font-weight: 700;">🌿 Why Choose Sundarban Bengal Trip?</p>
        <ul style="margin: 0; padding-left: 0; list-style: none;">
          <li style="padding: 5px 0; color: #475569; font-size: 14px;">✅ Certified & experienced local guides</li>
          <li style="padding: 5px 0; color: #475569; font-size: 14px;">✅ Customized tour packages for every budget</li>
          <li style="padding: 5px 0; color: #475569; font-size: 14px;">✅ Safe, eco-friendly travel experience</li>
          <li style="padding: 5px 0; color: #475569; font-size: 14px;">✅ 100% satisfaction guaranteed</li>
        </ul>
      </div>

      <div style="border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0;">
        <div style="background-color: #064e3b; padding: 12px 20px;">
          <p style="color: #a7f3d0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">Need Immediate Assistance?</p>
        </div>
        <div style="padding: 16px 20px; background-color: #fafafa;">
          <p style="margin: 0 0 6px 0; color: #475569; font-size: 14px;">
            📞 Call us: <a href="tel:+919876543210" style="color: #064e3b; text-decoration: none; font-weight: 700;">+91 98765 43210</a>
          </p>
          <p style="margin: 0; color: #475569; font-size: 14px;">
            🌐 Visit: <a href="https://sundarbanbengaltrip.com" style="color: #064e3b; text-decoration: none; font-weight: 700;">sundarbanbengaltrip.com</a>
          </p>
        </div>
      </div>

      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0; text-align: center;">
        Warm regards,<br>
        <strong style="color: #064e3b;">The Sundarban Bengal Trip Team</strong>
      </p>
    </div>
    ${emailFooter()}
  `);
}

// ─── Admin: Booking Inquiry Template ─────────────────────────────────────────
function getBookingEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  package: string;
  status?: string;
}) {
  return emailWrapper(`
    ${emailHeader("New Booking Request 🏕️", `From ${data.name} · Status: ${data.status || "Pending"}`)}
    <div style="padding: 32px;">
      <p style="color: #1e293b; font-size: 15px; margin: 0 0 8px 0; font-weight: 600;">Hello Admin,</p>
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 28px 0;">
        A new tour booking inquiry has been submitted. Please review the details below and follow up with the guest.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
        <div style="background: linear-gradient(135deg, #064e3b, #047857); padding: 12px 20px;">
          <p style="color: #a7f3d0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">📦 Tour Package Details</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; width: 140px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Selected Package</td>
            <td style="padding: 14px 20px; color: #064e3b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 700;">${data.package}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Travel Date</td>
            <td style="padding: 14px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Number of Guests</td>
            <td style="padding: 14px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.guests} Person(s)</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; font-weight: 600;">Status</td>
            <td style="padding: 14px 20px;">
              <span style="display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; padding: 3px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">${data.status || "Pending"}</span>
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 28px;">
        <div style="background: linear-gradient(135deg, #064e3b, #047857); padding: 12px 20px;">
          <p style="color: #a7f3d0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">👤 Guest Information</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; width: 80px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Name</td>
            <td style="padding: 14px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Phone</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9;">
              <a href="tel:${data.phone}" style="color: #064e3b; font-size: 14px; text-decoration: none; font-weight: 600;">${data.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; color: #64748b; font-size: 13px; font-weight: 600;">Email</td>
            <td style="padding: 14px 20px;">
              <a href="mailto:${data.email}" style="color: #064e3b; font-size: 14px; text-decoration: none; font-weight: 600;">${data.email}</a>
            </td>
          </tr>
        </table>
      </div>

      <div style="text-align: center;">
        <a href="https://sundarbanbengaltrip.com/admin/inquiry" style="display: inline-block; background: linear-gradient(135deg, #064e3b, #047857); color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px; margin-right: 10px;">
          Manage Booking →
        </a>
        <a href="mailto:${data.email}" style="display: inline-block; background-color: #f1f5f9; color: #064e3b; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; border: 2px solid #064e3b;">
          Reply to Guest
        </a>
      </div>
    </div>
    ${emailFooter()}
  `);
}

// ─── Client: Booking Confirmation Template ────────────────────────────────────
function getBookingClientConfirmationTemplate(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  package: string;
  status?: string;
}) {
  return emailWrapper(`
    ${emailHeader("Booking Request Received! 🎉", "Your adventure to the Sundarbans is just a step away")}
    <div style="padding: 32px;">
      <p style="color: #1e293b; font-size: 16px; margin: 0 0 16px 0; font-weight: 600;">Dear ${data.name},</p>
      <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
        We're thrilled to receive your booking inquiry! Our team at <strong style="color: #064e3b;">Sundarban Bengal Trip</strong> will review your request and contact you within <strong>24 hours</strong> to confirm your booking and discuss further details.
      </p>

      <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #bbf7d0; border-radius: 14px; padding: 24px; margin-bottom: 28px;">
        <p style="margin: 0 0 16px 0; color: #064e3b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">📋 Your Booking Summary</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 13px; width: 130px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">Package</td>
            <td style="padding: 9px 0; color: #064e3b; font-size: 14px; font-weight: 700; border-bottom: 1px solid #bbf7d0;">${data.package}</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 13px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">Travel Date</td>
            <td style="padding: 9px 0; color: #1e293b; font-size: 14px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">📅 ${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 13px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">Guests</td>
            <td style="padding: 9px 0; color: #1e293b; font-size: 14px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">👥 ${data.guests} Person(s)</td>
          </tr>
          <tr>
            <td style="padding: 9px 0; color: #64748b; font-size: 13px; font-weight: 600;">Status</td>
            <td style="padding: 9px 0;">
              <span style="display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">⏳ Under Review</span>
            </td>
          </tr>
        </table>
      </div>

      <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; margin-bottom: 28px;">
        <div style="background-color: #1e293b; padding: 14px 20px;">
          <p style="color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">🗓️ What Happens Next?</p>
        </div>
        <div style="padding: 20px 24px; background-color: #fafafa;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; vertical-align: top; width: 30px; color: #064e3b; font-size: 18px;">①</td>
              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.5;">Our travel expert will call you to confirm availability and discuss your requirements.</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top; color: #064e3b; font-size: 18px;">②</td>
              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.5;">We'll send you a detailed itinerary and pricing breakdown tailored to your group.</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top; color: #064e3b; font-size: 18px;">③</td>
              <td style="padding: 8px 0; color: #475569; font-size: 14px; line-height: 1.5;">Upon payment confirmation, your booking will be officially secured. 🎉</td>
            </tr>
          </table>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #064e3b, #065f46); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
        <p style="color: #a7f3d0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Need to reach us?</p>
        <p style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 4px 0;">
          <a href="https://sundarbanbengaltrip.com" style="color: #ffffff; text-decoration: none;">sundarbanbengaltrip.com</a>
        </p>
        <p style="color: #6ee7b7; font-size: 14px; margin: 0;">📧 ${process.env.NODEMAILER_USER || "info@sundarbanbengaltrip.com"}</p>
      </div>

      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;">
        We look forward to making your Sundarban adventure unforgettable!<br><br>
        Warm regards,<br>
        <strong style="color: #064e3b; font-size: 15px;">The Sundarban Bengal Trip Team</strong>
      </p>
    </div>
    ${emailFooter()}
  `);
}

// ─── Client: Newsletter Welcome Template ──────────────────────────────────────
function getNewsletterWelcomeTemplate(email: string) {
  return emailWrapper(`
    ${emailHeader("Welcome to the Family! 🌿", "You're now subscribed to Sundarban Bengal Trip newsletters")}
    <div style="padding: 32px;">
      <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0; text-align: center;">
        Thank you for subscribing! You'll be the <strong style="color: #064e3b;">first to know</strong> about exclusive tour deals, travel tips, and the latest news from the world's largest mangrove forest.
      </p>

      <div style="display: grid; margin-bottom: 28px;">
        <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px 24px; margin-bottom: 12px;">
          <p style="margin: 0 0 6px 0; font-size: 20px;">🏕️</p>
          <p style="margin: 0 0 4px 0; color: #064e3b; font-size: 14px; font-weight: 700;">Exclusive Tour Packages</p>
          <p style="margin: 0; color: #4b5563; font-size: 13px;">Get early access to seasonal offers and subscriber-only discounts.</p>
        </div>
        <div style="background: linear-gradient(135deg, #fffbeb, #fef3c7); border: 1px solid #fde68a; border-radius: 12px; padding: 20px 24px; margin-bottom: 12px;">
          <p style="margin: 0 0 6px 0; font-size: 20px;">📸</p>
          <p style="margin: 0 0 4px 0; color: #92400e; font-size: 14px; font-weight: 700;">Travel Inspiration</p>
          <p style="margin: 0; color: #4b5563; font-size: 13px;">Stunning photography, stories, and guides from the Sundarbans.</p>
        </div>
        <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 1px solid #bae6fd; border-radius: 12px; padding: 20px 24px;">
          <p style="margin: 0 0 6px 0; font-size: 20px;">🗺️</p>
          <p style="margin: 0 0 4px 0; color: #0369a1; font-size: 14px; font-weight: 700;">Travel Tips & Guides</p>
          <p style="margin: 0; color: #4b5563; font-size: 13px;">Expert advice to help you plan the perfect Sundarban trip.</p>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 28px;">
        <a href="https://sundarbanbengaltrip.com/packages" style="display: inline-block; background: linear-gradient(135deg, #064e3b, #047857); color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">
          Browse Tour Packages 🌿
        </a>
      </div>

      <div style="border-radius: 10px; border: 1px dashed #d1d5db; padding: 16px 20px; text-align: center; margin-bottom: 8px;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">
          You're subscribed as <strong style="color: #64748b;">${email}</strong>.<br>
          You can unsubscribe at any time by contacting us.
        </p>
      </div>
    </div>
    ${emailFooter()}
  `);
}
