import { createSessionSchema } from '../../schemas/createSessionSchemas';
import {z} from "zod"

export type SessionFormInput = z.input<typeof createSessionSchema>;