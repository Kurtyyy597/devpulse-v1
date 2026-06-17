import { z } from "zod";
import { createSessionSchema } from "../../schemas/create-schema/createSessionSchemas";

export type CreateSessionFormInput = z.input<typeof createSessionSchema>;

export type CreateSessionForm = z.infer<typeof createSessionSchema>;
