import { z } from "zod";
import { createSessionSchema } from "../../schemas/createSessionSchemas";

export type CreateSessionFormInput = z.input<typeof createSessionSchema>;

export type CreateSessionForm = z.infer<typeof createSessionSchema>;
