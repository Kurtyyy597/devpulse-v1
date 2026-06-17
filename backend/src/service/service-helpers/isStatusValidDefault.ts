import type { CreateSessionForm } from "../../../../shared/types/forms/CreateSessionForm";
import type { SessionStatus } from "../../../../shared/types/SessionStatus";

export const validStatuses: SessionStatus[] = ["planned", "open"];

export function isValidInitialStatus(newData: CreateSessionForm) {
  if (!newData.status) {
    return true;
  }

  return validStatuses.includes(newData.status);
}
