import { useMutation, useQueryClient } from "@tanstack/react-query";
import { softDeleteSession } from "../../../api-service/sessionApi";


export const useSoftDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteSession,

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