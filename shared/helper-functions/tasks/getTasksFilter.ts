import type { FilterTasks } from "../../types/tasks/FilterTasks";
import type { Task } from "../../types/tasks/tasks";
import { normalizeText } from "../normalizeText";

export function getTasksFilter(filters: FilterTasks, tasks: Task[]) {
  const searchInput = normalizeText(filters.search ?? "");
  
  return tasks.filter((t) => {
    const searchableFields = [
      normalizeText(t.title),
      normalizeText(t.description ?? ""),
      normalizeText(t.priority),
      normalizeText(t.status)
    ]

    if (searchInput && !searchableFields.some((field) => field.includes(searchInput))
    ) return false;

    if (filters.priorityFilter !== "all" && t.priority !== filters.priorityFilter) return false;

    if (filters.statusFilter !== "all" && t.status !== filters.statusFilter) return false;

    if (typeof filters.completed === "boolean" && t.completed !== filters.completed) return false;

    return true;
  });
}