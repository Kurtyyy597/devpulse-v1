import type { SessionStatus } from "./SessionStatus";
import type { Mood } from "./Mood";
import type { LatestSession } from "../helper-functions/dashboard/sessionDashboard";
import type { Session } from "./sessions";

export type DashboardSession = {
  total: number;
  overallProgressStatus: number;
  totalDuration: number;
  averageSession: number; // duration / total  
  completionRate: number; // Completed Session divided by total * 100
  upcomingDeadlines: number;
  activityLength: number;
  statusBreakdown: Record<SessionStatus, number>;
  moodBreakdown: Record<Mood, number>;
  latestSession: LatestSession[];
  overdueSessions: Session[];
};