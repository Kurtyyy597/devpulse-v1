// import type  { FilterTicket } from "../../types/tickets/Ticket"
// import type { SortTickets } from "../../types/tickets/SortTickets";

// export type ParseFilterProps = {
//   search?: string;
//   active?: string;
//   sort?: string 
// };

// const allowedSort: SortTickets[] = [
//   "createdAt-asc",
//   "createdAt-desc"
// ];

// export function parseTicketFilters(parse: ParseFilterProps): FilterTicket {
//   const parseActive = typeof parse.active === "string" &&
//   parse.active === "true" ? true :
//   parse.active === "false" ? false :
//   undefined;

//   const sort = allowedSort.includes(parse.sort as SortTickets) ?
//   (parse.sort as SortTickets) : "createdAt-asc"

//   return {
//     search: parse.search ?? "",
//     ...(parseActive !== undefined ? {
//       active: parseActive 
//     } : {}),
//     sort
//   };
// }