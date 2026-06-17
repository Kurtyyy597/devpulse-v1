import { useQuery } from "@tanstack/react-query";
import { getAllSessions } from "../../api-service/sessionApi";
import type { FilterSessions } from "../../../../shared/types/filterSessions";

export const useSessions = (filters: FilterSessions) => {
  return useQuery({
    queryKey: ["sessions", filters],

    queryFn: () => getAllSessions(filters),
  });
};
