import { createSessionSchema } from './../../../backend/src/schemas/forms/createSessionSchemas';
import {z} from "zod"

export type SessionFormInput = z.input<typeof createSessionSchema>;