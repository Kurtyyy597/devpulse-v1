import type { Session } from "../../../../shared/types/sessions";

export const getSoftDeletedSessionsService = async (
  sessions: Session[]
) => {
  const softDeletedSessions = sessions.filter((s) => s.deletedAt !== null);
  
  return softDeletedSessions;
};