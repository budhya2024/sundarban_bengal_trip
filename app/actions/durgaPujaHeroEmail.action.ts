"use server";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import "dotenv/config";
import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────────────────────────
// Nodemailer Transporter Setup (Using Gmail App Password from Environment)
// ─────────────────────────────────────────────────────────────────────────────
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

export interface DurgaPujaHeroBookingData {
  name: string;
  email: string;
  phone: string;
  date?: string;
  guests?: string;
  package?: string;
  offer?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Email Sending Helper
// ─────────────────────────────────────────────────────────────────────────────
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
    console.error("📧 Durga Puja Email Error:", error);
    return { success: false, error };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Action: Submit Durga Puja Hero Booking & Send Emails
// ─────────────────────────────────────────────────────────────────────────────
export const sendDurgaPujaHeroEmail = async (data: DurgaPujaHeroBookingData) => {
  const packageName = data.package || "Sundarban Durga Puja Special (3D/2N)";
  const travelDate = data.date || "Durga Puja 2026";
  const guestCount = data.guests || "২ - ৪ জন";

  // 1️⃣ Save booking record into database
  try {
    await db.insert(bookings).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: travelDate,
      guests: guestCount,
      package: packageName,
      status: "pending",
      adminNotes: "Submitted via Durga Puja Hero Section Form (20% Flat Discount Offer)",
    });
  } catch (dbErr) {
    console.error("Database insert error (Durga Puja booking):", dbErr);
  }

  // 2️⃣ Send notification email to Admin / Site Owner
  const adminSubject = `[Durga Puja 20% OFF Booking] ${data.name} - ${packageName}`;
  const adminHtml = getDurgaPujaAdminEmailTemplate({
    ...data,
    package: packageName,
    date: travelDate,
    guests: guestCount,
  });

  const recipientEmail =
    process.env.SITE_OWNER_EMAIL ||
    process.env.NODEMAILER_USER ||
    "sundarbanbengaltrip@gmail.com";

  const adminEmailResult = await sendBaseEmail({
    to: recipientEmail,
    subject: adminSubject,
    html: adminHtml,
    replyTo: data.email,
    name: data.name,
  });

  // 3️⃣ Send confirmation email to Customer
  let clientEmailResult = { success: true };
  if (data.email && data.email.includes("@")) {
    const clientSubject = `🌸 পূজা স্পেশাল বুকিং কনফার্মেশন — Sundarban Bengal Trip`;
    const clientHtml = getDurgaPujaClientEmailTemplate({
      ...data,
      package: packageName,
      date: travelDate,
      guests: guestCount,
    });

    clientEmailResult = await sendBaseEmail({
      to: data.email,
      subject: clientSubject,
      html: clientHtml,
      replyTo: recipientEmail,
      name: "Sundarban Bengal Trip",
    });
  }

  return {
    success: true,
    message: "Booking submitted and email notifications sent successfully",
    adminSent: adminEmailResult.success,
    clientSent: clientEmailResult.success,
  };
};

// =============================================================================
// EMAIL TEMPLATES & DESIGN SYSTEM (Matching previous design)
// =============================================================================

// ─── Shared Header & Footer Partials ─────────────────────────────────────────
const emailHeader = (title: string, subtitle?: string) => `
  <div style="background: linear-gradient(135deg, #991b1b 0%, #b91c1c 45%, #064e3b 100%); padding: 38px 28px; text-align: center;">
    <div style="margin-bottom: 14px;">
      <span style="display: inline-block; background-color: rgba(255,255,255,0.18); color: #fef08a; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(254,240,138,0.4);">
        🪔 সুন্দরবন দুর্গাপূজা স্পেশাল ২০% ছাড়
      </span>
    </div>
    <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 24px; font-weight: 800; line-height: 1.3;">${title}</h1>
    ${subtitle ? `<p style="color: #fed7aa; margin: 0; font-size: 14px; line-height: 1.5; font-weight: 500;">${subtitle}</p>` : ""}
  </div>
`;

const emailFooter = () => `
  <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 26px 28px; text-align: center;">
    <p style="margin: 0 0 6px 0; color: #64748b; font-size: 13px;">
      যেকোনো প্রয়োজনে যোগাযোগ করুন:
      <a href="mailto:${process.env.NODEMAILER_USER}" style="color: #b91c1c; text-decoration: none; font-weight: 700;">${process.env.NODEMAILER_USER}</a>
    </p>
    <p style="margin: 0 0 12px 0; color: #475569; font-size: 13px; font-weight: 600;">
      📞 হেল্পলাইন: <a href="tel:+917586889519" style="color: #064e3b; text-decoration: none;">+91 75868 89519</a>
    </p>
    <p style="margin: 0 0 14px 0; color: #94a3b8; font-size: 12px;">
      Sundarban Bengal Trip · West Bengal, India
    </p>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 14px;">
      <p style="margin: 0; color: #cbd5e1; font-size: 11px;">
        © ${new Date().getFullYear()} Sundarban Bengal Trip. All Rights Reserved.
      </p>
    </div>
  </div>
`;

const emailWrapper = (content: string) => `
  <!DOCTYPE html>
  <html lang="bn">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sundarban Bengal Trip - Durga Puja Special</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 620px; margin: 28px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      ${content}
    </div>
    <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 16px; font-family: sans-serif;">
      This email was sent by Sundarban Bengal Trip's automated booking engine.
    </p>
  </body>
  </html>
`;

// ─── 1. Admin Email Template ─────────────────────────────────────────────────
function getDurgaPujaAdminEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  date?: string;
  guests?: string;
  package?: string;
}) {
  const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "");

  return emailWrapper(`
    ${emailHeader("নতুন দুর্গাপূজা বুকিং অনুরোধ! 🪔", "Hero Section ফর্ম থেকে নতুন স্পেশাল বুকিং এসেছে")}
    
    <div style="padding: 30px 28px;">
      
      <!-- Offer Badge -->
      <div style="background: linear-gradient(135deg, #fffbeb, #fef3c7); border-left: 4px solid #d97706; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 22px;">
        <span style="color: #92400e; font-size: 13px; font-weight: 700;">
          🎉 অফার প্রযোজ্য: আজই বুকিংয়ে ২০% ফ্ল্যাট ছাড়
        </span>
      </div>

      <p style="color: #1e293b; font-size: 15px; margin: 0 0 16px 0; font-weight: 600;">Hello Admin Team,</p>
      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
        দুর্গাপূজা ল্যান্ডিং পেজের হিরো সেকশন থেকে একজন নতুন পর্যটক বুকিং অনুরোধ জমা দিয়েছেন। অনুগ্রহ করে অবিলম্বে পর্যটকের সাথে যোগাযোগ করুন।
      </p>

      <!-- Package Info Box -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 22px;">
        <div style="background: linear-gradient(135deg, #991b1b, #b91c1c); padding: 10px 18px;">
          <p style="color: #fee2e2; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">ট্যুর প্যাকেজ বিবরণ</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 18px; color: #64748b; font-size: 13px; width: 130px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">প্যাকেজ</td>
            <td style="padding: 12px 18px; color: #991b1b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 700;">${data.package}</td>
          </tr>
          <tr>
            <td style="padding: 12px 18px; color: #64748b; font-size: 13px; width: 130px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">যাত্রার তারিখ</td>
            <td style="padding: 12px 18px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.date || "শীঘ্রই / Durga Puja 2026"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 18px; color: #64748b; font-size: 13px; font-weight: 600;">যাত্রী সংখ্যা</td>
            <td style="padding: 12px 18px; color: #1e293b; font-size: 14px; font-weight: 600;">${data.guests || "২ - ৪ জন"}</td>
          </tr>
        </table>
      </div>

      <!-- Guest Contact Details Box -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
        <div style="background: linear-gradient(135deg, #064e3b, #047857); padding: 10px 18px;">
          <p style="color: #a7f3d0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0;">পর্যটকের যোগাযোগের তথ্য</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 18px; color: #64748b; font-size: 13px; width: 130px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">নাম</td>
            <td style="padding: 12px 18px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #f1f5f9; font-weight: 700;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 18px; color: #64748b; font-size: 13px; width: 130px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">মোবাইল নম্বর</td>
            <td style="padding: 12px 18px; border-bottom: 1px solid #f1f5f9;">
              <a href="tel:${data.phone}" style="color: #064e3b; font-size: 14px; text-decoration: none; font-weight: 700;">📞 ${data.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 18px; color: #64748b; font-size: 13px; font-weight: 600;">ইমেল</td>
            <td style="padding: 12px 18px;">
              <a href="mailto:${data.email}" style="color: #064e3b; font-size: 14px; text-decoration: none; font-weight: 600;">✉️ ${data.email}</a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Quick Action CTA Buttons -->
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px; text-align: center; width: 50%;">
            <a href="tel:${data.phone}" style="display: block; background-color: #991b1b; color: #ffffff; padding: 12px 18px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; text-align: center;">
              📞 এখনই কল করুন
            </a>
          </td>
          <td style="padding: 6px; text-align: center; width: 50%;">
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`নমস্কার ${data.name}! সুন্দরবন দুর্গাপূজা স্পেশাল ট্যুর প্যাকেজে আগ্রহ দেখানোর জন্য ধন্যবাদ।`)}" style="display: block; background-color: #16a34a; color: #ffffff; padding: 12px 18px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; text-align: center;">
              💬 WhatsApp-এ লিখুন
            </a>
          </td>
        </tr>
      </table>

    </div>

    ${emailFooter()}
  `);
}

// ─── 2. Client Confirmation Email Template ───────────────────────────────────
function getDurgaPujaClientEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  date?: string;
  guests?: string;
  package?: string;
}) {
  return emailWrapper(`
    ${emailHeader("শারদীয়ার শুভেচ্ছা ও অভিনন্দন! 🌸", "আপনার সুন্দরবন দুর্গাপূজা স্পেশাল ট্যুর বুকিং অনুরোধ গ্রহণ করা হয়েছে")}
    
    <div style="padding: 30px 28px;">
      <p style="color: #1e293b; font-size: 16px; margin: 0 0 14px 0; font-weight: 700;">প্রিয় ${data.name},</p>
      
      <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 20px 0;">
        <strong style="color: #991b1b;">Sundarban Bengal Trip</strong>-এ আপনার দুর্গাপূজা ট্যুর বুকিংয়ের অনুরোধ সফলভাবে জমা হয়েছে। আমাদের ট্রাভেল বিশেষজ্ঞ খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন এবং আপনার ট্যুর কনফার্ম করবেন।
      </p>

      <!-- 20% Offer Alert Box -->
      <div style="background: linear-gradient(135deg, #fef2f2, #fee2e2); border: 1px solid #fca5a5; border-radius: 12px; padding: 16px 20px; margin-bottom: 22px;">
        <p style="margin: 0 0 4px 0; color: #991b1b; font-size: 13px; font-weight: 800;">
          🎁 পূজো স্পেশাল অফার লক করা হয়েছে!
        </p>
        <p style="margin: 0; color: #7f1d1d; font-size: 13px; line-height: 1.5;">
          আজই বুকিং করায় আপনি পাচ্ছেন <strong>২০% ফ্ল্যাট ছাড়</strong>।
        </p>
      </div>

      <!-- Booking Summary Box -->
      <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="margin: 0 0 14px 0; color: #064e3b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">আপনার বুকিংয়ের সংক্ষিপ্ত বিবরণ</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">প্যাকেজ</td>
            <td style="padding: 8px 0; color: #064e3b; font-size: 13px; font-weight: 700; border-bottom: 1px solid #bbf7d0;">${data.package}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">যাত্রার তারিখ</td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 13px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">${data.date || "শীঘ্রই"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">যাত্রী সংখ্যা</td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 13px; font-weight: 600; border-bottom: 1px solid #bbf7d0;">${data.guests || "২ - ৪ জন"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">স্ট্যাটাস</td>
            <td style="padding: 8px 0;">
              <span style="display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 20px; text-transform: uppercase;">
                অপেক্ষারত (Under Review)
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Features Box -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
        <p style="margin: 0 0 12px 0; color: #1e293b; font-size: 13px; font-weight: 700;">🌟 আমাদের বিশেষ সুবিধাসমূহ:</p>
        <ul style="margin: 0; padding-left: 0; list-style: none; font-size: 13px; color: #475569;">
          <li style="padding: 4px 0;">✅ নদী তীরবর্তী আধুনিক রিসর্ট ও প্রিমিয়াম হাউসবোট</li>
          <li style="padding: 4px 0;">✅ পূজোর রাজকীয় ভূরিভোজ (ইলিশ, চিংড়ি, ভেটকি ও মাটন)</li>
          <li style="padding: 4px 0;">✅ অভিজ্ঞ ও সরকারি অনুমোদিত স্থানীয় গাইড</li>
          <li style="padding: 4px 0;">✅ সম্পূর্ণ নিরাপদ পারিবারিক ট্যুর প্যাকেজ</li>
        </ul>
      </div>

      <!-- Direct Contact CTA -->
      <div style="text-align: center; margin-bottom: 10px;">
        <a href="https://wa.me/917586889519?text=${encodeURIComponent(`নমস্কার! আমি সুন্দরবন দুর্গাপূজা স্পেশাল ট্যুর বিষয়ে আরও জানতে চাই। নাম: ${data.name}`)}" style="display: inline-block; background: linear-gradient(135deg, #16a34a, #15803d); color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">
          💬 WhatsApp-এ সরাসরি কথা বলুন
        </a>
      </div>

      <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
        ধন্যবাদান্তে,<br>
        <strong style="color: #064e3b;">Sundarban Bengal Trip টিম</strong>
      </p>
    </div>

    ${emailFooter()}
  `);
}
