import { getSessionOrThrow } from "../../service-helpers/getSessionOrThrow";
import { throwIfNotDeleted } from "../../service-helpers/throwIfNotDeleted";
import type { Session } from "../../../../../shared/types/sessions";

export const permanentDeleteService = async (id: string, sessions: Session[]) => {

  const session = getSessionOrThrow(sessions, id);

  throwIfNotDeleted(session, `${session.title} must be in trash first`);
  
  const updatedSessions = sessions.filter((s) =>  s.id !== id);

  return {
    updatedSessions,
    deletedSessionID: id 
  };
};
