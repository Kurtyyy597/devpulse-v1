import { throwIfDeleted } from "../../service-helpers/throwIfDeleted";
import { getSessionOrThrow } from "../../service-helpers/getSessionOrThrow";
import type { Session } from "../../../../../shared/types/sessions";


export const softDeleteSessionService = async (id: string, sessions: Session[]) => {
  const session = getSessionOrThrow(sessions, id);


  throwIfDeleted(session, `${session.title} is already soft deleted`);
  
  const now = Date.now();

  const softDeletedSession: Session = {
    ...session,
    updatedAt: now,
    archivedAt: null,
    deletedAt: now,
  };

  const updatedSessions = sessions.map((s) => 
  s.id === id ? softDeletedSession : s);
  
   return {
    updatedSessions,
    softDeletedSession
  };
};