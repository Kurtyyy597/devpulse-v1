import { useQueryClient, useMutation } from "@tanstack/react-query";
import { restoreSoftDeletedSession } from "../../../api-service/sessionApi";

export const useRestoreSoftDeletedSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreSoftDeletedSession,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"]
      });

      await queryClient.invalidateQueries({
        queryKey: ["trash-sessions"],
      });
    }
  });
};