"use server";

import { uploadImageFromBase64 } from "@/app/actions/imagekit.actions";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAboutPage() {
  try {
    const data = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, "about-page"),
    });
    if (!data) {
      return {
        success: false,
        error: "About page not found",
      };
    }
    return {
      success: true,
      data: data.value,
    };
  } catch (error) {
    console.error("GET_ABOUT_ERROR:", error);
    return {
      success: false,
      error: "Failed to get About page",
    };
  }
}

export async function upsertAboutPage(formValues: any) {
  try {
    // 1. Create a queue for uploads
    const uploadPromises = [];

    if (formValues.heroImage.startsWith("data:image")) {
      uploadPromises.push(
        uploadImageFromBase64(formValues.heroImage, "about-hero").then(
          (res) => {
            formValues.heroImage = res.url;
          },
        ),
      );
    }

    if (formValues.storyImage.startsWith("data:image")) {
      uploadPromises.push(
        uploadImageFromBase64(formValues.storyImage, "about-story").then(
          (res) => {
            formValues.storyImage = res.url;
          },
        ),
      );
    }

    // 2. Execute all uploads in parallel
    if (uploadPromises.length > 0) {
      await Promise.all(uploadPromises);
    }

    // 3. Database operation
    await db
      .insert(siteSettings)
      .values({
        key: "about-page",
        value: formValues,
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: formValues,
          updatedAt: new Date(),
        },
      });

    // 4. Clear cache for BOTH the public page and the admin editor
    revalidatePath("/about");
    revalidatePath("/admin/about");

    return { success: true };
  } catch (error) {
    console.error("UPSERT_ABOUT_ERROR:", error);
    return { success: false, error: "Failed to update About page" };
  }
}
