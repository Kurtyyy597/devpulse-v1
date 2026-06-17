import { z } from "zod";
import { updateSessionSchema } from "../../schemas/updateSessionSchema";

export type UpdateSessionFormInput = z.input<typeof updateSessionSchema>;
export type UpdateSessionForm = z.infer<typeof updateSessionSchema>;