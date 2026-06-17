import { createSessionSchema } from './../../schemas/create-schema/createSessionSchemas';
import {z} from "zod"

export type SessionFormInput = z.input<typeof createSessionSchema>;