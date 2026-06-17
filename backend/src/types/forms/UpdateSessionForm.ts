import { z } from "zod";
import { updateSessionSchema } from "../../schemas/update-schema/updateSessionSchema";

export type UpdateSessionFormInput = z.input<typeof updateSessionSchema>;
export type UpdateSessionForm = z.infer<typeof updateSessionSchema>;