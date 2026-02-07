"use server";

import { db } from "@/db";
import {
  blogs,
  bookings,
  newsletterSubscribers,
  siteSettings,
} from "@/db/schema";
import { BookingValues } from "@/schemas/booking.schema";
import { HomeSettingsValues } from "@/schemas/homeSettings.schema";
import { count, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { uploadImageFromBase64 } from "./imagekit.actions";

export const createBooking = async (booking: BookingValues) => {
  try {
    await db.insert(bookings).values(booking);
    return { success: true, message: "Booking created successfully" };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, message: "Failed to create booking" };
  }
};

export async function getInquiryRows(page: number = 1, limit: number = 10) {
  try {
    // 1. Calculate the offset (how many rows to skip)
    const offset = (page - 1) * limit;

    // 2. Get total count for pagination calculations
    const [totalRes] = await db.select({ value: count() }).from(bookings);
    const totalCount = totalRes?.value || 0;

    // 3. Fetch the specific slice of data
    const rawData = await db
      .select({
        id: bookings.id,
        name: bookings.name,
        email: bookings.email,
        phone: bookings.phone,
        guests: bookings.guests,
        package: bookings.package,
        date: bookings.date,
        notes: bookings.adminNotes,
        createdAt: bookings.createdAt,
        status: bookings.status,
      })
      .from(bookings)
      .limit(limit) // <--- This limits the number of rows
      .offset(offset) // <--- This skips the rows from previous pages
      .orderBy(desc(bookings.createdAt)); // Always show newest first

    console.log(rawData, limit);
    return {
      success: true,
      data: rawData,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("PAGINATION_ERROR:", error);
    return { success: false, data: null, totalPages: 0, currentPage: 1 };
  }
}
export async function updateBookingStatus(
  id: string,
  values: { status: string; adminNotes: string },
) {
  try {
    await db
      .update(bookings)
      .set({
        status: values.status,
        adminNotes: values.adminNotes,
      })
      .where(eq(bookings.id, id));

    revalidatePath("/admin/inquiries");
    return { success: true, message: "Inquiry updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update inquiry" };
  }
}

export async function updateHomeSettings(values: HomeSettingsValues) {
  try {
    if (!values.hero.image.startsWith("http")) {
      const { success, url, fileId } = await uploadImageFromBase64(
        values.hero.image,
        values.hero.title,
      );
      if (!success || !url) {
        return { success: false, message: "Failed to upload hero image" };
      }
      values.hero.image = url + "?fileId=" + fileId;
    }
    await db
      .insert(siteSettings)
      .values({
        key: "home_config",
        value: values,
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: values },
      });

    revalidatePath("/");
    revalidatePath("/admin/settings");

    return { success: true, message: "Settings synced successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database update failed" };
  }
}

export async function getHomeSettings(): Promise<{
  success: boolean;
  data: HomeSettingsValues | null;
  error?: any;
}> {
  try {
    const result = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "home_config"))
      .limit(1);

    if (result.length === 0) {
      // Return empty structure if first-time setup
      return {
        success: true,
        data: {
          hero: { title: "", subtitle: "", image: "" },
          testimonials: [],
          faqs: [],
        },
      };
    }

    // Cast the JSONB value to our schema type
    const data = result[0].value as HomeSettingsValues;

    return { success: true, data };
  } catch (error) {
    console.error("FETCH_HOME_SETTINGS_ERROR:", error);
    return { success: false, error, data: null };
  }
}

export async function getDashboardStats() {
  try {
    const [blogCount] = await db
      .select({ value: count() })
      .from(blogs)
      .where(eq(blogs.published, true));
    const [bookingCount] = await db
      .select({ value: count() })
      .from(bookings)
      .where(eq(bookings.status, "pending"));
    const [subscriberCount] = await db
      .select({ value: count() })
      .from(newsletterSubscribers);

    return {
      success: true,
      stats: {
        totalBlogs: blogCount.value,
        totalBookings: bookingCount.value,
        totalSubscribers: subscriberCount.value,
      },
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return {
      success: false,
      stats: { totalBlogs: 0, totalBookings: 0, totalSubscribers: 0 },
    };
  }
}
