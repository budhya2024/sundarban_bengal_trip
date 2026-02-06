import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  content: text("content").notNull(),
  published: boolean("published").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type BlogType = InferSelectModel<typeof blogs>;
export type NewBlogType = InferInsertModel<typeof blogs>;

export const gallery = pgTable("gallery", {
  id: uuid("id").primaryKey().defaultRandom(),

  url: text("url").notNull(),
  fileId: text("file_id").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type GalleryType = InferSelectModel<typeof gallery>;
export type NewGalleryType = InferInsertModel<typeof gallery>;

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;

export const travelPackages = pgTable("travel_packages", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  category: text("category").notNull(),
  isPopular: boolean("is_popular").default(false).notNull(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TravelPackage = typeof travelPackages.$inferSelect;
export type NewTravelPackage = typeof travelPackages.$inferInsert;
