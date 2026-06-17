import {z} from "zod";

export const bulkSessionIdSchemas = z.object({
  sessionIds: z.
  array(z.string())
  .min(1, "Atleast one session must be selected")
});