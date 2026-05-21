import { CreateTaskDto } from "../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
import type { Task } from "../../types/tasks/tasks";
import { normalizeText } from "../normalizeText";

export function getDuplicatedCreated(
  current: Task[],
  next: CreateTaskDto
) {
  return current.some((curr) => {
    return (
      normalizeText(curr.title) === normalizeText(next.title) &&
      normalizeText(curr.description ?? "") === normalizeText(next.description ?? "")
    )
  });
};