"use server";

import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
