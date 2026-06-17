import { getOneSession } from "../../api-service/sessionApi";
import { useQuery } from "@tanstack/react-query";

export const useSession = (id: string) => {
  return useQuery({
    queryKey: ["sessions", id],

    queryFn: () => getOneSession(id),
    enabled: !!id,
  });
};
