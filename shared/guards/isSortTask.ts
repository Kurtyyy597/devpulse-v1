import type { SortTask } from "../types/tasks/SortTasks";
import { sortTasks } from "../types/tasks/SortTasks";

export const isSortTask = (value: string): value is SortTask => {
  return sortTasks.includes(value as SortTask);
};
