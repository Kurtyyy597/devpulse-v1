import type { SortTask } from "../../types/tasks/SortTasks";
import type { Task } from "../../types/tasks/tasks";

export type SortField = keyof Pick<
  Task,
  | "title"
  | "createdAt"
  | "description"
  | "id"
  | "priority"
  | "status"
  | "updatedAt"
>;

export type DirectionField =
| "asc"
| "desc"

export function getSortTasks(sort: SortTask, tasks: Task[]) {
  if (!sort) return;
  
  const [field, direction] = sort.split("-") as [SortField, DirectionField];

  return [...tasks].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc" ?
      aVal.localeCompare(bVal) :
      bVal.localeCompare(aVal)
    };

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ?
      aVal - bVal :
      bVal - aVal
    };


    return 0;
  });
};