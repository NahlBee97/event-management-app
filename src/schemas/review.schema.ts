import { z } from "zod";

export const reviewSchema = z.object({
  message: z.string().nonempty("Message is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});