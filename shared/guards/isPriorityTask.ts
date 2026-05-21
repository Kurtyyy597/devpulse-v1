import type { TasksPriority } from "../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
import { taskPriorities } from "../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";

export const isTaskPriority = (value: string): value is TasksPriority => {
    return taskPriorities.includes(value as TasksPriority);
  };
