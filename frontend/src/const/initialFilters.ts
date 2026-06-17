import type { FilterSessions } from "../../../shared/types/filterSessions";

export const initialFilters: FilterSessions = {
  search: "",
  status: "all",
  mood: "all",
  sort: "createdAt-asc",
  view: "active",
};
