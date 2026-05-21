export const sortTasks = [
  "title-asc",
  "title-desc",
  "createdAt-asc",
  "createdAt-desc",
  "updatedAt-asc",
  "updatedAt-desc"
] as const

export type SortTask = 
typeof sortTasks[number];