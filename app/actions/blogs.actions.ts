"use server";

import { db } from "@/db";
import { blogs as BlogModel, NewBlogType } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getAllBlogs = async () => {
  try {
    const data = await db
      .select()
      .from(BlogModel)
      .orderBy(desc(BlogModel.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const getLimitedBlogs = async (limit: number = 3) => {
  try {
    const data = await db
      .select()
      .from(BlogModel)
      .orderBy(desc(BlogModel.createdAt))
      .limit(limit);
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const getBlogById = async (id: string) => {
  try {
    const data = await db.select().from(BlogModel).where(eq(BlogModel.id, id));
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const createBlog = async (newBlog: NewBlogType) => {
  try {
    const slug = newBlog.title.toLowerCase().replace(/\s+/g, "-");
    const data = await db
      .insert(BlogModel)
      .values({ ...newBlog, slug })
      .returning();
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const updateBlog = async (id: string, newBlog: NewBlogType) => {
  try {
    const slug = newBlog.title.toLowerCase().replace(/\s+/g, "-");
    const data = await db
      .update(BlogModel)
      .set({ ...newBlog, slug })
      .where(eq(BlogModel.id, id))
      .returning();
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const toggleStatus = async (id: string, status: boolean) => {
  try {
    const data = await db
      .update(BlogModel)
      .set({ published: status })
      .where(eq(BlogModel.id, id))
      .returning();
    revalidatePath("/admin/BlogModel");
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const deleteBlog = async (id: string) => {
  try {
    await db.delete(BlogModel).where(eq(BlogModel.id, id));
    revalidatePath("/admin/BlogModel");
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const setFeaturedBlog = async (id: string, isFeatured: boolean) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(BlogModel)
        .set({ isFeatured: false })
        .where(eq(BlogModel.isFeatured, true));
      await tx
        .update(BlogModel)
        .set({ isFeatured: isFeatured })
        .where(eq(BlogModel.id, id));
    });
    revalidatePath("/admin/BlogModel");
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
