import { z } from "zod";

export const voucherSchema = z.object({
  name: z.string().nonempty("Name is required"),
  event_id: z.number().int().positive("Event ID must be a positive integer"),
  description: z.string().nonempty("Description is required"),
  tnc_description: z
    .string()
    .nonempty("Terms and conditions description is required"),
  discount_percentage: z
    .number()
    .min(0, "Discount percentage must be at least 0")
    .max(100, "Discount percentage must be at most 100"),
  start_date: z.date(),
  expired_date: z.date(),
  code: z.string().nonempty("Code is required"),
  max_usage: z.number().int().positive("Max usage must be a positive integer"),
  current_usage: z
    .number()
    .int()
    .nonnegative("Current usage must be a non-negative integer"),
});
