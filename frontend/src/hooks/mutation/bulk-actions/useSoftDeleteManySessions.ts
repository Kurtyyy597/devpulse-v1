import { softDeleteManySessions } from "../../../api-service/sessionApi";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const useSoftDeleteManySessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteManySessions,

    onSuccess: () => {{
      queryClient.invalidateQueries({
        queryKey: ["sessions"]
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"]
      });

      queryClient.invalidateQueries({
        queryKey: ["trash-sessions"]
      })
    }}
  })
}