import { getSoftDeletedASessions } from "../../api-service/sessionApi";
import { useQuery } from "@tanstack/react-query";

export const useSoftDeletedSessions = () => {
  return useQuery({
    queryKey: ["trash-sessions"],

    queryFn: getSoftDeletedASessions
  });
};