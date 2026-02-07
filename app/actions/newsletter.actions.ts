"use server";

import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";

export async function subscribeAction(formData: FormData) {
  const email = formData.get("email") as string;

  // Simple server-side validation
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please provide a valid email." };
  }

  try {
    // Check if user already exists
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length > 0) {
      if (existing[0].status === "unsubscribed") {
        await db
          .update(newsletterSubscribers)
          .set({ status: "subscribed" })
          .where(eq(newsletterSubscribers.email, email));
        return {
          success: true,
          message: "Welcome back! Subscription reactivated.",
        };
      }
      return { success: false, message: "You are already subscribed." };
    }

    // Insert new record
    await db.insert(newsletterSubscribers).values({ email });
    return { success: true, message: "Thank you for subscribing!" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Try again later.",
    };
  }
}

export async function getSubscribersAction({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) {
  try {
    const offset = (page - 1) * pageSize;

    // 1. Fetch data with pagination
    const data = await db
      .select()
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.createdAt))
      .limit(pageSize)
      .offset(offset);

    // 2. Get total count for pagination controls
    const [totalCount] = await db
      .select({ value: count() })
      .from(newsletterSubscribers);
    const totalPages = Math.ceil(totalCount.value / pageSize);

    return {
      success: true,
      data,
      pagination: {
        totalCount: totalCount.value,
        totalPages,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return { success: false, message: "Failed to load subscribers." };
  }
}

// Action to toggle status (Unsubscribe/Resubscribe)
export async function toggleSubscriberStatus(
  id: string,
  currentStatus: string,
) {
  const newStatus =
    currentStatus === "subscribed" ? "unsubscribed" : "subscribed";
  try {
    await db
      .update(newsletterSubscribers)
      .set({ status: newStatus })
      .where(eq(newsletterSubscribers.id, id));
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
