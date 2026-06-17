import { useQuery } from "@tanstack/react-query";
import { getDashboardSessions } from "../../api-service/sessionApi";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: getDashboardSessions,
  });
};
