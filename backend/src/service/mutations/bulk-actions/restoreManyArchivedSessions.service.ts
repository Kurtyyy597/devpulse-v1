import { AppError } from "../../../../../shared/errors/appError";
import type { Session } from "../../../../../shared/types/sessions";

export const restoreManyArchivedSessionsService = (sessionIds: string[], sessions: Session[]) => {
  if (sessionIds.length === 0) {
    throw new AppError("No selected sessions yet", 400)
  };

  const now = Date.now();

  const updatedSessions = sessions.map((s) => {
    if (!sessionIds.includes(s.id)) {
      return s
    };

    if (s.archivedAt === null) {
      throw new AppError("One or more selected sessions are not archived", 400);
    };

    return {
      ...s,
      updatedAt: now,
      archivedAt: null 
    };
   });

   const restoredSessions = updatedSessions.filter((s) => sessionIds.includes(s.id));

   return {
    updatedSessions,
    restoredSessions
   }
};