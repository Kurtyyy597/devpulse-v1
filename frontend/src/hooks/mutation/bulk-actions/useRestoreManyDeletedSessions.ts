import { restoreManyDeletedSessions } from "../../../api-service/sessionApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useRestoreManyDeletedSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreManyDeletedSessions,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"]
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"]
      });

      queryClient.invalidateQueries({
        queryKey: ["trash-sessions"]
      });
    }
  });
};