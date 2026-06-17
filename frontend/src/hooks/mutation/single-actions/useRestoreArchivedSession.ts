import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreArchivedSession } from "../../../api-service/sessionApi";


export const useRestoreArchiveSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreArchivedSession,

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