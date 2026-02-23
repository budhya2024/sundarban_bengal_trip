"use server";

import { db } from "@/db";
import { travelPackages } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { PackageValues } from "@/schemas/package.schema";
import { and, asc, desc, eq, ne, or, sql } from "drizzle-orm";

export async function getPackageKeys() {
  try {
    const rawData = await db
      .select({
        key: travelPackages.key,
        name: sql<string>`${travelPackages.data}->>'packageName'`,
      })
      .from(travelPackages)
      .orderBy(asc(travelPackages.updatedAt));
    // .where(eq(travelPackages.isPopular, true));
    return {
      success: true,
      data: rawData,
    };
  } catch (error) {
    console.error("GET_PACKAGE_KEYS_ERROR:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch package keys",
    };
  }
}

export async function getNavbarPackageKeys() {
  try {
    const rawData = await db
      .select({
        key: travelPackages.key,
        name: sql<string>`${travelPackages.data}->>'packageName'`,
      })
      .from(travelPackages)
      .orderBy();
    // .where(eq(travelPackages.isPopular, true));
    return {
      success: true,
      data: rawData,
    };
  } catch (error) {
    console.error("GET_PACKAGE_KEYS_ERROR:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch package keys",
    };
  }
}

export async function getPopularPackages(excludePackage?: string) {
  try {
    // 1. Initialize with your required conditions
    const conditions = [eq(travelPackages.isPopular, true)];

    // 2. Add the exclusion only if excludePackage is provided
    if (excludePackage) {
      conditions.push(ne(travelPackages.key, excludePackage));
    }

    // 3. Pass the array into the and() helper
    const rawData = await db
      .select()
      .from(travelPackages)
      .where(and(...conditions));

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
    console.error("GET_POPULAR_PACKAGES_ERROR:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch popular packages",
    };
  }
}

export async function getPackages(onlyPopular = false, limit?: number) {
  try {
    // 1. Initialize the query builder
    let query = db.select().from(travelPackages).$dynamic();

    // 2. Add conditional filters
    const conditions = [];
    if (onlyPopular) {
      conditions.push(eq(travelPackages.isPopular, true));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // 3. Add global ordering
    query = query.orderBy(desc(travelPackages.updatedAt));

    // 4. Dynamically add limit if provided
    if (limit) {
      query = query.limit(limit);
    }

    // 5. Execute the query
    const rawData = await query;

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

    // 2. Perform the Upsert
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
    revalidatePath("/admin/package");
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
    revalidatePath("/admin/package");
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
