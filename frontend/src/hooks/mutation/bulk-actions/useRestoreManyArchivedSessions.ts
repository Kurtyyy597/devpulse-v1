import { restoreManyArchivedSessions } from "../../../api-service/sessionApi";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const useRestoreManyArchivedSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreManyArchivedSessions,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"]
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"]
      });
    }
  });
};