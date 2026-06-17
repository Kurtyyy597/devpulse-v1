import { AppError } from "../../../../../shared/errors/appError";
import type { Session } from "../../../../../shared/types/sessions";

export const softDeleteManySessionsService = (sessionIds: string[], sessions: Session[]) => {
  if (sessionIds.length === 0) {
    throw new AppError("No selected sessions yet", 400);
  };

  const now = Date.now()

  const updatedSessions = sessions.map((s) => {
    if (!sessionIds.includes(s.id)) {
      return s
    };

    if (s.deletedAt !== null) {
      throw new AppError("One or more selected sessions are already deleted", 400);
    };

    return {
      ...s,
      updatedAt: now,
      archivedAt: null,
      deletedAt: now
    };
  });

  const deletedSessions = updatedSessions.filter((s) => sessionIds.includes(s.id));

  return {
    updatedSessions,
    deletedSessions
  }
}