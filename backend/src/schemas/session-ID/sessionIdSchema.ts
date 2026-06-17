import {z} from "zod";


export const sessionIdSchema = z.object({
  id: z.string().uuid("Invalid session ID")
});