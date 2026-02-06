import * as z from "zod";

export const PackageSchema = z.object({
  isPopular: z.boolean().default(false),
  packageName: z.string().min(5, "Package name is required"),
  packageImage: z.string().min(1, "Package image is required"),
  // Section 1: HERO
  heroTitle: z.string().min(1, "Headline is required"),
  heroSubtitle: z.string().min(1, "Subtext is required"),
  heroImage: z.string().min(1, "Hero image is required"),

  // Section 2: Overview
  description: z.string().min(1, "Description is required"),
  note: z.string().min(1, "Note is required"),
  originalPrice: z.string().min(1, "Original price is required"),
  price: z.string().min(1, "Starting price is required"),
  duration: z.string().min(1, "Duration is required"),
  groupSize: z.string().min(1, "Group size is required"),
  location: z.string().min(1, "Main locations are required"),
  rating: z.string().default("4.6/5"),
  availability: z.string().default("Daily departures"),

  // Section 3: Highlights (Multiple Items)
  highlights: z
    .array(z.object({ value: z.string().min(1, "Highlight cannot be empty") }))
    .min(1),

  // Section 4: Tour Timeline (Nested Multiple Items)
  timeline: z
    .array(
      z.object({
        dayTitle: z.string().min(1, "Day title is required"), // e.g., "Day 1: Arrival"
        events: z
          .array(
            z.object({
              time: z.string().min(1, "Time is required"),
              title: z.string().min(1, "Activity title is required"),
              description: z.string().min(1, "Description is required"),
            }),
          )
          .min(1, "At least one activity per day is required"),
      }),
    )
    .min(1),

  // Section 5: Inclusions & Exclusions (Multiple Items)
  inclusions: z.array(
    z.object({ value: z.string().min(1, "Inclusion cannot be empty") }),
  ),
  exclusions: z.array(
    z.object({ value: z.string().min(1, "Exclusion cannot be empty") }),
  ),
});

export type PackageValues = z.infer<typeof PackageSchema>;
