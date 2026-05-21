export const sorts = [
  "name-asc",
  "name-desc",
  "age-asc",
  "age-desc",
  "createdAt-asc",
  "createdAt-desc",
  "updatedAt-asc",
  "updatedAt-desc"
] as const;


export type SortStudents = typeof sorts[number];

