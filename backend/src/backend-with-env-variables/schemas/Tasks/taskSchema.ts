import { z } from "zod";

export const taskStatuses = ["closed", "open", "in-progress", "done"] as const;

export const taskPriorities = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export type TasksPriority = (typeof taskPriorities)[number];

export const createTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be atleast 3 characters")
      .max(100, "Title must not exceed 100 characters")
      .refine((value) => value.trim().length > 0, "Title cannot be empty"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be atleast 10 characters")
      .max(1000, "Description too long")
      .optional()
      .or(z.literal("")),

    dueDate: z.coerce
      .number()
      .positive("Due date must be a valid timestamp")
      .refine((value) => value > Date.now(), "Due date must be in a future")
      .optional(),

    status: z.enum(taskStatuses),

    priority: z.enum(taskPriorities),
  })
  .strict();

export const updateTaskSchemas = createTaskSchema.partial();

export type CreateTaskFormValues =
z.input<typeof createTaskSchema>;

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export type UpdateTaskDto = z.infer<typeof updateTaskSchemas>;