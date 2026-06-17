import { getSessionOrThrow } from "../../service-helpers/getSessionOrThrow";
import { throwIfNotDeleted } from "../../service-helpers/throwIfNotDeleted";
import type { Session } from "../../../../../shared/types/sessions";


export const restoreDeletedSessionService = async (id: string, sessions: Session[]) => {
  const session = getSessionOrThrow(sessions, id);

  throwIfNotDeleted(session, `${session.title} is not yet soft deleted`);

  const now = Date.now();

  const restoredDeletedSession: Session = {
    ...session,
    updatedAt: now,
    deletedAt: null,
  };

  const updatedSessions = sessions.map((s) =>
  s.id === id ? restoredDeletedSession : s);

  return {
    updatedSessions,
    restoredDeletedSession,
  };
};