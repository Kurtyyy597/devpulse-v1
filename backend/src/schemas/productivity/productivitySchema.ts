import { z } from "zod";

export const productivitySchema = z.object({
  date: z.number(),

  productivityScore: z.coerce
    .number({
      error: "Score should be a number",
    })
    .min(1)
    .max(10, "10 is the maximum score"),
});

export type CreateProductivitySchema = z.infer<typeof productivitySchema>;
