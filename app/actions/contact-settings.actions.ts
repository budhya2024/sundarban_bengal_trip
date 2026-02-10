"use server";

import { uploadImageFromBase64 } from "@/app/actions/imagekit.actions";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { ContactPageValues } from "@/schemas/adminContact.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getContactSettings() {
  try {
    const result = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "contact_page_settings"))
      .limit(1);

    if (result.length === 0) {
      return { success: false, error: "Contact settings not found" };
    }

    return { success: true, data: result[0].value };
  } catch (error) {
    console.error("Error fetching contact settings:", error);
    return { success: false, error: "Failed to fetch contact settings" };
  }
}

export async function upsertContactSettings(data: ContactPageValues) {
  const SETTINGS_KEY = "contact_page_settings";

  try {
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, SETTINGS_KEY))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({
          value: data,
          updatedAt: new Date(),
        })
        .where(eq(siteSettings.key, SETTINGS_KEY));
    } else {
      await db.insert(siteSettings).values({
        key: SETTINGS_KEY,
        value: data,
      });
    }

    revalidatePath("/contact");
    revalidatePath("/admin/contact");

    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save settings" };
  }
}
