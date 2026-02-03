import * as z from "zod";

export const ContactPageSchema = z.object({
  heroTitle: z.string().min(2, "Title too short"),
  heroSubtitle: z.string().min(5, "Subtitle too short"),
  heroImage: z.string().url("Invalid image URL"),
  phones: z
    .array(
      z.object({
        value: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit number"),
      }),
    )
    .min(1),
  emails: z
    .array(z.object({ value: z.string().email("Invalid email") }))
    .min(1),
  address: z.string().min(5, "Address required"),
  schedules: z
    .array(
      z.object({
        value: z.string().refine((val) => {
          const match = val.match(/:(\d{2})/);
          if (!match) return true; // Allows formats like "9 AM"
          const mins = parseInt(match[1]);
          return mins % 5 === 0;
        }, "Minutes must be in 5-min increments (e.g. :05, :10, :15)"),
      }),
    )
    .min(1),
  sidebarHeadline: z.string().min(2, "Required"),
  sidebarDescription: z.string().min(5, "Required"),
  whatsappNumber: z.string().length(10, "10 digits required"),
});

export type ContactPageValues = z.infer<typeof ContactPageSchema>;
