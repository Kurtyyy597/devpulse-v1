import type { Session } from "../../../../shared/types/sessions";
import { AppError } from "../../../../shared/errors/appError";

export function throwIfNotArchived(session: Session, message: string) {
  if (session.archivedAt === null) {
    throw new AppError(`${message}`, 400);
  };
};