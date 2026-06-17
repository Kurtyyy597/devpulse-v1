import type { Mood } from "./Mood";
import type { DailyProductivity } from "./DailyProductivity";
import type { SessionStatus } from "./SessionStatus";
import type { SessionActivity } from "./SessionActivity";

export type Skills = {
  skillsId: string;
  name: string;
  category: string;
};

export type Session = {
  id: string;
  title: string;
  description?: string;
  duration: number;
  skills: string[];
  mood: Mood;
  status: SessionStatus;
  productivityScore?: DailyProductivity;
  activityPercentage?: number;
  dueDate?: string | null;
  createdAt: number;
  updatedAt?: number | null;
  archivedAt?: number | null;
  deletedAt?: number | null;
  activities?: SessionActivity[];
};
