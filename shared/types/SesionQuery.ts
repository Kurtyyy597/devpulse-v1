import type { Mood } from './Mood';

import type { SessionStatus } from "./SessionStatus";
import type { SortSessions } from "./SortSessions";

export type SessionQuery = {
  search: string,
  mood: Mood | "all",
  status: SessionStatus | "all",
  sort: SortSessions
  page: number;
  limit: number;
  
}