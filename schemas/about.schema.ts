import * as z from "zod";

export const AboutSchema = z.object({
  // Hero
  heroImage: z.string().min(1, "Hero image is required"),
  heroTitle: z.string().min(1, "Hero title is required"),
  heroSubtitle: z.string().min(1, "Hero subtitle is required"),

  // Our Story
  storyTitle: z.string().min(1, "Story title is required"),
  storyDescription: z.string().min(1, "Story description is required"),
  storyImage: z.string().min(1, "Story image is required"),

  // Mission & Vision
  ourMissionContent: z.string().min(1, "Mission content is required"),
  ourVisionContent: z.string().min(1, "Vision content is required"),
});

export type AboutValues = z.infer<typeof AboutSchema>;
