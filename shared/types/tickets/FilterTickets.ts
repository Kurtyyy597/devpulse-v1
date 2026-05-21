import type { SortTickets } from "./SortTickets";
export type FilterTicket = {
  search: string;
  active?: boolean;
  sort: SortTickets;
};