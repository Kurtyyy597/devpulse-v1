import type { Session } from "../../../../shared/types/sessions";
import { AppError } from "../../../../shared/errors/appError";

export function getSessionOrThrow(sessions: Session[], id: string) {
  const session = sessions.find((s) => s.id === id);

  if (!session) {
    throw new AppError("Session ID not found", 400);
  };

  return session;
};