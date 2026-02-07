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

/**
 * Generic Email Engine
 */
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

function getContactEmailTemplate(data: any) {
  /* Your existing 1970s / Green template code here */
  return `...`;
}
