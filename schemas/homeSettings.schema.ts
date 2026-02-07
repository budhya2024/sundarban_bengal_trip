import * as z from "zod";

export const HomeSettingsSchema = z.object({
  hero: z.object({
    title: z.string().min(5, "Hero title is required"),
    subtitle: z.string().min(10, "Subtitle should be descriptive"),
    image: z.string().url("Enter a valid image URL"),
  }),
  testimonials: z.array(
    z.object({
      review: z.string().min(10, "Review must be longer"),
      name: z.string().min(2, "Name is required"),
      place: z.string().min(2, "Location is required"),
      rating: z.coerce.number().min(1).max(5),
    }),
  ),
  faqs: z.array(
    z.object({
      question: z.string().min(5, "Question is required"),
      answer: z.string().min(5, "Answer is required"),
    }),
  ),
});

export type HomeSettingsValues = z.infer<typeof HomeSettingsSchema>;
