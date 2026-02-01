"use server";

import { db } from "@/db";
import { blogs as BlogModel } from "@/db/schema";
import { and, desc, eq, not } from "drizzle-orm";

export const getBlogBySlug = async (slug: string) => {
  try {
    const data = await db
      .select()
      .from(BlogModel)
      .where(eq(BlogModel.slug, slug));
    return { success: true, data: data[0] };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const getFeaturedBlog = async () => {
  try {
    const data = await db
      .select()
      .from(BlogModel)
      .where(eq(BlogModel.isFeatured, true))
      .orderBy(desc(BlogModel.createdAt))
      .limit(1);
    return { success: true, data: data[0] };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const getPublishedBlogs = async () => {
  try {
    const data = await db
      .select()
      .from(BlogModel)
      .where(
        and(eq(BlogModel.published, true), not(eq(BlogModel.isFeatured, true))),
      )
      .orderBy(desc(BlogModel.createdAt));
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const getLatestLimitedPublishedBlogs = async (limit: number = 5) => {
  try {
    const data = await db
      .select()
      .from(BlogModel)
      .where(eq(BlogModel.published, true))
      .orderBy(desc(BlogModel.createdAt))
      .limit(limit);
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
