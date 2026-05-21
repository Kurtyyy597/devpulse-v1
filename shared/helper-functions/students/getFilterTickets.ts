import type { FilterTicket } from "../types/FilterTickets";
import { Ticket } from "../../types/tickets/Ticket";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // separate accent chars
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^\w\s]/g, " ") // remove punctuation
    .replace(/_/g, " ")
    .replace(/\s+/g, " ") // collapse spaces
    .trim()
}

export function getFilterTickets(filters: FilterTicket, tickets: Ticket[]) {
  const searchInput = normalizeText(filters.search ?? "");
  
  return tickets.filter((t) => {
    if (searchInput && !normalizeText(t.title).includes(searchInput)) return false;
    if ( filters.active !== undefined && t.completed !== filters.active) return false;
    
    return true;
  });
}