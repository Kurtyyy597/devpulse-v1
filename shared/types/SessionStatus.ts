export const statuses = [
  "planned", //0
  "open", //15
  "in-progress", //30
  "halfway", //50
  "almost-done", //75
  "completed", //100
  "closed", //0
] as const;

export type SessionStatus = (typeof statuses)[number];
