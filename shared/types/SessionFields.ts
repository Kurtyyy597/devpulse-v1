export const sessionFields = [
  "title",
  "description",
  "duration",
  "skills",
  "mood",
  "status",
  "dueDate",
] as const;

export type SessionField = (typeof sessionFields)[number];
