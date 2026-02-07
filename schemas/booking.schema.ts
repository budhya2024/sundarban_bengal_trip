import * as z from "zod";

// Regex breakdown:
// ^(?:(?:\+|0{0,2})91[\s-]?)? -> Optional +91, 91, or 0091 with optional space/hyphen
// [6789]\d{9}$ -> Must start with 6, 7, 8, or 9 and have 9 more digits
const phoneRegex = /^(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}$/;

export const BookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(phoneRegex, "Please enter a valid Indian phone number"),
  date: z.string().min(1, "Please select a date"),
  guests: z.string().min(1, "Required"),
  package: z.string().min(1, "Please select a package"),
  status: z.string().optional().default("pending"),
});

export type BookingValues = z.infer<typeof BookingSchema>;
