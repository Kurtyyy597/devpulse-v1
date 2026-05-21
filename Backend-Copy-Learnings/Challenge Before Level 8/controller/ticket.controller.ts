import { Request, Response } from "express";
import * as ticketService from "../services/tickets.service";
import type { Ticket } from "../../../../shared/types/tickets/Ticket";
import asyncHandler from "express-async-handler";
import { CreateTicketDto, UpdateTicketDto } from "../../../../shared/schemas/ticket/ticketSchema";
import { ParseFilterProps, parseTicketFilters } from "../../../../shared/helper-functions/tickets/parseFilterTickets";

let tickets: Ticket[] = [];

export const getAllTicketsController =
asyncHandler(async (
  req: Request<{}, {}, {}, ParseFilterProps>,
  res: Response
  ) => {
    const parseFilter = parseTicketFilters(req.query);
    const ticketData = ticketService.getAllTicketsService(tickets, parseFilter);

    res.status(200).json({
      success: true,
      message: "Tickets Successfully fetched",
      data: ticketData
    });
  }
);

export const getOneTicketController = 
asyncHandler(async (
  req: Request<{id: string}>,
  res: Response
  ) => {
    const ticket = ticketService.getOneTicketService(req.params.id, tickets);
    
    res.status(200).json({
    success: true,
    message: "Ticket fetched successfully",
    data: ticket
    });
  }
);

export const createTicketController = 
asyncHandler(async (
  req: Request<{}, {}, CreateTicketDto>,
  res: Response
  ) => {
    const newTicket = ticketService.createTicketService(req.body, tickets);
    
    res.status(201).json({
      success: true,
      message: `${newTicket.title} successfully created`,
      data: newTicket
    });
  }
);

export const updateTicketController = 
asyncHandler(async (
  req: Request<{id: string}, {}, UpdateTicketDto>,
  res: Response
  ) => {
    const updatedTicket = ticketService.updateTicketService(req.params.id, req.body, tickets);

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: updatedTicket
    });
  }
);

export const deleteTicketController =
asyncHandler(async (
  req: Request<{id: string}>,
  res: Response
  ) => {
    const deletedTicket = ticketService.deleteTicketService(req.params.id, tickets);

    res.status(200).json({
      success: true,
      message: `Ticket successfully deleted`,
    });
  }
);






