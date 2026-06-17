import type { SortSessions } from "./SortSessions";
import type { Mood } from "./Mood";
import type { SessionStatus } from "./SessionStatus";

export const filterSessionView = [
  "active",
  "archived",
] as const;

export type FilterSessionView = (typeof filterSessionView)[number];

export type FilterSessions = {
  search: string;
  mood: Mood | "all";
  sort: SortSessions;
  status: SessionStatus | "all";
  view: FilterSessionView;
  page?: number;
  limit?: number;
};
