"use server";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { BookingValues } from "@/schemas/booking.schema";
import { count, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
