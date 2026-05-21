import type { FilterTasks } from "../../types/tasks/FilterTasks";
import type { SortTask } from "../../types/tasks/SortTasks";
import { isTaskStatus } from "../../guards/isStatusTasks";
import { isTaskPriority } from "../../guards/isPriorityTask";
import { isSortTask } from "../../guards/isSortTask";

export type ParseFilterPropsTasks = {
  search?: string;
  status?: string;
  priority?: string;
  completed?: string;
  sort?: SortTask;
};

export function getParseFilterTasks(
  parseFilter: ParseFilterPropsTasks,
): FilterTasks {
  const parseCompleted =
    parseFilter.completed === "true"
      ? true
      : parseFilter.completed === "false"
        ? false
        : undefined;

  const result: FilterTasks = {
    search: parseFilter.search ?? "",

    statusFilter:
      parseFilter.status && isTaskStatus(parseFilter.status)
        ? parseFilter.status
        : "all",

    priorityFilter:
      parseFilter.priority && isTaskPriority(parseFilter.priority)
        ? parseFilter.priority
        : "all",

    sort:
      parseFilter.sort && isSortTask(parseFilter.sort)
        ? parseFilter.sort
        : "createdAt-asc",
  };

  if (parseCompleted !== undefined && typeof parseCompleted === "string") {
    result.completed = parseCompleted;
  }

  return result;
}
