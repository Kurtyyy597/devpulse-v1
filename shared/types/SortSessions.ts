export const sortSessions = [
  "title-asc",
  "title-desc",
  "activityPercentage-asc",
  "activityPercentage-desc",
  "createdAt-asc",
  "createdAt-desc",
  "updatedAt-asc",
  "updatedAt-desc",
  "archivedAt-asc",
  "archivedAt-desc",
] as const;

export type SortSessions = (typeof sortSessions)[number];