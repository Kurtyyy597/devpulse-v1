import type { Session } from "../../../../shared/types/sessions";
import type { FilterSessions } from "../../../../shared/types/filterSessions";
import { getFilterSessions } from "../../../../shared/helper-functions/filter/getFilteredSessions";
import { getSortSessions } from "../../../../shared/helper-functions/sort/getSortSessions";
import { paginate } from "../../../../shared/helper-functions/paginations/paginate";

export const getAllSessionsService = async (
  sessions: Session[],
  filter: FilterSessions,
) => {
  console.log("SERVICE FILTER:", filter);
  
  const filteredSessions = getFilterSessions(filter, sessions);
  const sortedSessions = getSortSessions(filter.sort, filteredSessions);
  
  const paginatedSessions = paginate(
    sortedSessions,
    filter.page!,
    filter.limit!,
  );

  const sessionsLength = sessions.filter((s) => s.deletedAt === null).length;

  return {
    ...paginatedSessions,
    totalUnfilteredSessions: sessionsLength
  }
};
