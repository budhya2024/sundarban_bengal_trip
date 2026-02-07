"use server";

import { db } from "@/db";
import { adminAuth, passwordResetOtps } from "@/db/schema";
import { and, count, eq, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sendOtpMail } from "./sendmail.action";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-me";

/**
 * Checks if any administrator exists in the database.
 * Used for the "First Run" setup logic.
 */
export async function checkAdminExists() {
  const [result] = await db.select({ value: count() }).from(adminAuth);
  return result.value > 0;
}

/**
 * Handles both Registration (Setup) and Login.
 */
export async function authAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const isAdminSetup = await checkAdminExists();

  try {
    let userId: string;

    if (!isAdminSetup) {
      // --- SCENARIO 1: INITIAL SETUP ---
      const hashedPassword = await bcrypt.hash(password, 12);
      const [newAdmin] = await db
        .insert(adminAuth)
        .values({
          email,
          hashedPassword,
        })
        .returning({ id: adminAuth.id });

      userId = newAdmin.id;
    } else {
      // --- SCENARIO 2: STANDARD LOGIN ---
      const [user] = await db
        .select()
        .from(adminAuth)
        .where(eq(adminAuth.email, email))
        .limit(1);

      if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
        return { success: false, message: "Invalid email or password." };
      }

      // Update last login timestamp for security auditing
      await db
        .update(adminAuth)
        .set({ lastLogin: new Date() })
        .where(eq(adminAuth.id, user.id));

      userId = user.id;
    }

    // --- SESSION MANAGEMENT ---
    const cookieStore = await cookies();

    // Create the session string that your middleware expects
    // Note: In production, consider a signed JWT using the 'jose' library
    const sessionValue = `${SESSION_SECRET}-${userId}-${Date.now()}`;

    cookieStore.set(SESSION_COOKIE_NAME, sessionValue, {
      httpOnly: true, // Prevents XSS attacks from reading the cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // Cookie expires in 24 hours
    });
  } catch (error) {
    console.error("Auth Error:", error);
    return { success: false, message: "An internal error occurred." };
  }

  // Redirect must be called outside of the try-catch block
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session"); // Must match SESSION_COOKIE_NAME
  redirect("/admin/login"); // Clear navigation
}

export async function requestOtpAction(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid admin email." };
  }

  try {
    // 1. Verify this email actually belongs to an administrator
    const [admin] = await db
      .select()
      .from(adminAuth)
      .where(eq(adminAuth.email, email))
      .limit(1);

    if (!admin) {
      // Security tip: We return success:true even if email isn't found
      // to prevent "Email Enumeration" attacks, but for a private CMS,
      // a clear error is usually more helpful for you.
      return {
        success: false,
        message: "No admin account found with this email.",
      };
    }

    // 2. Generate a secure 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 3. Set expiry for 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 4. Store OTP in the database
    // We use an upsert-like logic: if you request twice, it just adds a new row
    await db.insert(passwordResetOtps).values({
      email,
      otp,
      expiresAt,
    });

    // 5. Send the email using your Nodemailer engine
    const emailResult = await sendOtpMail(email, otp);

    if (!emailResult.success) {
      return {
        success: false,
        message:
          "Database updated, but email failed to send. Check your SMTP settings.",
      };
    }

    return {
      success: true,
      message: "A 6-digit verification code has been sent to your inbox.",
    };
  } catch (error) {
    console.error("OTP Request Error:", error);
    return {
      success: false,
      message: "Internal server error. Please try again later.",
    };
  }
}

export async function resetPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;
  const newPassword = formData.get("password") as string;

  if (!email || !otp || !newPassword) {
    return { success: false, message: "All fields are required." };
  }

  try {
    // 1. Verify the OTP is correct and not expired (using 10-minute window)
    const [validOtpRecord] = await db
      .select()
      .from(passwordResetOtps)
      .where(
        and(
          eq(passwordResetOtps.email, email),
          eq(passwordResetOtps.otp, otp),
          gt(passwordResetOtps.expiresAt, new Date()), // Check if current time < expiry
        ),
      )
      .limit(1);

    if (!validOtpRecord) {
      return {
        success: false,
        message:
          "The code is invalid or has expired. Please request a new one.",
      };
    }

    // 2. Hash the new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // 3. Update the admin's password in the database
    await db
      .update(adminAuth)
      .set({
        hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(adminAuth.email, email));

    // 4. Cleanup: Delete used OTPs for this email to prevent reuse
    await db
      .delete(passwordResetOtps)
      .where(eq(passwordResetOtps.email, email));

    return {
      success: true,
      message: "Password updated successfully! You can now login.",
    };
  } catch (error) {
    console.error("Reset Error:", error);
    return {
      success: false,
      message: "Something went wrong during the reset process.",
    };
  }
}
