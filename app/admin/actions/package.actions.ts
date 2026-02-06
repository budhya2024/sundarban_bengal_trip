"use server";

import { db } from "@/db";
import { travelPackages } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { PackageValues } from "@/schemas/package.schema";
import { desc, eq, or, sql } from "drizzle-orm";
import { uploadImageFromBase64 } from "@/app/actions/imagekit.actions";

export async function getPopularPackageKeys() {
  try {
    const rawData = await db
      .select({
        key: travelPackages.key,
        name: sql<string>`${travelPackages.data}->>'packageName'`,
      })
      .from(travelPackages);
    // .where(eq(travelPackages.isPopular, true));
    return {
      success: true,
      data: rawData,
    };
  } catch (error) {
    console.error("GET_POPULAR_PACKAGES_ERROR:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch popular packages",
    };
  }
}

export async function getPackages(onlyPopular = false) {
  try {
    const query = db.select().from(travelPackages);

    let rawData;

    if (onlyPopular) {
      rawData = await query
        .where(eq(travelPackages.isPopular, true))
        .orderBy(desc(travelPackages.updatedAt));
    } else {
      rawData = await query.orderBy(desc(travelPackages.updatedAt));
    }

    // REFACTORING: Flatten the JSONB 'data' into the object
    const refactoredData = rawData.map((pkg) => {
      const typedData = pkg.data as PackageValues;
      return {
        id: pkg.id,
        key: pkg.key,
        updatedAt: pkg.updatedAt,
        ...typedData,
      };
    });

    return {
      success: true,
      data: refactoredData,
    };
  } catch (error) {
    console.error("FETCH_PACKAGES_ERROR:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch packages",
    };
  }
}

export async function getPackageBySlug(slug: string) {
  try {
    // Fetch a single record instead of a list
    const pkg = await db.query.travelPackages.findFirst({
      where: eq(travelPackages.key, slug),
    });

    if (!pkg) {
      return {
        success: false,
        data: null,
        error: "Package not found",
      };
    }

    // Refactor the single object: Flatten the JSONB 'data' into the main object
    const typedData = pkg.data as PackageValues;
    const refactoredData = {
      id: pkg.id,
      key: pkg.key,
      updatedAt: pkg.updatedAt,
      ...typedData,
    };

    return {
      success: true,
      data: refactoredData,
    };
  } catch (error) {
    console.error("FETCH_PACKAGE_ERROR:", error);
    return {
      success: false,
      data: null,
      error: "Failed to fetch package",
    };
  }
}

export async function upsertPackage(values: PackageValues) {
  try {
    // 1. Generate a URL-friendly slug from Package Name
    // Example: "Sundarban 2 Days 1 Night Deluxe" -> "sundarban-2-days-1-night-deluxe"
    const packageKey = values.packageName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Remove duplicate hyphens

    // 2. Handle Image Upload if it's a new Base64 string
    if (values.heroImage && values.heroImage.startsWith("data:image")) {
      const { success, url } = await uploadImageFromBase64(
        values.heroImage,
        values.heroTitle,
      );

      if (!success || !url) {
        return { success: false, error: "Image upload failed" };
      }

      values.heroImage = url; // Update values with the permanent URL
    }

    if (values.packageImage && values.heroImage.startsWith("data:image")) {
      const { success, url } = await uploadImageFromBase64(
        values.packageImage,
        values.packageName,
      );

      if (!success || !url) {
        return { success: false, error: "Image upload failed" };
      }

      values.packageImage = url;
    }
    // 3. Perform the Upsert
    await db
      .insert(travelPackages)
      .values({
        key: packageKey,
        // Using heroTitle or category fallback since category was removed from form
        category: "General",
        isPopular: values.isPopular,
        data: values,
      })
      .onConflictDoUpdate({
        target: travelPackages.key,
        set: {
          category: "General",
          isPopular: values.isPopular,
          data: values,
          updatedAt: new Date(),
        },
      });

    // 4. Invalidate Caches
    revalidatePath("/admin/packages");
    revalidatePath(`/packages/${packageKey}`);

    return { success: true, key: packageKey };
  } catch (error) {
    console.error("UPSERT_PACKAGE_ERROR:", error);
    return {
      success: false,
      error: "Failed to save package. Ensure the name is unique.",
    };
  }
}

export async function deletePackage(key: string) {
  try {
    const result = await db
      .delete(travelPackages)
      .where(eq(travelPackages.key, key))
      .returning({ deletedKey: travelPackages.key });

    if (result.length === 0) {
      return { success: false, error: "Package not found or already deleted" };
    }

    // Clear the cache for the listing page and the specific public page
    revalidatePath("/admin/packages");
    revalidatePath(`/packages/${key}`);

    return { success: true, message: "Package deleted successfully" };
  } catch (error) {
    console.error("DELETE_PACKAGE_ERROR:", error);
    return {
      success: false,
      error: "An unexpected error occurred while deleting",
    };
  }
}
