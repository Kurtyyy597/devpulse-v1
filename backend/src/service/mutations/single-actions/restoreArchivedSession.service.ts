import { getSessionOrThrow } from "../../service-helpers/getSessionOrThrow";
import { throwIfDeleted } from "../../service-helpers/throwIfDeleted";
import { throwIfNotArchived } from "../../service-helpers/throwIfNotArchived";
import type { Session } from "../../../../../shared/types/sessions";

export const restoreArchivedSessionService = async (id: string, sessions: Session[]) => { 
  const session = getSessionOrThrow(sessions, id);

  throwIfDeleted(session, `Restore first ${session.title} in trashbin`);
  throwIfNotArchived(session, `${session.title} is not yet archived`);
    
  const now = Date.now();

  const restoredSession: Session = {
    ...session,
    updatedAt: now,
    archivedAt: null,
  };

  console.log("RESTORED", restoredSession);

  const updatedSessions = sessions.map((s) =>
  s.id === id ? restoredSession : s);

  return {
    updatedSessions,
    restoredSession
  };
};