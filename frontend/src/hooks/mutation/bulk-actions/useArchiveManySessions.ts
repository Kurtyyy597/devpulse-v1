import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { archiveManySessions } from "../../../api-service/sessionApi";

export const useArchiveManySessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveManySessions,

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