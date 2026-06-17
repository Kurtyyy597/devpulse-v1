import { createSessionSchema } from "../../../backend/src/schemas/create-schema/createSessionSchemas";
import {z} from "zod"

export type SessionFormInput = z.input<typeof createSessionSchema>; 