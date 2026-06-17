import { z } from "zod";
import { createSessionSchema } from "../../../backend/src/schemas/forms/createSessionSchemas";

export type CreateSessionFormInput = z.input<typeof createSessionSchema>;

export type CreateSessionForm = z.infer<typeof createSessionSchema>;
