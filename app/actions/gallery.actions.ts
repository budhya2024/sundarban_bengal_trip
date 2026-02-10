"use server";

import { uploadImageFromBase64 } from "@/app/actions/imagekit.actions";
import { db } from "@/db";
import { gallery as Gallery } from "@/db/schema";
import { desc, eq, notInArray } from "drizzle-orm";

export async function fetchGallertyCategories() {
  try {
    const data = await db
      .selectDistinct({
        category: Gallery.category,
      })
      .from(Gallery)
      .where(
        notInArray(Gallery.category, [
          "wildlife",
          "landscape",
          "activities",
          "sunset",
        ]),
      );

    return { success: true, data: data.map((c) => c.category) };
  } catch (error) {
    console.error("Error Fetch Gallery Categories ", error);
    return { success: false, error };
  }
}

export const addGallery = async (data: any) => {
  console.log({ data });
  try {
    const result = await db
      .insert(Gallery)
      .values({ ...data })
      .returning();
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error adding gallery:", error);
    return { success: false, error };
  }
};

export const getAllGalleryItems = async (limit?: number) => {
  try {
    const query = db
      .select()
      .from(Gallery)
      .orderBy(desc(Gallery.createdAt))
      .$dynamic();

    if (limit) {
      query.limit(limit);
    }

    const data = await query;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetch gallery items: ", error);
    return { success: false, error: "Failed to retrieve gallery items" };
  }
};

export async function deleteGalleryItem(id: string) {
  try {
    await db.delete(Gallery).where(eq(Gallery.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error Gallery Item Delete ", error);
    return { success: false, error };
  }
}
