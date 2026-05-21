import { FilterTicket } from '../../../shared/types/tickets/FilterTickets';
import type { Ticket } from "../../../shared/types/tickets/Ticket";
import type { CreateTicketDto, UpdateTicketDto } from "../../../shared/schemas/ticket/ticketSchema";




export const getAllTicketsService = (tickets: Ticket[], filters: FilterTicket) => {
  return tickets;
};

export const getOneTicketService = (id: string, tickets: Ticket[]) => {
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    throw new Error("Ticket ID not found");
  };

  return ticket;
};

export const createTicketService = (data: CreateTicketDto, tickets: Ticket[]) => {
  const isInValid = tickets.some((t) =>
    t.title.trim().toLowerCase() === data.title.trim().toLowerCase() 
  );
  if (isInValid) {
    throw new Error("Ticket Already Exist");
  };
  
  const newTicket: Ticket = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: Date.now(),
    completed: data.completed ?? false,
  };

  tickets.push(newTicket);

  return newTicket;
};

export const updateTicketService = (
  id: string,
  data: UpdateTicketDto,
  tickets: Ticket[]
) => {
  

  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error("Ticket ID not found");
  };

  const ticket = tickets[index]!;

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  );

  tickets[index] = {
    ...ticket,
    ...cleanData, 
  };

  return tickets[index];
};



export const deleteTicketService = (id: string | undefined, tickets: Ticket[]) => {
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error("Ticket ID not found");
  };

  tickets.splice(index, 1);

  return tickets[index];

}

 