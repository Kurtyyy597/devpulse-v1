import type { SessionField } from "./SessionFields";

export type SessionActivity = {
  activityId: string;
  field: SessionField;
  to: string;
  from: string;
  createdAt: number 
};