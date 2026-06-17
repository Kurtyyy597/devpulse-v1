import type { Session } from "../../../../shared/types/sessions";
import { AppError } from "../../../../shared/errors/appError";


export function throwIfNotDeleted(session: Session, message: string) {
  if (session.deletedAt === null) {
    throw new AppError(`${message}`, 400);
  };
};