import type { TaskStatus, TasksPriority } from "../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
import type { SortTask } from "./SortTasks";

export type FilterTasks = {
  search: string;
  statusFilter: TaskStatus | "all";
  priorityFilter: TasksPriority | "all";
  sort: SortTask
  completed?: boolean;
};

