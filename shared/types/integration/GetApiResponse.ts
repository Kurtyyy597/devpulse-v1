import type { Session } from "../sessions";
import type { FilterSessions } from "../filterSessions";
import type { PaginationMeta } from "../paginationMeta";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T
};

export type GetApiResponse =
ApiResponse<Session[]> & {
  totalUnfilteredSessions: number;
  
  filters: {
    search: FilterSessions["search"];
    status: FilterSessions["status"];
    mood: FilterSessions["mood"];
  };
  pagination: PaginationMeta;
};