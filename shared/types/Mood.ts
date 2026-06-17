export const moods = [
  "focused",
  "tired",
  "distracted",
  "motivated"
] as const;

export type Mood = (typeof moods)[number];