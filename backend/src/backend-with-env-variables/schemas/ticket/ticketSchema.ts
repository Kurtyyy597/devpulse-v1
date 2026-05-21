import {z} from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(3, "Name must be atleast 3 characters"),
  completed: z.boolean(),
});

export const updateTicketSchema = createTicketSchema.partial();

export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;

export type CreateTicketDto = 
z.infer<typeof createTicketSchema>;


