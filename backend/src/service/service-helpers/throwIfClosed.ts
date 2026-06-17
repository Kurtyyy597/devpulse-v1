import type { SessionStatus } from "../../../../shared/types/SessionStatus";
import { AppError } from "../../../../shared/errors/appError";

export function throwIfClosed(currentStatus: SessionStatus) {
  if (currentStatus === "closed") {
    throw new AppError("Closed status cannot be updated", 400);
  }
}
