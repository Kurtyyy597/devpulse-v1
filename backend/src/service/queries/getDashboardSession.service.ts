import { sessionDashboard } from "../../../../shared/helper-functions/dashboard/sessionDashboard";
import { Session } from "../../../../shared/types/sessions";

export const getDashboardSessionService = async (sessions: Session[]) => {
  return sessionDashboard(sessions);
};