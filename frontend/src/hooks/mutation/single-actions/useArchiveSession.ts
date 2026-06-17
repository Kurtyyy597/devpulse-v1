import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { archiveSession } from "../../../api-service/sessionApi";

export const useArchiveSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveSession,

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