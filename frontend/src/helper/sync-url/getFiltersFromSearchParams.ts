import type { FilterSessions, FilterSessionView} from "../../../../shared/types/filterSessions";
import type { SessionStatus } from "../../../../shared/types/SessionStatus";
import type { SortSessions } from "../../../../shared/types/SortSessions";


export const getFiltersFromSearchParams = (searchParams: URLSearchParams): FilterSessions => {
  return {
    search: searchParams.get("search") ?? "",
    mood: (searchParams.get("mood") as FilterSessions["mood"]) ?? "all",
    sort: (searchParams.get("sort") as SortSessions) ?? "createdAt-asc",
    status: (searchParams.get("status") as SessionStatus) ?? "all",
    view: (searchParams.get("view") as FilterSessionView) ?? "active",
    page: (Number(searchParams.get("page"))) || 1,
    limit: (Number(searchParams.get("limit"))) || 5
  };
};

