import { permanentDeleteManySessions } from "../../../api-service/sessionApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const usePermanentDeleteManySessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permanentDeleteManySessions,

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