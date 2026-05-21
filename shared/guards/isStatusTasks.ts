 import { taskStatuses } from "../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
 import type { TaskStatus } from "../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
 
 export const isTaskStatus = (value: string): value is TaskStatus => {
    return taskStatuses.includes(value as TaskStatus);
  };