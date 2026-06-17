import { z } from "zod";
import { statuses } from "../../../../shared/types/SessionStatus";
import { moods } from "../../../../shared/types/Mood";

export const createSessionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, "Title should not be below 4 characters")
    .max(50, "Maximum length is 50"),
  description: z
    .string()
    .trim()
    .min(20, "Minimum description is 20")
    .max(200, "Maximum length is 200")
    .optional()
    .or(z.literal("")),
  duration: z.coerce
    .number()
    .int("Duration must be a number")
    .positive("Duration must be greater than 0")
    .optional(),
  skills: z.array(z.string()).optional(),
  mood: z.enum(moods).optional(),
  status: z.enum(statuses).optional(),
  dueDate: z
  .string()
  .optional()
  .or(z.literal(""))
 
});
