import {Router} from "express";
import {
  getAllTicketsController,
  getOneTicketController,
  createTicketController,
  deleteTicketController,
  updateTicketController
} from "../controller/ticket.controller";
import { validate } from "../middleware/validate";
import { createTicketSchema, updateTicketSchema } from "../../../../shared/schemas/ticket/ticketSchema";

const router = Router();

router.get("/", getAllTicketsController);
router.get("/:id", getOneTicketController);
router.get("/", validate(createTicketSchema), createTicketController);
router.get("/:id", validate(updateTicketSchema), updateTicketController);
router.get("/:id", deleteTicketController);

export default router;