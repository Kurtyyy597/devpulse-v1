import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSession } from "../../../api-service/sessionApi";
import type { UpdateSessionFormInput } from "../../../../../shared/types/forms/UpdateSessionForm";

export type UpdateSessionPayload = {
  id: string;
  payload: UpdateSessionFormInput;
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateSessionPayload) =>
      updateSession(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["trash-sessions"],
      });
    },
  });
};
