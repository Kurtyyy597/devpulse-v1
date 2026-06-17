import { moods } from "../../../../shared/types/Mood";
import { sortSessions } from "../../../../shared/types/SortSessions";
import {z} from "zod"
import { statuses } from "../../../../shared/types/SessionStatus";
import { filterSessionView } from "../../../../shared/types/filterSessions";

export const sessionQuerySchema = z.object({
  search: z.string().trim().optional(),
  mood: z.enum([...moods, "all"] as const).optional(),
  status: z.enum([...statuses, "all"] as const).optional(),
  sort: z.enum([...sortSessions, "all"] as const).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(5),
  view: z.enum(filterSessionView).optional(),
});