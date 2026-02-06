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
    if (formValues.heroImage.startsWith("data:image")) {
      const { url } = await uploadImageFromBase64(
        formValues.heroImage,
        "about-hero",
      );
      formValues.heroImage = url;
    }

    if (formValues.storyImage.startsWith("data:image")) {
      const { url } = await uploadImageFromBase64(
        formValues.storyImage,
        "about-story",
      );
      formValues.storyImage = url;
    }

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

    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("UPSERT_ABOUT_ERROR:", error);
    return { success: false, error: "Failed to update About page" };
  }
}
