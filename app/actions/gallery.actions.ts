"use server";

import {
  uploadImage,
  uploadImageFromBase64,
} from "@/app/actions/imagekit.actions";
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

export const addGallery = async (data: {
  title: string;
  category: string;
  url: string;
}) => {
  try {
    const { success, fileId, url } = await uploadImageFromBase64(
      data.url,
      data.title,
    );

    if (!success || !fileId || !url) {
      return { success: false, error: "Upload failed" };
    }

    const result = await db
      .insert(Gallery)
      .values({ ...data, url, fileId })
      .returning();
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error adding gallery:", error);
    return { success: false, error };
  }
};

export const getAllGalleryItems = async () => {
  try {
    const data = await db
      .select()
      .from(Gallery)
      .orderBy(desc(Gallery.createdAt));
    return { success: true, data };
  } catch (error) {
    console.error("Error fetch gallery items: ", error);
    return { success: false, error };
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
