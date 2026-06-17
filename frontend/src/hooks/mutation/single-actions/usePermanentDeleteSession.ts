import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permanentDeleteSession } from "../../../api-service/sessionApi";


export const usePermanentDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permanentDeleteSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"] 
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"]
      });

      queryClient.invalidateQueries({
        queryKey: ["trash-sessions"],
      });
    }
  })
}