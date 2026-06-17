import type { Session } from "../../../../../shared/types/sessions";
import { AppError } from "../../../../../shared/errors/appError";

export const permanentDeleteManySessionsService = (sessionIds: string[], sessions: Session[]) => {
  if (sessionIds.length === 0) {
    throw new AppError("No selected sessions yet", 400)
  };

  const sessionIdSet = new Set(sessionIds);

  const selectedSessions = sessions.filter((s) => sessionIdSet.has(s.id));

  if (selectedSessions.length !== sessionIds.length) {
    throw new AppError("One or more sessions do not exist");
  };

  if (selectedSessions.some((s) => s.deletedAt === null)) {
    throw new AppError("One or more selected sessions are not yet soft deleted", 400);
  };

  const updatedSessions = sessions.filter((s) => !sessionIdSet.has(s.id));

  return {
    updatedSessions,
    deletedSessions: selectedSessions
  }
};