import { AppError } from "../../../../../shared/errors/appError";
import type { Session } from "../../../../../shared/types/sessions";

export const archiveManySessionsService = (sessionIds: string[], sessions: Session[]) => {
  if (sessionIds.length === 0) {
    throw new AppError("No Selected sessions yet", 400);
  };
  
  const now = Date.now();

  const updatedSessions = sessions.map((s) => {
    if (!sessionIds.includes(s.id)) {
      return s
    };

    if (s.archivedAt !== null) {
      throw new AppError("Selected session is already archived", 400);
    };

    return {
      ...s,
      updatedAt: now,
      archivedAt: now
    }
  });

  const archivedSessions = updatedSessions.filter((s) => sessionIds.includes(s.id));

  return {
    updatedSessions,
    archivedSessions
  };
};