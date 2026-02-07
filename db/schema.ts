import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  jsonb,
  varchar,
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

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  guests: text("guests").notNull(),
  package: text("package").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: text("status").default("pending").notNull(), // 'pending', 'contacted', 'confirmed', 'cancelled'
  adminNotes: text("admin_notes"),
  date: text("date").notNull(),
});

export type BookingType = InferSelectModel<typeof bookings>;
export type NewBookingType = InferInsertModel<typeof bookings>;

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  // status: default to 'subscribed', can be 'unsubscribed'
  status: varchar("status", { length: 20 }).notNull().default("subscribed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminAuth = pgTable("admin_auth", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(), //
  hashedPassword: text("hashed_password").notNull(),
  lastLogin: timestamp("last_login"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const passwordResetOtps = pgTable("password_reset_otps", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  otp: text("otp").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
