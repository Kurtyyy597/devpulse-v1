import { getSessionOrThrow } from "../../service-helpers/getSessionOrThrow";
import { throwIfClosed } from "../../service-helpers/throwIfClosed";
import { throwIfArchived } from "../../service-helpers/throwIfArchived";
import { throwIfDeleted } from "../../service-helpers/throwIfDeleted";
import type { Session } from "../../../../../shared/types/sessions";
export const archiveSessionService = async (
  id: string,
  sessions: Session[],
) => {
  const session = getSessionOrThrow(sessions, id);

  
  throwIfClosed(session.status);
  throwIfArchived(session, `${session.title} is already archived`);
  throwIfDeleted(session, `${session.title} is already in trash bin`);

  const now = Date.now();

  const archivedSession: Session = {
    ...session,
    updatedAt: now,
    archivedAt: now,
  };

  const updatedSessions = sessions.map((s) =>
    s.id === id ? archivedSession : s,
  );

  return {
    updatedSessions,
    archivedSession,
  };
};
