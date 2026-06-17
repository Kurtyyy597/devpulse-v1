import {z} from "zod"
import { createSessionSchema } from "../../../backend/src/schemas/forms/createSessionSchemas";

export const updateSessionSchema = createSessionSchema.partial()

export type UpdateSessionFormInput = z.input<typeof updateSessionSchema>;

export type UpdateSessionForm = z.infer<typeof updateSessionSchema>;
