import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { createSession } from "../../../api-service/sessionApi";

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

     
    },
  });
};
