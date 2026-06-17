import type { FilterSessions } from "../../../../shared/types/filterSessions";
import type { SetURLSearchParams } from "react-router-dom";

export const setFiltersToSearchParams = (
  filters: FilterSessions,
  setSearchParams: SetURLSearchParams,
) => {
  setSearchParams({
    search: filters.search,
    mood: filters.mood,
    status: filters.status,
    sort: filters.sort,
    view: filters.view,
    page: String(filters.page ?? 1),
    limit: String(filters.limit ?? 5),
  });
};