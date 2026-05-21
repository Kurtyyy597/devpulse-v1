import type { Task } from './../../types/tasks/tasks';
import type { UpdateTaskDto } from '../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema';
import {normalizeText} from "../normalizeText";

export function isTaskModified(
  current: Task,
  next: UpdateTaskDto
) : boolean {
  if (next.title !== undefined) {
    if (normalizeText(next.title ?? "") !== normalizeText(current.title)) return true;
  };

  if (next.description !== undefined) {
    if (normalizeText(next.description ?? "") !== normalizeText(current.description ?? "")) return true;
  };

  if (next.priority !== undefined) {
    if (normalizeText(next.priority) !== normalizeText(current.priority)) return true;
  };

  if (next.status !== undefined) {
    if (normalizeText(next.status) !== normalizeText(current.status)) return true;
  };

  return false;
}